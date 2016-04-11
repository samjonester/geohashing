const cacheable = require('../lib/cacheable');

describe('caching function calls', () => {
  afterEach(() => {
    cacheable.clear();
  });

  it('should create cached function by key', () => {
    const cacheKey = "my-cache-key";
    const myFun = () => 'foobar';

    const subject = cacheable.cacheable(myFun, cacheKey);

    expect(subject()).toEqual('foobar');
  });

  it('should return the same result with cached function', () => {
    const cacheKey = "my-cache-key";

    const once = cacheable.cacheable(Math.random, cacheKey)();
    const twice = cacheable.cacheable(Math.random, cacheKey)();

    expect(once).toEqual(twice);
  });

  it('should provide arguments to cached call', () => {
    const cacheKey = "my-cache-key";
    const myFun = arg => 'hello ' + arg;

    const subject = cacheable.cacheable(myFun, cacheKey);

    expect(subject('foobar')).toEqual('hello foobar');
  });
});
