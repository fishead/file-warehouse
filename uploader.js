'use strict';

const multer = require('multer');
const path = require('path');
const debug = require('debug')('file-warehouse:uploader');
const mkdirp = require('mkdirp');

const destination = function destination(options) {
    return function (req, file, cb) {
        const folder = path.join(__dirname, options.path, req.path);
        mkdirp(folder, {}, function (err) {
            if (err) {
                debug(err);
                return cb(err);
            }
            cb(null, folder);
        });
    };
};

const filename = function filename() { // eslint-disable-line no-unused-vars
    return function (req, file, cb) {
        return cb(null, file.filename);
    };
};

const storage = function storage(options) {
    return multer.diskStorage({
        destination: destination(options)
        // filename: filename()
    });
};

const fileFilter = function fileFilter(req, file, cb) {
    return cb(null, true);
};

const uploader = module.exports = function upload(options) { // eslint-disable-line no-unused-vars
    return multer({
        storage: storage(options),
        fileFilter: fileFilter,
        limits: { }
    });
};
