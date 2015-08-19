'use strict';

let router = require('express').Router();
const config = require('../config.json');
const path = require('path');
const fs = require('fs');
const passport = require('../misc/passport');
const moveFile = require('../misc/utils').moveFile;

const category = 'routedatas';

const saveRouteData = function saveRouteData(req, res, next) {
    if (!!req.files.routedata && req.files.routedata[0]) {
        let routedata = req.files.routedata[0];

        const fromPath = path.join(__dirname, '../', config.upload.dest, routedata.name);
        const toPath = path.join(__dirname, '../', config.upload.dest, '../', category, routedata.originalname);
        // console.log(fromPath);
        // console.log(toPath);

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

const fetchRouteData = function fetchRouteData(req, res, next) {
    res.sendFile(path.join(__dirname, '../', config.upload.dest, '../', category, req.params.dataName));
};

router.use(passport.authenticate('jwt', { session: false }));
router.post('/', saveRouteData);
router.get('/:dataName', fetchRouteData);

module.exports = router;
