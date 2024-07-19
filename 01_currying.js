function currying(fn) {
  const curryingFn = function (...args) {
    if (args.length === fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...newArgs) {
        console.log(newArgs, args);
        return curryingFn.apply(this, newArgs.concat(args));
      };
    }
  };
  return curryingFn;
}

function add(x, y, z) {
  return x + y + z;
}

currying(add)(1)(2)(3);
