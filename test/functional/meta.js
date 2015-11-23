'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../');

describe('Meta', function() {
    describe('#upload', function() {
        it('should return 201 if everything ok', function(done) {
            request(app).post('/liuyi/test')
                .attach('single', './test/fixtures/ah.jpg')
                .expect(201, done);
        });

        it('should return 400 if no file is upload', function(done) {
            request(app).post('/liuyi/nothing')
                .expect(400, done);
        });

        it('the file should be update if a new file is upload', function(done) {
            request(app).post('/liuyi/test')
                .attach('single', './test/fixtures/bh.jpeg')
                .expect(201, done);
        });
    });

    describe('#fetch', function() {
        it('should return 200 if everything is fine', function(done) {
            request(app).get('/liuyi/upload')
                .expect(200, done);
        });

        it('should return 404 if the file is not find', function(done) {
            request(app).get('/liuyi/me')
                .expect(404, done);
        });

    });

    describe('#remove', function() {
        it('should return 200 if everything is fine', function(done) {
            request(app).delete('/liuyi/test')
                .expect(200, done);
        });
        it('should return 204 if the file was removed', function(done) {
            request(app).delete('/liuyi/test')
                .expect(204, done);
        });
        before(function(done) {
            request(app).post('/liuyi/test.jpg')
                .attach('single', './test/fixtures/ah.jpg')
                .end(function() {
                    request(app).post('/liuyi/my.jpg')
                        .attach('single', './test/fixtures/ah.jpg')
                        .end(function() {
                            request(app).delete('/liuyi/my.jpg')
                                .end(done);
                        });
                });
        });
        it('when two different routes are all upload the same file and remove one of then,the other should be still in', function(done) {
            request(app).get('/liuyi/test.jpg')
                .expect(200, done);
        });
    });
});
