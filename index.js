'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.json')[process.env.NODE_ENV || 'development'];
const upload = require('./upload');
const path = require('path');
const passport = require('./misc/passport');
const cors = require('cors');
const co = require('co');
const Bearer = require('./models').Bearer;
const User = require('./models').User;
const utils = require('./misc/utils');

let app = express();
app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/signup', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/signup', function (req, res, next) {
    co(function *() {
        const user = yield User.create({
            username: req.body.username,
            password: req.body.password
        });
        res.sendFile(path.join(__dirname, 'signedup.html'));
    }).catch(next);
});

app.post('/token', passport.authenticate('local'), function (req, res, next) {
    co(function *() {
        const bearer = yield Bearer.create({
            token: utils.uid(32),
            userId: req.user.id,
            expireIn: 60 * 60* 24 * 7,
            refreshToken: utils.uid(32),
            scope: '*'
        });
        res.json({
            token: bearer.token,
            expireIn: bearer.expireIn
        });
    });
});

app.post('/maps', passport.authenticate('wormhole', { session: false }), upload({ category: '/maps' }), function (req, res, next) {
    res.status(200).end();
});
app.get('/maps/:mapName', passport.authenticate('wormhole', { session: false }), function (req, res, next) {
    res.sendFile(path.join(__dirname, config.upload.path, '/maps', req.params.mapName));
});

app.post('/routedatas', passport.authenticate('wormhole', { session: false }), upload({ category: '/routedatas' }), function (req, res, next) {
    res.status(200).end();
});
app.get('/routedatas/:dataName', passport.authenticate('wormhole', { session: false }), function (req, res, next) {
    res.sendFile(path.join(__dirname, config.upload.path, '/routedatas', req.params.dataName));
});

app.use(function (req, res, next) {
    res.status(404).end();
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500).end(err.message);
});

module.exports = app;

if(!module.parent) {
    const sequelize = require('./misc/db').sequelize;

    co(function *() {
        const env = process.env.NODE_ENV || 'development';
        yield sequelize.sync({ force: true });

        // const user = yield User.create({
        //     username: 'fishead',
        //     password: 'fishead'
        // });

        app.listen(config.listen_port, function (err) {
            console.log('listening on ' + config.listen_port);
        });
    });
}
