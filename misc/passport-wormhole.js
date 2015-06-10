'use strict';

const passport = require('passport');
const util = require('util');

function WormholeStrategy(options, verify) {
    if (typeof options === 'function') {
        verify = options;
        options = {};
    }
    if (!verify) {
        throw new Error('Token authentication strategy requires a verify function');
    }

    passport.Strategy.call(this);
    this.name = 'wormhole';
    this._verify = verify;
    this._passReqToCallback = options.passReqToCallback;
}

util.inherits(WormholeStrategy, passport.Strategy);

WormholeStrategy.prototype.authenticate = function(req) {
    const token = req.headers.wormtoken || req.query.wormtoken;
    if (!token) { return this.fail('token does not exists'); }

    var self = this;

    function verified(err, user) {
        if (err) { return self.error(err); }
        if (!user) { return self.fail('user does not exists'); }
        self.success(user);
    }

    if (self._passReqToCallback) {
        this._verify(req, token, verified);
    } else {
        this._verify(token, verified);
    }
};

module.exports.Strategy = WormholeStrategy;
