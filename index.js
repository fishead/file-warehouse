'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config.json');
const path = require('path');
const passport = require('./misc/passport');
const cors = require('cors');
const co = require('co');
const multerParser = require('multer-parser');

let app = express();
app.enable('trust proxy');
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multerParser({
    dest: config.upload.dest
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use('/v1', require('./v1'));

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(function (req, res, next) {
    res.status(404).end();
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500).end(err.message);
});

module.exports = app;

if (!module.parent) {
    const sequelize = require('./misc/db').sequelize;
    const server = require('http').Server(app);

    sequelize.sync({ force: false })
    .then(function() {
        server.listen(config.listen_port, function() {
            console.log('listenning on ' + config.listen_port);
        });
    });
}
