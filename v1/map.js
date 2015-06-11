'use strict';

let router = require('express').Router();
const config = require('../config.json');
const path = require('path');
const passport = require('../misc/passport');

const saveMap = function saveMap(req, res, next) {
    // body...
};

const fetchMap = function fetchMap(req, res, next) {
    res.sendFile(path.join(__dirname, config.upload.path, '/maps', req.params.mapName));
};

router.use(passport.authenticate('token', { session: false }));
router.post('/', saveMap);
router.get('/:mapName', fetchMap);

module.exports = router;
