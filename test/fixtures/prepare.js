'use strict';

const request = require('supertest');
const app = require('../../');
const dummy = require('./dummy.json');
const Admin = require('../../models').Admin;
const Tourist = require('../../models').Tourist;
const FeedbackCategory = require('../../models').FeedbackCategory;
const Shop = require('../../models').Shop;
const PrizeType = require('../../models').PrizeType;
const Prize = require('../../models').Prize;
const co = require('co');
const hashword = require('hashword');

const getRootToken = function getRootToken() {
    return new Promise(function(resolve, reject) {
        co(function*() {
            let root = dummy.root;
            yield Admin.remove({ username: root.username });
            yield Admin.create({
                username: root.username,
                hash: yield hashword.generate(root.password),
                type: root.type
            });
            request(app).post('/auth/token')
                .send(root)
                .end(function(err, res) {
                    if (err) { return reject(err); }
                    resolve(res.body.access_token);
                });
        }).catch(function(err) {
            reject(err);
        });
    });
};

const getAdminToken = function getAdminToken() {
    return new Promise(function(resolve, reject) {
        co(function*() {
            let admin1 = dummy.admin1;
            yield Admin.remove({ username: admin1.username });
            yield Admin.create({
                username: admin1.username,
                hash: yield hashword.generate(admin1.password),
                type: admin1.type
            });
            request(app).post('/auth/token')
                .send(admin1)
                .end(function(err, res) {
                    if (err) { return reject(err); }
                    resolve(res.body.access_token);
                });
        }).catch(function(err) {
            reject(err);
        });
    });
};

const getTouristToken = function getTouristToken() {
    return new Promise(function(resolve, reject) {
        co(function*() {
            let tourist = dummy.tourist;
            yield Tourist.remove({ phone: tourist.phone });
            tourist.hash = yield hashword.generate(tourist.password);
            yield Tourist.create(tourist);
            request(app).post('/auth.app/token')
                .send(tourist)
                .expect(200)
                .expect(function (res) {
                    resolve(res.body.data);
                })
                .end(function(err) {
                    if (err) { return reject(err); }
                });
        }).catch(function(err) {
            reject(err);
        });
    });
};

const getOneFeedbackCategoryId = function getOneFeedbackCategoryId() {
    return new Promise(function(resolve, reject) {
        co(function*() {
            let feedbackCategory1 = dummy.feedbackCategory1;
            yield FeedbackCategory.remove({ name: feedbackCategory1.name });
            feedbackCategory1 = yield FeedbackCategory.create(feedbackCategory1);
            // feedbackCategory1 = yield FeedbackCategory.findOne({ name: feedbackCategory1.name }).exec();
            resolve(feedbackCategory1._id.toString());
        }).catch(function(err) {
            reject(err);
        });
    });
};

const getOneShopId = function getOneShopId() {
    return new Promise(function(resolve, reject) {
        co(function*() {
            let shop1 = dummy.shop1;
            yield Shop.remove({ name: shop1.name });
            shop1 = yield Shop.create(shop1);
            // shop1 = yield Shop.findOne({ name: shop1.name }).exec();
            resolve(shop1._id.toString());
        }).catch(function(err) {
            reject(err);
        });
    });
};

const getOnePrizeTypeId = function getOnePrizeTypeId() {
    return new Promise(function(resolve, reject) {
        co(function*() {
            let prizeType = dummy.prizeType;
            yield PrizeType.remove({ name: prizeType.name });
            prizeType = yield PrizeType.create(prizeType);
            // prizeType = yield PrizeType.findOne({ name: prizeType.name }).exec();
            resolve(prizeType._id.toString());
        }).catch(function(err) {
            reject(err);
        });
    });
};

const getOneTouristId = function getOneTouristId() {
    return new Promise(function(resolve, reject) {
        co(function *() {
            let tourist = dummy.tourist;
            yield Tourist.remove();
            tourist = yield Tourist.create(tourist);
            resolve(tourist._id.toString());
        }).catch(function (err) {
            reject(err);
        });
    });
};

const getOnePrizeId = function getOnePrizeId() {
    return new Promise(function(resolve, reject) {
        co(function *() {
            let prize = {};
            prize.touristId = yield getOneTouristId();
            prize.prizeTypeId = yield getOnePrizeTypeId();

            prize = yield Prize.create(prize);
            resolve(prize._id.toString());
        }).catch(function (err) {
            reject(err);
        });
    });
};

exports.getRootToken = getRootToken;
exports.getAdminToken = getAdminToken;
exports.getTouristToken = getTouristToken;
exports.getOneFeedbackCategoryId = getOneFeedbackCategoryId;
exports.getOneShopId = getOneShopId;
exports.getOnePrizeTypeId = getOnePrizeTypeId;
exports.getOneTouristId = getOneTouristId;
exports.getOnePrizeId = getOnePrizeId;
