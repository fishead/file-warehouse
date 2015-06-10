'use strict';

const app = require('./');
const request = require('supertest');
const file1 = 'test_file1.jpg';
const file2 = 'test_file2';
const User = require('./models').User;
const co = require('co');

let token = '';

describe('Maps', function () {
    this.timeout(20000);
    before(function (done) {
        co(function *() {
            yield User.create({
                username: 'fishead',
                password: 'fishead'
            });

            request(app).post('/token')
            .send({
                username: 'fishead',
                password: 'fishead'
            })
            .expect(function (res) {
                token = res.body.token;
            })
            .end(done);
        });
    });

    describe('#upload', function () {
        it('should return 200', function (done) {
            request(app).post('/maps')
            .set('wormtoken', token)
            .attach('map', file1)
            .expect(200)
            .end(done);
        });

        it('should return 200', function (done) {
            request(app).post('/maps')
            .set('wormtoken', token)
            .attach('map', file2)
            .expect(200)
            .end(done);
        });
    });

    describe('#download', function () {
        it('should return 200', function (done) {
            request(app).get('/maps/' + file1)
            .set('wormtoken', token)
            .expect(200)
            .end(done);
        });

        it('should return 200', function (done) {
            request(app).get('/maps/' + file2)
            .set('wormtoken', token)
            .expect(200)
            .end(done);
        });
    });
});

describe('RouteDatas', function () {
    describe('#upload', function () {
        it('should return 200', function (done) {
            request(app).post('/routedatas')
            .set('wormtoken', token)
            .attach('routedata', file1)
            .expect(200)
            .end(done);
        });

        it('should return 200', function (done) {
            request(app).post('/routedatas')
            .set('wormtoken', token)
            .attach('routedata', file2)
            .expect(200)
            .end(done);
        });
    });

    describe('#download', function () {
        it('should return 200', function (done) {
            request(app).get('/routedatas/' + file1)
            .set('wormtoken', token)
            .expect(200)
            .end(done);
        });

        it('should return 200', function (done) {
            request(app).get('/routedatas/' + file2)
            .set('wormtoken', token)
            .expect(200)
            .end(done);
        });
    });
});
