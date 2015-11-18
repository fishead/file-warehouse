'use strict';

const path = require('path');
const fs = require('fs');
const passport = require('../middleware/passport');
const metaTool = require('../middleware/meta');
const chunkTool = require('../middleware/chunk');
const config = require('../config.json');
const uploader = require('./uploader');

const ensureBucketExists = function ensureBucketExists(req, res, next) {
    const urlPath = req.path.split('/');
    if (urlPath.length < 3) {
        return res.status(400).end('filename not exists');
    }
    if (urlPath.length < 2) {
        return res.status(400).end('bucket not exists');
    }
    next();
};

const _getFile = function _getFile(req, res) {
    const meta = res.body.meta;
    const hash = meta.hash;
    const filePath = path.join(__dirname, config.upload.chunk, hash.slice(0, 2), hash.slice(2));
    const options = {
        headers: {
            'Content-Type': meta.mimetype
        }
    };
    if (meta.mimetype.indexOf('image') < 0) {
        options.headers['Content-Disposition'] = 'attachment; filename=' + meta.originalname;
    }
    res.sendFile(filePath, options, (err) => {
        if (err) {
            return res.end();
        }
    });
};

const _deleteFile = function _deleteFile(req, res) {
    const metaPath = res.body.metaPath;
    const meta = res.body.meta;
    const hash = meta.hash;
    const filePath = path.join(__dirname, config.upload.chunk, hash.slice(0, 2), hash.slice(2));
    fs.unlink(filePath);
    fs.unlink(metaPath);
};

exports.ensureBucketExists = ensureBucketExists;
exports.getFile = [metaTool.readMeta, metaTool.setMeta, _getFile];
exports.uploadFile = [passport.authenticate('jwt', {session: false}), uploader(config.upload).single('single'), metaTool.saveMeta, chunkTool.saveChunk];
exports.deleteFile = [passport.authenticate('jwt', {session: false}), metaTool.readMeta, _deleteFile];
