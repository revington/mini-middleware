'use strict';

function flatten( /*list of middlewares*/ ) {
    var len, i, el, input = Array.prototype.slice.call(arguments);
    for (i = 0, len = input.length; i < len; i++) {
        el = input[i];
        if (!Array.isArray(el)) {
            continue;
        }
        Array.prototype.splice.apply(input, [i, 1].concat(el));
        return flatten.apply(null, input);
    }
    return input;
}

function create( /* list of middlewares*/ ) {
    var stack = flatten.apply(null, arguments);

    function runMiniMiddleware(context, callback) {
        var i = 0;

        function next(err) {
            var fn;
            if (err && callback) {
                return callback(err);
            }
            if (err) {
                throw err;
            }
            fn = stack[i++];
            if (fn) {
                return fn(context, next);
            }
            return callback && callback(null, context);
        }
        next();
    }
    runMiniMiddleware.use = function ( /*list of middlewares*/ ) {
        flatten.apply(null, arguments).forEach(function (x) {
            stack.push(x);
        });
    };
    return runMiniMiddleware;
}
exports = module.exports = {
    create: create,
    flatten: flatten
};
