'use strict';

const crypto = require('crypto');

const uid = function uid(len) {
    return crypto.randomBytes(len).toString('hex');
};

exports.uid = uid;
