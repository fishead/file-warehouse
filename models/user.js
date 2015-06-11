'use strict';

const sequelize = require('../misc/db').sequelize;
const Sequelize = require('../misc/db').Sequelize;

const User = sequelize.define('User', {
    email: Sequelize.STRING,
    accessToken: Sequelize.STRING
});

module.exports = User;
