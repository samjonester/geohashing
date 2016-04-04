var geohashCalculator = require('../lib/geohashCalculator');

describe('Calculating new Geohash', function() {
  it('should convert a hexidecimal string to a floating point number', function() {
    var subject = geohashCalculator.hexToDec;

    expect(subject('8b672cb305440f97')).toBeCloseTo(0.544544)
  });

  it('should calculate decimal hashes', function() {
    var hexConverter = function(hex) { return 0.12345 }

    var subject = geohashCalculator.calculateDecimalHashes(hexConverter);

    expect(subject('2005-05-26-10458.68')).toEqual([ 0.12345, 0.12345]);
  });

  it('should combine lat and lon with calculated decimals', function() {
    var lat = 37.12345;
    var lon = -122.12345;

    var subject = geohashCalculator.combineLatLonWithDecimals(lat, lon);

    expect(subject([0.456, 0.789])).toEqual({lat: 37.456, lon: -122.789});
  });

});
