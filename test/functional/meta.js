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

        it('should return 404 if no file is upload', function(done) {
            request(app).post('/liuyi/nothing')
                .expect(400, done);
        });
    });

    describe('#fetch', function() {
        it('should always return 200', function(done) {
            request(app).get('/liuyi/upload')
                .expect(200, done);
        });

        it('should return 404 if not find', function(done) {
            request(app).get('/liuyi/me')
                .expect(404, done);
        });
    });

    describe.skip('#remove', function() {
        it('should return 200 if everything is fine', function(done) {
            request(app).delete('/liuyi/test')
                .expect(200, done);
        });
    });
});
