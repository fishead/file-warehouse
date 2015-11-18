'use strict';

const fs = require('fs');

exports.stream = function stream(sourceFile, destFile) {
    return new Promise(function(resolve, reject) {
        try {
            const rs = fs.createReadStream(sourceFile);
            const ws = fs.createWriteStream(destFile);
            rs.pipe(ws);

            ws.on('finish', () => resolve(true));

            ws.on('error', (err) => reject(err));
        } catch (err) {
            reject(err);
        }
    });
};
