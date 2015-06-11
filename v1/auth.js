'use strict';

let router = require('express').Router();
const config = require('../config.json');
const path = require('path');
const passport = require('../misc/passport');
const request = require('request');
const jwt = require('jsonwebtoken');

const getSignPage = function getSignPage(req, res, next) {
    res.send('<a href="' + config.oauth2.authorization_url +
                '?response_type=code&client_id=' + config.oauth2.client_id +
                '&state=xyz&redirect_uri=' + config.oauth2.callback_url + '">使用开发者帐号登录</a> ');
    // res.sendFile(path.join(__dirname, '../public/login.html'));
};

const fetchToken = function fetchToken(req, res, next) {
    const payload = {
        userId: req.user.id,
        email: req.user.email
    };
    const secret = 'cfvgyjimkdcfgvjhm';
    const options = {
        algorithm: 'HS256',
        expiresInMinutes: 60 * 24 * 7,
        audience: req.user.email,
        subject: 'blah blah',
        issuer: 'wormhole',
        noTimestamp: false,
        headers: {}
    };

    res.json({
        token: jwt.sign(payload, secret, options),
        expire_in: options.expiresInMinutes
    });
};

const oauth2Callback = function oauth2Callback(req, res, next) {
    request.post(config.oauth2.token_url, {
                form: {
                    grant_type: 'authorization_code',
                    code: req.query.code,
                    redirect_uri: config.oauth2.callback_url,
                    state: req.query.state,
                    client_id: config.oauth2.client_id,
                    client_secret: config.oauth2.client_secret
                }
            }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const accessToken = JSON.parse(body).access_token;
            request.get(config.oauth2.profile_url, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            }, function (error, response, body) {
                console.log(body);
            });
        }
        res.end();
    });
};

// router.get('/login', getSignPage);
router.post('/token', passport.authenticate('local-wormhole', { session: false }), fetchToken);
router.get('/callback', oauth2Callback);

module.exports = router;
