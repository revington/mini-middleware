'use strict';
const assert = require('assert');
const {
    create
} = require('../');
describe('#create(listOfMiddlewares)', function () {
    function fn(ctx, next) {
        ctx.n = 1 + (ctx.n || 0);
        return next();
    }
    describe('#use(fn1..fn2)', function () {
        it('should add elements to the existing stack', function () {
            var ctxt = {
                n: 0
            };
            var stack = create(fn, fn);
            stack.use(fn, [fn,[fn,fn]]);
            stack(ctxt);
            assert.deepEqual(6, ctxt.n);
        });
    });
    it('should return a middleware runner', function () {
        var ctxt = {
            n: 0
        };
        var stack = create([fn, fn]);
        stack(ctxt);
        assert.deepEqual(2, ctxt.n);
    });
});
