'use strict';

let router = require('express').Router();
const config = require('../config.json');
const path = require('path');
const fs = require('fs');
const passport = require('../misc/passport');

const saveRouteData = function saveRouteData(req, res, next) {
    if (!!req.files.routedata && req.files.routedata[0]) {
        let routedata = req.files.routedata[0];
        const savePath = path.join(__dirname, '../', config.upload.dest, routedata.name);

        if (!fs.statSync(savePath)) {
            fs.renameSync(routedata.path, savePath);
            return res.status(201).end();
        }
        return res.status(200).end();
    }
    return res.status(400).end();
};

const fetchRouteData = function fetchRouteData(req, res, next) {
    res.sendFile(path.join(__dirname, '../', config.upload.dest, req.params.dataName));
};

router.use(passport.authenticate('token', { session: false }));
router.post('/', saveRouteData);
router.get('/:dataName', fetchRouteData);

module.exports = router;
