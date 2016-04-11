const geohash = require('../lib/geohash')

describe('geohashing', () => {
  it('should get the current formatted date', () => {
    function DateProducer() {
      return new Date(2016, 00, 01)      // Jan 1, 2016 - month is zero based
    }

    const subject = geohash.formatDate(DateProducer);

    expect(subject()).toEqual('2016-01-01');
  });

  it('should complete journey test', done => {
    const subject = geohash.geohash;

    subject(37.421542, -122.085589).then(response => {
      expect(response.lat).not.toBe(undefined);
      expect(response.lon).not.toBe(undefined);
      done();
    });
  });
  
  it('should complete journey test with callback', done => {
    const subject = geohash.geohash;

    subject(37.421542, -122.085589, response => {
      expect(response.lat).not.toBe(undefined);
      expect(response.lon).not.toBe(undefined);
      done();
    });
  });
});
