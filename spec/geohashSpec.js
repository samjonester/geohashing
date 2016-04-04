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
});
