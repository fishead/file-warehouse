'use strict';

const path = require('path');
const file = require('./file');
const config = require('../config.js');
const fs = require('co-fs-plus');
const uploader = require('./uploader');
const co = require('co');

const getChunkPath = function getChunkPath(chunkHash) {
    const chunkPath = path.join(config.upload.chunk, chunkHash.slice(0, 2), chunkHash.slice(2));
    return chunkPath;
};

const getStatPath = function getStatPath(chunkHash) {
    const chunkPath = path.join(config.upload.chunk, chunkHash.slice(0, 2), chunkHash.slice(2) + '.stat');
    return chunkPath;
};

const getMetaPath = function getMetaPath(bucket, reqPath) {
    const metaPath = path.join(bucket.path, reqPath);
    return metaPath;
};

const readOrCreateStat = function readOrCreateStat(statPath) {
    return co(function *() {
        const stat = JSON.parse(yield fs.readFile(statPath, 'utf8'));
        return stat;
    }).catch((err) => {
        if (err.errno === -2 && err.code === 'ENOENT') {
            return [];
        }
        return err;
    });
};

const saveStat = function saveStat(statPath, statContent) {
    return co(function *() {
        yield fs.writeFile(statPath, JSON.stringify(statContent), 'utf8');
    });
};

const saveChunk = function saveChunk(req, res, next) {
    co(function *() {
        const singleFile = req.file;
        const oldFilePath = singleFile.path;
        const newFilePath = getChunkPath(singleFile.hash);

        yield fs.mkdirp(path.dirname(newFilePath));
        yield file.stream(oldFilePath, newFilePath);

        const statPath = getStatPath(singleFile.hash);
        const stat = yield readOrCreateStat(statPath);
        const metaPath = getMetaPath(res.body.bucket, req.path);
        stat.push(metaPath);
        yield saveStat(statPath, stat);

        next();
    }).catch((err) => {
        next(err);
    });
};

const removeEmptyChunkFolder = function removeEmptyChunkFolder(chunkFolderPath) {
    return co(function *() {
        yield fs.rmdir(chunkFolderPath);

        if (path.dirname(chunkFolderPath) !== config.upload.chunk) {
            yield removeEmptyChunkFolder(path.dirname(chunkFolderPath));
        }
    });
};

const removeChunk = function removeChunk(req, res, next) {
    co(function *() {
        const statPath = getStatPath(res.body.meta.hash);
        let stat = yield readOrCreateStat(statPath);
        const metaPath = getMetaPath(res.body.bucket, req.path);
        stat = stat.filter((refPath) => refPath !== metaPath);
        if (stat.length > 0) {
            yield saveStat(statPath, stat);
            return next();
        }
        yield fs.unlink(statPath);
        const meta = res.body.meta;
        const chunkPath = getChunkPath(meta.hash);
        yield fs.unlink(chunkPath);
        yield removeEmptyChunkFolder(path.dirname(chunkPath));
        next();
    }).catch(() => {
        next();
    });
};

const sendChunk = function sendChunk(req, res, next) {
    const meta = res.body.meta;
    if (!meta.hash) { return next(); }
    const chunkPath = getChunkPath(meta.hash);
    const options = {
        headers: {
            'Content-Type': meta.mimetype
        }
    };
    if (meta.mimetype.indexOf('image') < 0) {
        options.headers['Content-Disposition'] = 'attachment; filename=' + meta.originalname;
    }
    res.sendFile(chunkPath, options, next);
};

const recieveChunk = uploader().single(config.upload.single.fileFieldName);

exports.saveChunk = saveChunk;
exports.removeChunk = removeChunk;
exports.sendChunk = sendChunk;
exports.recieveChunk = recieveChunk;
