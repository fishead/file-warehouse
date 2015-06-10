'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const WormholeStrategy = require('./passport-wormhole').Strategy;
const User = require('../models').User;
const Bearer = require('../models').Bearer;
const co = require('co');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
    co(function *() {
        let user = yield User.findById();
        done(null, user);
    }).catch(done);
});

passport.use('local', new LocalStrategy(function(username, password, done) {
    co(function *() {
        let condition = {
            where: {
                username: username
            }
        };
        let user = yield User.find(condition);
        if (!user) { return done(new Error('user does not exists')); }
        if (user.password !== password) { return done(new Error('username or password not match')); }

        done(null, user);
    }).catch(done);
}));

passport.use('wormhole', new WormholeStrategy(function (token, done) {
    co(function *() {
        const bearer = yield Bearer.find({
            where: {
                token: token
            }
        });

        if (!bearer) { return done('token expired or invalid'); }
        const user = yield User.findById(bearer.userId);
        if (!user) { return done('token may expired'); }
        return done(null, user);
    }).catch(done);
}));

module.exports = passport;
