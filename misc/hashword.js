'use strict';

const co = require('co');
const config = require('../config.json')[process.env.NODE_ENV || 'development'];
const bcrypt = require('bcrypt');

const generate = function generate(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) { return reject(err); }
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) { return reject(err); }
                resolve(hash);
            });
        });
    });
};

const compare = function compare(password, hash) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, hash, function(err, result) {
            if (err) { return reject(err); }
            resolve(result);
        });
    });
};

exports.generate = generate;
exports.compare = compare;
