var geohash = require('../lib/geohash')

describe('geohashing', function() {
  it('should get the current formatted date', function() {
    var DateProducer = function() {
      // Jan 1, 2016 - month is zero based
      return new Date(2016, 00, 01);
    }

    var subject = geohash.formatDate(DateProducer);

    expect(subject()).toEqual('2016-01-01');
  });

  it('should complete journey test', function(done) {
    var subject = geohash.geohash;

    subject(37.421542, -122.085589).then(function(response) {
      expect(response.lat).not.toBe(undefined);
      expect(response.lon).not.toBe(undefined);
      done();
    });
  });
  
  it('should complete journey test with callback', function(done) {
    var subject = geohash.geohash;

    subject(37.421542, -122.085589, function(response) {
      expect(response.lat).not.toBe(undefined);
      expect(response.lon).not.toBe(undefined);
      done();
    });
  });
});
