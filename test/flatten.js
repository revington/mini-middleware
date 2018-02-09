'use strict';
const assert = require('assert');
const {
    flatten
} = require('../');
describe('#flatten(array)', function () {
    var expected = ['a', 'b', 'c', 'd'];
    it('should not flatten an already flat array', function () {
        var actual = flatten(expected);
        assert.deepEqual(actual, expected);
    });
    it('should flatten arguments as array', function () {
        var actual = flatten.apply(null, expected);
        assert.deepEqual(actual, expected);
    });
    it('should flatten nested arrays', function () {
        var actual = flatten([
            ['a', ['b', ['c', 'd']]]
        ]);
        assert.deepEqual(actual, expected);
    });
    it('should flatten nested arrays', function () {
        var actual = flatten('a', [
            [
                ['b', ['c']]
            ]
        ], 'd');
        assert.deepEqual(actual, expected);
    });
    it('should flatten arrays', function () {
        var actual = flatten(['a', 'b', 'c', 'd']);
        assert.deepEqual(actual, expected);
    });
});
