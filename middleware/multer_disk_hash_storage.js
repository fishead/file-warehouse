'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const mkdirp = require('mkdirp');

function getFilename(req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
        cb(err, err ? undefined : raw.toString('hex'));
    });
}

function getDestination(req, file, cb) {
    cb(null, os.tmpdir());
}

function DiskHashStorage(opts) {
    this.getFilename = (opts.filename || getFilename);

    if (typeof opts.destination === 'string') {
        mkdirp.sync(opts.destination);
        this.getDestination = function _getDestination($0, $1, cb) {
            cb(null, opts.destination);
        };
    } else {
        this.getDestination = (opts.destination || getDestination);
    }
}

DiskHashStorage.prototype._handleFile = function _handleFile(req, file, cb) {
    const that = this;

    that.getDestination(req, file, (error, destination) => {
        if (error) {
            return cb(error);
        }

        that.getFilename(req, file, (err, filename) => {
            if (err) {
                return cb(err);
            }

            const finalPath = path.join(destination, filename);
            const inStream = file.stream;
            const outStream = fs.createWriteStream(finalPath);
            const sha1 = crypto.createHash('sha1');

            inStream.pipe(outStream);

            inStream.on('data', (chunk) => {
                sha1.update(chunk);
            });

            outStream.on('error', cb);
            outStream.on('finish', () =>{
                cb(null, {
                    destination: destination,
                    filename: filename,
                    path: finalPath,
                    size: outStream.bytesWritten,
                    hash: sha1.digest('hex')
                });
            });
        });
    });
};

DiskHashStorage.prototype._removeFile = function _removeFile(req, file, cb) {
    const _path = file.path;

    delete file.destination;
    delete file.filename;
    delete file.path;

    fs.unlink(_path, cb);
};

module.exports = function(opts) {
    return new DiskHashStorage(opts);
};
