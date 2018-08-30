'use strict';
const assert = require('assert');
const {
    create
} = require('../');
describe('When next receives an error', function () {
    function fn(ctx, next) {
        return next(new Error('I am an error'));
    }

    function fn2() {
        throw new Error('I should not get called');
    }
    describe('When callback is provided', function () {
        it('should callback that error', function (done) {
            var stack = create(fn, fn2);
            stack({}, function (err) {
                assert(err);
                return done();
            });
        });
    });
    describe('When no callback is provided', function () {
        it('should throw that error', function () {
            var stack = create(fn, fn2);
            try {
                stack({});
            } catch (e) {
                return;
            }
            assert.fail();
        });
    });
});
