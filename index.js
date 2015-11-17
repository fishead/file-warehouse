'use strict';

const app = module.exports = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config.json');
const cors = require('cors');
const debug = require('debug')('file-warehouse:index');
const uploader = require('./uploader');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const passport = require('./passport.js');


app.enable('trust proxy');
app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 复制文件
const copyFile = function copyFile(sourceFile, destFile) {
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

// 记录文件信息
const saveMeta = function saveMeta(req, res, next) {
    const file = req.file;
    const savePath = path.join(__dirname, config.upload.meta, req.user.beatleTag, req.path);

    mkdirp(path.dirname(savePath), {}, (err) => {
        if (err) {
            return next(err);
        }
        fs.readFile(savePath, 'utf8', (err1, data) => {
            let _data = data;
            if (err1) {
                file.createAt = Date.now();
                _data = JSON.stringify(file);
            }
            _data = JSON.parse(_data);
            _data.originalname = file.originalname;
            _data.mimetype = file.mimetype;
            _data.hash = file.hash;
            _data.size = file.size;
            _data.downloads = _data.downloads || 0;
            _data.updatedAt = Date.now();

            fs.writeFile(savePath, JSON.stringify(_data), 'utf8', (err2) => {
                if (err2) {
                    return next(err2);
                }
                return next();
            });
        });
    });
};

// 上传文件
const saveChunk = function saveChunk(req, res, next) {
    const file = req.file;
    const fileHash = file.hash;
    const oldFilePath = file.path;
    const newFilePath = path.join(__dirname, config.upload.chunk, fileHash.slice(0, 2), fileHash.slice(2));

    mkdirp(path.dirname(newFilePath), {}, (err) => {
        if (err) {
            return next(err);
        }
        copyFile(oldFilePath, newFilePath).then(() => {
            return res.end();
        }).catch((err3) => {
            next(err3);
        });
    });
};

// 读取文件信息
const readMeta = function readMeta(req, res, next) {
    const metaPath = path.join(__dirname, config.upload.meta, req.params.beatleTag, req.path);

    fs.readFile(metaPath, 'utf8', (err1, data) => {
        if (err1) {
            return res.status(404).end();
        }
        const _data = JSON.parse(data);
        res.body = res.body || {};
        res.body.metaPath = metaPath;
        res.body.meta = _data;
        next();
    });
};

// 修改文件信息
const setMeta = function setMeta(req, res, next) {
    const metaPath = res.body.metaPath;
    const _data = res.body.meta;
    _data.downloads += 1;

    fs.writeFile(metaPath, JSON.stringify(_data), 'utf8', (err2) => {
        if (err2) {
            return next(err2);
        }
        next();
    });
};

// 下载文件
const getFile = function getFile(req, res) {
    const meta = res.body.meta;
    const hash = meta.hash;
    const filePath = path.join(__dirname, config.upload.chunk, hash.slice(0, 2), hash.slice(2));
    const options = {
        headers: {
            'Content-Type': meta.mimetype
        }
    };
    if (meta.mimetype.indexOf('image') < 0) {
        options.headers['Content-Disposition'] = 'attachment; filename=' + meta.originalname;
    }
    res.sendFile(filePath, options, (err) => {
        if (err) {
            return res.end();
        }
        debug('file sent');
    });
};

// 删除文件
const deleteFile = function deleteFile(req, res) {
    const metaPath = res.body.metaPath;
    const meta = res.body.meta;
    const hash = meta.hash;
    const filePath = path.join(__dirname, config.upload.chunk, hash.slice(0, 2), hash.slice(2));
    fs.unlink(filePath);
    fs.unlink(metaPath);
};

app.use(function ensureBucketExists(req, res, next) {
    const urlPath = req.path.split('/');
    if (urlPath.length < 3) {
        return res.status(400).end('filename not exists');
    }
    if (urlPath.length < 2) {
        return res.status(400).end('bucket not exists');
    }
    next();
});

app.post('/*', passport.authenticate('jwt', {session: false}), uploader(config.upload).single('single'), saveMeta, saveChunk);

app.get('/*', readMeta, setMeta, getFile);

app.delete('/*', passport.authenticate('jwt', {session: false}), readMeta, deleteFile);

app.use((req, res) => {
    res.status(404).end();
});

app.use((err, req, res) => {
    debug(err);
    res.status(500).end();
});

if (!module.parent) {
    const port = config.misc.listen_port;
    app.listen(port, () => {
        console.log('listening on ' + port);
        debug('listening on ' + port);
    });
}
