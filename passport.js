'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const co = require('co');
const hashword = require('hashword');
const debug = require('debug')('beatle-tag:misc:passport');
const config = require('./config.json');

/**passport.serializeUser((user, done) => {
    done(null, user.beatleTag);
});

passport.deserializeUser((beatleTag, done) => {
    co(function *() {
        const user = yield UserBase.findOne({ beatleTag: beatleTag }).exec();
        done(null, user);
    }).catch((err) => {
        debug(err);
        done(err);
    });
});

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function localStrategy(req, username, password, done) {
    co(function *() {
        if (req.body.type === UserEmail.TYPE) {
            const condition = {
                email: username
            };
            const user = yield UserEmail.findOne(condition).exec();
            if (!user) { return done(null, false); }
            if (!(yield hashword.compare(password, user.passhash))) { return done(null, false); }
            return done(null, user);
        } else if (req.body.type === UserPhone.TYPE) {
            const condition = {
                phone: username
            };
            const user = yield UserPhone.findOne(condition).exec();
            if (!user) { return done(null, false); }
            if (!(yield hashword.compare(password, user.passhash))) { return done(null, false); }
            return done(null, user);
        }

        done(null, false);
    }).catch((err) => {
        debug(err);
        done(err);
    });
}));

passport.use('oauth2-client-password', new ClientPasswordStrategy(function (clientKey, clientSecret, done) {
    co(function *() {
        const client = yield Client.findOne({
            key: clientKey
        });

        if (!client) { return done(null, false); }
        if (client.secret !== clientSecret) { return done(null, false); }
        done(null, client);
    }).catch(function (err) {
        debug(err);
        done(err);
    });
}));*/

passport.use('jwt', new JWTStrategy({
    secretOrKey: config.jwt.accessToken.secret,
    issuer: config.jwt.accessToken.issuer,
    audience: config.jwt.accessToken.audience,
    tokenBodyField: 'bearer',
    tokenQueryParameterName: 'bearer',
    authScheme: 'Bearer',
    passReqToCallback: false
}, function (payload, done) {
    co(function *() {
        done(null, payload);
    }).catch((err) => {
        debug(err);
        done(err);
    });
}));

module.exports = passport;
