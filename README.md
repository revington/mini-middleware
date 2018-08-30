[![Build Status](https://travis-ci.org/revington/mini-middleware.svg?branch=master)](https://travis-ci.org/revington/mini-middleware)
# mini middleware

Just a simple, zero deps, middleware runner. 

## Example

```
const middleware = require('mini-middleware');
function m(ctx, next){
	ctx.n = 1 + (ctx.n || 0);
	return next();
}

let stack = middleware(m, [m,m]);

let context = {};
stack(context);
console.log(context); // prints {n: 3}

stack.use([m,m]);
stack(context);
console.log(context); // prints {n: 5}
```

## Example callback

```
const middleware = require('mini-middleware');
function m(ctx, next){
	ctx.n = 1 + (ctx.n || 0);
	return next();
}

let stack = middleware(m, [m,m]);

let context = {};
stack(context, function (err, ctxt){
  // context object received
});
console.log(context); // prints {n: 3}

stack.use([m,m]);
stack(context);
console.log(context); // prints {n: 5}
```

## Example callback + error

```
const middleware = require('mini-middleware');
function m(ctx, next){
  console.log('middleware called');
  return next(new Error('wooops'));
}

let stack = middleware(m, [m,m]);

let context = {};
stack(context, function (err, ctxt){
  if(err)...// handle error
});

// 'middleware called' it's printed just once.
```
