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
