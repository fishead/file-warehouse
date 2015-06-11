'use strict';

let router = require('express').Router();

router.use('/maps', require('./map'));
router.use('/routedatas', require('./routedata'));
router.use('/auth', require('./auth'));

module.exports = router;
