'use strict';

let router = require('express').Router();
const config = require('../config.json');
const path = require('path');
const passport = require('../misc/passport');
const fs = require('fs');
const moveFile = require('../misc/utils').moveFile;

const CATEGORY = 'maps';

const saveMap = function saveMap(req, res, next) {
    if (!!req.files.map && req.files.map[0]) {
        let map = req.files.map[0];
        const fromPath = path.join(__dirname, '../', config.upload.dest, map.name);
        const toPath = path.join(__dirname, '../', config.upload.dest, '../', CATEGORY, map.originalname);

        return moveFile(fromPath, toPath)
        .then(function (result) {
            res.status(200).end();
        }).catch(function (err) {
            console.log(err.stack);
            res.status(500).end();
        });
    }
    return res.status(400).end();
};

const fetchMap = function fetchMap(req, res, next) {
    res.sendFile(path.join(__dirname, '../', config.upload.dest, '../', CATEGORY, req.params.mapName));
};

router.use(passport.authenticate('wormhole-token', { session: false }));
router.post('/', saveMap);
router.get('/:mapName', fetchMap);

module.exports = router;
