'use strict';

const path = require('path');
const config = require('../config.json')[process.env.NODE_ENV || 'development'];

const Sequelize = require('sequelize');
const mysql = config.mysql;
const sequelizeOptions = config.sequelize;

if (sequelizeOptions.logging) {
    sequelizeOptions.logging = console.log;
}

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, sequelizeOptions);

exports.Sequelize = Sequelize;
exports.sequelize = sequelize;
