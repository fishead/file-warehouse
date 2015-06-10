'use strict';

const sequelize = require('../misc/db').sequelize;
const Sequelize = require('../misc/db').Sequelize;

const User = sequelize.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = User;
