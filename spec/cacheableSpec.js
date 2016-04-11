var cacheable = require('../lib/cacheable');

describe('caching function calls', () => {
  afterEach(() => {
    cacheable.clear();
  });

  it('should create cached function by key', () => {
    var cacheKey = "my-cache-key";
    var myFun = () => 'foobar';

    var subject = cacheable.cacheable(myFun, cacheKey);

    expect(subject()).toEqual('foobar');
  });

  it('should return the same result with cached function', () => {
    var cacheKey = "my-cache-key";

    var once = cacheable.cacheable(Math.random, cacheKey)();
    var twice = cacheable.cacheable(Math.random, cacheKey)();

    expect(once).toEqual(twice);
  });

  it('should provide arguments to cached call', () => {
    var cacheKey = "my-cache-key";
    var myFun = arg => 'hello ' + arg;

    var subject = cacheable.cacheable(myFun, cacheKey);

    expect(subject('foobar')).toEqual('hello foobar');
  });
});
