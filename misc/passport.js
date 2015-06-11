'use strict';

const passport = require('passport');
const User = require('../models').User;
const OAuth2Strategy = require('passport-oauth2').Strategy;
const co = require('co');
const config = require('../config.json');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
    co(function *() {
        let user = yield User.findById();
        done(null, user);
    }).catch(done);
});

passport.use('oauth2', new OAuth2Strategy({
    authorizationURL: config.oauth2.authorization_url,
    tokenURL: config.oauth2.token_url,
    clientID: config.oauth2.client_id,
    clientSecret: config.oauth2.client_secret,
    callbackURL: config.oauth2.callback_url
  }, function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;
