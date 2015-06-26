'use strict';

const util = require('util');
const Strategy = require('passport-strategy');
const lodash = require('lodash');
const request = require('request');

function WormholeTokenStrategy(options, verify) {
    if (lodash.isFunction(options)) {
        verify = options;
        options = {};
    }
    if (!verify) { throw new TypeError('WormholeTokenStrategy requires a verify callback'); }

    this._tokenField = options.tokenField || 'wormhole_token' || 'token';

    Strategy.call(this);
    this.name = 'wormhole-token';
    this._verify = verify;
}

util.inherits(WormholeTokenStrategy, Strategy);

WormholeTokenStrategy.prototype.authenticate = function authenticate(req, options) {
    const whtoken = req.body[this._tokenField] || req.query[this._tokenField];

    console.log(whtoken);
    if (!whtoken) {
        return this.fail({
            message: options.badRequestMessage || 'token required'
        }, 400);
    }

    let opts = {
        url: 'http://wormhole.fishead.io/v1/auth/profile',
        headers: {
            'Authorization': 'Bearer ' + whtoken
        }
    };
    request(opts, function (error, response, body) {
        if (error) {
            console.log(error);
            return this.error(error);
        }
        if (response.statusCode === 200) {
            let profile = body;
            this._verify(profile, function (err, user, info) {
                if (err) { return this.error(err); }
                if (!user) { return this.fail(info); }
                this.success(user, info);
            }.bind(this));
        } else {
            this.fail(response);
        }
    }.bind(this));
};

exports.Strategy = WormholeTokenStrategy;
