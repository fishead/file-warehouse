'use strict';

const passport = require('passport');
const User = require('../models').User;
const OAuth2Strategy = require('passport-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const WormholeTokenStrategy = require('./passport_wormhole_token').Strategy;
const co = require('co');
const config = require('../config.json');
const request = require('request');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
    co(function *() {
        let user = yield User.findOne(userId);
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
      request.get(config.oauth2.profile_url, {
          headers: {
              Authorization: 'Bearer ' + accessToken
          }
      }, function (error, response, body) {
          profile = JSON.parse(body);
      });

      User.findOrCreate({
          where: {
              email: profile.email
          },
          defaults: {
              accessToken: accessToken
          }
      }).then(function (user) {
          done(null, user);
      }).catch(function (err) {
          done(err);
      });
  }
));

passport.use('local-wormhole', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password, done) {
    request.post(config.oauth2.token_url, {
        form: {
            grant_type: 'password',
            username: username,
            password: password,
            client_id: config.oauth2.client_id,
            client_secret: config.oauth2.client_secret
        }
    }, function (err, res, body) {
        if (err) { return done(err); }

        if (res.statusCode === 200) {
            const accessToken = JSON.parse(body).access_token;
            request.get(config.oauth2.profile_url, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            }, function (err, res, body) {
                if (err) { return done(err); }

                if (res.statusCode === 200) {
                    co(function *() {
                        const profile = JSON.parse(body);
                        const result = yield User.findOrCreate({
                            where: {
                                email: profile.email
                            },
                            defaults: {
                                accessToken: accessToken
                            }
                        });
                        const user = result[0];
                        done(null, user);
                    }).catch(function (err) {
                        // console.log(err.stack);
                        done(err);
                    });
                } else {
                    return done(null, false);
                }
            });
        } else {
            return done(null, false);
        }
    });
}));

passport.use('jwt', new JWTStrategy({
    secretOrKey: config.jwt.secret,
    // issuer: 'wormhole',
    // audience: '',
    tokenBodyField: 'bearer',
    tokenQueryParameterName: 'bearer',
    authScheme: 'Bearer',
    passReqToCallback: false
}, function (payload, done) {
    co(function *() {
        // console.log(payload);
        let user = yield User.findOne({
            where: {
                email: payload.email
            }
        });

        user = payload;
        user.id = payload.userId;

        // console.log(user);
        if (!user) { return done(null, false); }
        done(null, user);
    }).catch(function (err) {
        console.log(err.stack);
        done(err);
    });
}));

passport.use('wormhole-token', new WormholeTokenStrategy({
    profileURL: config.oauth2.profile_url,
    tokenField: 'Bearer'
}, function (profile, done) {
    co(function *() {
        const result = yield User.findOrCreate({
            where: {
                email: profile.email
            },
            defaults: {
                username: profile.email,
                nickName: profile.email,
                type: 'manager'
            }
        });
        let user = result[0];

        done(null, user);
    }).catch(function (err) {
        console.log(err.stack);
        done(err);
    });
}));

module.exports = passport;
