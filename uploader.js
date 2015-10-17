'use strict';

const multer = require('multer');
const path = require('path');
const mkdirp = require('mkdirp');
const DiskHashStorage = require('./multer_disk_hash_storage');

const getDestination = function getDestination(options) { // eslint-disable-line no-unused-vars
    return function _getDestination(req, file, cb) {
        const folder = path.join(__dirname, options.path);
        mkdirp(folder, {}, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, folder);
        });
    };
};

const storage = function storage(options) { // eslint-disable-line no-unused-vars
    return DiskHashStorage({ // eslint-disable-line new-cap
        // destination: getDestination(options)
    });
};

const uploader = module.exports = function upload(options) { // eslint-disable-line no-unused-vars
    return multer({
        storage: storage(options),
        limits: { }
    });
};
