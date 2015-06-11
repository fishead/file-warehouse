'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const uid = function uid(len) {
    return crypto.randomBytes(len).toString('hex');
};

const mkdir = function mkdir(dir) {
    return new Promise(function(resolve, reject) {
        try {
            fs.mkdir(dir, function (err) {
                if (err) { return reject(err); }
                resolve(true);
            });
        } catch (err) {
            reject(err);
        }
    });
};

const ensureDirectoryExists = function ensureDirectoryExists(dir) {
    return new Promise(function(resolve, reject) {
        try {
            fs.stat(dir, function (err, stats) {
                if (!err && stats) { return resolve(err); } // means dir exists
                mkdir(dir)
               .then(resolve)
               .catch(reject);
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const copyFile = function copyFile(sourceFile, destFile) {
    return new Promise(function(resolve, reject) {
        try {
            ensureDirectoryExists(path.dirname(destFile))
            .then(function (result) {
                let rs = fs.createReadStream(sourceFile);
                let ws = fs.createWriteStream(destFile);

                ws.on('finish', function () {
                    resolve(true);
                });

                ws.on('error', function (err) {
                    reject(err);
                });

                rs.pipe(ws);
            }).catch(reject);
        } catch (err) {
            // console.log(err.stack);
            reject(err);
        }
    });
};

const removeFile = function removeFile(file) {
    return new Promise(function(resolve, reject) {
        try {
            fs.unlink(file, function (err) {
                if (err) { return reject(err); }
                resolve(true);
            });
        } catch (err) {
            reject(err);
        }
    });
};

const moveFile = function moveFile(oldPath, newPath) {
    return new Promise(function(resolve, reject) {
        copyFile(oldPath, newPath)
        .then(function (result) {
            return removeFile(oldPath);
        }).then(resolve)
        .catch(reject);
    });
};

exports.uid = uid;
exports.moveFile = moveFile;
