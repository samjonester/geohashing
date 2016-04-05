// Naive - Will take all the memory! 
var cache = {};

var clear = function() {
  cache = {};
}

var cacheable = function(fun, key) {
  return function() {
    return cache.key || (cache.key = fun.apply(this, arguments))
  }
}

module.exports = {
  cacheable: cacheable,
  clear: clear
}
