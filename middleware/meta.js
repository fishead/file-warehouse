'use strict';

const path = require('path');
const fs = require('co-fs-plus');
const config = require('../config.js');
const co = require('co');

const saveMeta = function saveMeta(req, res, next) {
    co(function *() {
        const meta = res.body.meta;
        const metaPath = meta.__path;

        yield fs.mkdirp(path.dirname(metaPath));
        yield fs.writeFile(metaPath, JSON.stringify(meta), 'utf8');

        next();
    }).catch(next);
};

const readMeta = function readMeta(req, res, next) {
    const bucket = res.body.bucket;
    const metaPath = path.join(bucket.path, req.path);
    res.body = res.body || {};

    co(function *() {
        const rawMeta = yield fs.readFile(metaPath, 'utf8');
        const meta = JSON.parse(rawMeta);
        meta.__path = metaPath;
        res.body.meta = meta;
        next();
    }).catch((err) => {
        if (err.errno === -2 && err.code === 'ENOENT') {
            const meta = {
                __path: metaPath
            };
            res.body.meta = meta;
            return next();
        }
        next(err);
    });
};

const removeEmptyMetaFolder = function removeEmptyMetaFolder(metaFolderPath) {
    return co(function *() {
        yield fs.rmdir(metaFolderPath);

        if (path.dirname(metaFolderPath) !== config.upload.meta) {
            yield removeEmptyMetaFolder(path.dirname(metaFolderPath));
        }
    });
};

const removeMeta = function removeMeta(req, res, next) {
    co(function *() {
        const meta = res.body.meta;
        const metaPath = meta.__path;
        yield fs.unlink(metaPath);
        yield removeEmptyMetaFolder(path.dirname(metaPath));
        next();
    }).catch(() => {
        next();
    });
};

const increaseDownloadCount = function increaseDownloadCount(req, res, next) {
    const meta = res.body.meta;
    meta.downloads += 1;
    next();
};

const logMeta = function logMeta(req, res, next) {
    const file = req.file;
    const meta = res.body.meta;
    meta.originalname = file.originalname;
    meta.mimetype = file.mimetype;
    meta.hash = file.hash;
    meta.size = file.size;
    meta.downloads = meta.downloads || 0;
    meta.updatedAt = Date.now();
    next();
};

exports.saveMeta = saveMeta;
exports.readMeta = readMeta;
exports.removeMeta = removeMeta;
exports.increaseDownloadCount = increaseDownloadCount;
exports.logMeta = logMeta;
