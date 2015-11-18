'use strict';

const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const config = require('../config.json');

passport.serializeUser((user, done) => {
    done(null, user.beatleTag);
});

passport.deserializeUser((beatleTag, done) => {
    const user = {
        beatleTag: beatleTag
    };
    done(null, user);
});

passport.use('jwt', new JWTStrategy({
    secretOrKey: config.jwt.accessToken.secret,
    issuer: config.jwt.accessToken.issuer,
    audience: config.jwt.accessToken.audience,
    tokenBodyField: 'bearer',
    tokenQueryParameterName: 'bearer',
    authScheme: 'Bearer',
    passReqToCallback: false
}, (payload, done) => {
    done(null, payload);
}));

module.exports = passport;
