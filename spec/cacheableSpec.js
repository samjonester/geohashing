var cacheable = require('../lib/cacheable');

describe('caching function calls', function() {
  afterEach(function() {
    cacheable.clear();
  });

  it('should create cached function by key', function() {
    var cacheKey = "my-cache-key";
    var myFun = function() { return 'foobar' }

    var subject = cacheable.cacheable(myFun, cacheKey);

    expect(subject()).toEqual('foobar');
  });

  it('should return the same result with cached function', function() {
    var cacheKey = "my-cache-key";

    var once = cacheable.cacheable(Math.random, cacheKey)();
    var twice = cacheable.cacheable(Math.random, cacheKey)();

    expect(once).toEqual(twice);
  });

  it('should provide arguments to cached call', function() {
    var cacheKey = "my-cache-key";
    var myFun = function(arg) { return 'hello ' + arg }

    var subject = cacheable.cacheable(myFun, cacheKey);

    expect(subject('foobar')).toEqual('hello foobar');
  });
});
