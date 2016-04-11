// Naive - Will take all the memory! 
var cache = {};

const clear = () => {
  cache = {};
}

const cacheable = (fun, key) => {
  return function() {
   return cache.key || (cache.key = fun.apply(this, arguments));
  }
}

module.exports = {
  cacheable: cacheable,
  clear: clear
}
