'use strict';

const app = module.exports = require('express')();
const metaTool = require('../middleware/meta');
const chunkTool = require('../middleware/chunk');

const afterUploading = function afterUploading(req, res) {
    res.status(201).end();
};

app.get('/*', metaTool.readMeta, metaTool.increaseDownloadCount, chunkTool.sendChunk, metaTool.saveMeta);
app.post('/*', chunkTool.recieveChunk, metaTool.readMeta, metaTool.logMeta, chunkTool.saveChunk, metaTool.saveMeta, afterUploading);
app.delete('/*', metaTool.readMeta, chunkTool.removeChunk, metaTool.removeMeta);
