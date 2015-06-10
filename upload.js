'use strict';

const multer = require('multer');
const config = require('./config.json')[process.env.NODE_ENV || 'development'];
const path = require('path');
const fs = require('fs');

const uploadConfig = config.upload;

const upload = function upload(options) {
    return multer({
        dest: path.join(__dirname, uploadConfig.path),
        limits: {
            files: uploadConfig.limits.files,
            fileSize: uploadConfig.limits.fileSize
        },
        rename: function (fieldname, filename, req, res) {
            return filename;
        },
        changeDest: function (dest, req, res) {
            if (options.category != null) {
                dest = path.join(dest, options.category);
            }
            let stat = null;

            try {
                stat = fs.statSync(dest);
            } catch (err) {
                fs.mkdirSync(dest);
            }

            if (stat && !stat.isDirectory()) {
                throw new Error('DIFFERENT_INODE_EXISTS');
            }
            return dest;
        },
        onFileUploadComplete: function (file, req, res) {
            return res.status(200).end();
        },
        onError: function(err, next) {
            console.log(err.stack);
            next(err);
        }
    });
};

module.exports = upload;
