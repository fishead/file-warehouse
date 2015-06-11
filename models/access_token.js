'use strict';

const sequelize = require('../misc/db').sequelize;
const Sequelize = require('../misc/db').Sequelize;

const AccessToken = sequelize.define('AccessToken', {
    token: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    expireIn: Sequelize.INTEGER,
    refreshToken: Sequelize.STRING,
    scope: Sequelize.STRING
});

module.exports = AccessToken;
