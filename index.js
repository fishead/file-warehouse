'use strict';

const app = module.exports = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config.json');
const cors = require('cors');
const debug = require('debug')('file-warehouse:index');
const uploader = require('./uploader');

app.enable('trust proxy');
app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const fieldConfig = [
    {
        name: 'single',
        maxCount: 1
    }, {
        name: 'multiple',
        maxCount: 10
    }
];
app.post('/*', uploader(config.upload).fields(fieldConfig), function (req, res) {
    return res.end();
});

app.use(function (req, res) {
    res.status(404).end();
});

app.use(function (err, req, res) {
    debug(err);
    res.status(500).end();
});

if (!module.parent) {
    const port = config.misc.listen_port;
    app.listen(port, function () {
        debug('listening on ' + port);
    });
}
