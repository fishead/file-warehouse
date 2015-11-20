'use strict';

const app = module.exports = require('express')();
const co = require('co');
const debug = require('debug')('file-warehouse:meta');
const path = require('path');
const fs = require('fs');
const cofs = require('co-fs-plus');
const config = require('../config.js');
const uploader = require('../middleware/uploader');

const streamFile = function streamFile(sourceFile, destFile) {
    return new Promise(function(resolve, reject) {
        try {
            const rs = fs.createReadStream(sourceFile);
            const ws = fs.createWriteStream(destFile);
            rs.pipe(ws);

            ws.on('finish', () => resolve(true));

            ws.on('error', (err) => reject(err));
        } catch (err) {
            reject(err);
        }
    });
};

const getMetaPath = function getMetaPath(bucket, reqPath) {
    const metaPath = path.join(bucket.path, reqPath);
    return metaPath;
};

const getChunkPath = function getChunkPath(chunkHash) {
    const chunkPath = path.join(config.upload.chunk, chunkHash.slice(0, 2), chunkHash.slice(2));
    return chunkPath;
};

const getStatPath = function getStatPath(chunkHash) {
    const chunkPath = path.join(config.upload.chunk, chunkHash.slice(0, 2), chunkHash.slice(2) + '.stat');
    return chunkPath;
};

const readMeta = function readMeta(metaPath) {
    return co(function *() {
        const meta = JSON.parse(yield cofs.readFile(metaPath, 'utf8'));
        return meta;
    }).catch(() => {
        return {};
    });
};

const writeMeta = function writeMeta(metaPath, meta) {
    return co(function *() {
        yield cofs.mkdirp(path.dirname(metaPath));
        yield cofs.writeFile(metaPath, JSON.stringify(meta), 'utf8');
    });
};

const removeEmptyMetaFolder = function removeEmptyMetaFolder(metaFolderPath) {
    return co(function *() {
        yield cofs.rmdir(metaFolderPath);

        if (path.dirname(metaFolderPath) !== config.upload.meta) {
            yield removeEmptyMetaFolder(path.dirname(metaFolderPath));
        }
    }).catch(() => {
    });
};

const removeMeta = function removeMeta(metaPath) {
    return co(function *() {
        yield cofs.unlink(metaPath);
        yield removeEmptyMetaFolder(path.dirname(metaPath));
    });
};

const readStat = function readStat(statPath) {
    return co(function *() {
        const stat = JSON.parse(yield cofs.readFile(statPath, 'utf8'));
        return stat;
    }).catch(() => {
        return [];
    });
};

const writeStat = function writeStat(statPath, statContent) {
    return co(function *() {
        yield cofs.writeFile(statPath, JSON.stringify(statContent), 'utf8');
    });
};

const removeEmptyChunkFolder = function removeEmptyChunkFolder(chunkFolderPath) {
    return co(function *() {
        yield cofs.rmdir(chunkFolderPath);

        if (path.dirname(chunkFolderPath) !== config.upload.chunk) {
            yield removeEmptyChunkFolder(path.dirname(chunkFolderPath));
        }
    }).catch(() => {
    });
};

const removeChunk = function removeChunk(meta) {
    return co(function *() {
        const statPath = getStatPath(meta.hash);
        const stat = yield readStat(statPath);
        if (stat.length === 0) {
            yield cofs.unlink(statPath);
            const chunkPath = getChunkPath(meta.hash);
            yield cofs.unlink(chunkPath);
            yield removeEmptyChunkFolder(path.dirname(chunkPath));
        }
    });
};

const increaseChunkRef = function increaseChunkRef(stat, metaPath) {
    stat.push(metaPath);
    return stat;
};

const decreateChunkRef = function decreateChunkRef(stat, metaPath) {
    return stat.filter((refPath) => refPath !== metaPath);
};

const isChunkExists = function isChunkExists(meta) {
    return co(function *() {
        const chunkPath = getChunkPath(meta.hash);
        const fileStat = yield cofs.stat(chunkPath);
        return !!fileStat;
    }).catch(() => {
        return false;
    });
};

const fetchFile = function fetchFile(req, res, next) {
    co(function *() {
        const metaPath = getMetaPath(res.body.bucket, req.path);
        const meta = yield readMeta(metaPath);

        if (!meta.hash) {
            return res.status(404).end();
        }

        meta.downloads += 1;

        const chunkPath = getChunkPath(meta.hash);
        const options = {
            headers: {
                'Content-Type': meta.mimetype
            }
        };
        if (meta.mimetype.indexOf('image') < 0) {
            options.headers['Content-Disposition'] = 'attachment; filename=' + meta.originalname;
        }
        res.sendFile(chunkPath, options, (err) => {
            if (err) {
                return next(err);
            }
            co(function *() {
                yield cofs.writeFile(metaPath, JSON.stringify(meta), 'utf8');
                res.end();
            });
        });
    }).catch((err) => {
        if (err.errno === -2 && err.code === 'ENOENT') {
            return res.status(404).end();
        }
        debug(err);
        next(err);
    });
};

const uploadFile = function uploadFile(req, res, next) {
    co(function *() {
        const metaPath = getMetaPath(res.body.bucket, req.path);
        const meta = yield readMeta(metaPath);
        if (!req.file) {
            return res.status(400).end('文件不能为空');
        }
        const singleFile = req.file;
        if (meta.hash && meta.hash !== singleFile.hash) {
            const oldStatPath = getStatPath(meta.hash);
            let oldStat = yield readStat(oldStatPath);
            oldStat = decreateChunkRef(oldStat, metaPath);
            yield writeStat(oldStatPath, oldStat);
            yield removeChunk(meta);
        }

        meta.originalname = singleFile.originalname;
        meta.mimetype = singleFile.mimetype;
        meta.hash = singleFile.hash;
        meta.size = singleFile.size;
        meta.downloads = meta.downloads || 0;
        meta.updatedAt = Date.now();

        const oldFilePath = singleFile.path;
        const newFilePath = getChunkPath(singleFile.hash);

        const chunkExists = yield isChunkExists(newFilePath);
        if (!chunkExists) {
            yield cofs.mkdirp(path.dirname(newFilePath));
            yield streamFile(oldFilePath, newFilePath);
        }

        const newStatPath = getStatPath(singleFile.hash);
        let newStat = yield readStat(newStatPath);
        newStat = increaseChunkRef(newStat, metaPath);
        yield writeStat(newStatPath, newStat);

        yield writeMeta(metaPath, meta);
        res.status(201).end();
    }).catch((err) => {
        if (err.errno === -2 && err.code === 'ENOENT') {
            return res.status(404).end();
        }
        debug(err);
        next(err);
    });
};

const removeFile = function removeFile(req, res, next) {
    co(function *() {
        const metaPath = getMetaPath(res.body.bucket, req.path);
        const meta = yield readMeta(metaPath);

        if (!meta.hash) {
            return res.status(204).end();
        }
        const statPath = getStatPath(meta.hash);
        let stat = yield readStat(statPath);
        stat = decreateChunkRef(stat, metaPath);
        yield writeStat(statPath, stat);

        yield removeChunk(meta);
        yield removeMeta(metaPath);
        res.status(200).end();
    }).catch((err) => {
        if (err.errno === -2 && err.code === 'ENOENT') {
            return res.status(204).end();
        }
        debug(err);
        next(err);
    });
};

app.get('/*', fetchFile);
app.post('/*', uploader().single(config.upload.single.fileFieldName), uploadFile);
app.delete('/*', removeFile);
