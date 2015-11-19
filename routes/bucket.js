'use strict';

const app = module.exports = require('express')();
const config = require('../config.js');
const path = require('path');

const findBucket = function findBucket(req, res, next) {
    const bucketName = req.params.bucketName;
    const bucketPath = path.join(config.upload.meta, bucketName);
    const bucket = {
        name: bucketName,
        path: bucketPath
    };
    res.body = res.body || {};
    res.body.bucket = bucket;
    next();
};

const getBucket = function getBucket(req, res, next) {
    next();
};

const createBucket = function createBucket(req, res, next) {
    next();
};

const updateBucket = function updateBucket(req, res, next) {
    next();
};

const removeBucket = function removeBucket(req, res, next) {
    next();
};

app.use('/:bucketName', findBucket);
app.post('/:bucketName', createBucket);
app.get('/:bucketName', getBucket);
app.put('/:bucketName', updateBucket);
app.delete('/:bucketName', removeBucket);

app.use('/:bucketName/', require('./meta'));
