'use strict';

const app = module.exports = require('express')();
const metaTool = require('../middleware/meta');
const chunkTool = require('../middleware/chunk');

const _uploadFile = function _uploadFile(req, res) {
    res.status(201).end();
};

const _deleteFile = function _deleteFile(req, res, next) {
    res.status(202).send();
    next();
};

app.get('/*', metaTool.readMeta, metaTool.increaseDownloadCount, metaTool.saveMeta, chunkTool.sendChunk);
app.post('/*', chunkTool.recieveChunk, metaTool.readMeta, metaTool.logMeta, metaTool.saveMeta, chunkTool.saveChunk, _uploadFile);
app.delete('/*', _deleteFile, metaTool.readMeta, chunkTool.removeChunk, metaTool.removeMeta);
