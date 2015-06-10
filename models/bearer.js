'use strict';

const sequelize = require('../misc/db').sequelize;
const Sequelize = require('../misc/db').Sequelize;

// 具体的各种活动
const Bearer = sequelize.define('Bearer', {
    token: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    expireIn: Sequelize.INTEGER,
    refreshToken: Sequelize.STRING,
    scope: Sequelize.STRING
});

module.exports = Bearer;
