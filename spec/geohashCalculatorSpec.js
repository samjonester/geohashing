var geohashCalculator = require('../lib/geohashCalculator');

describe('Calculating new Geohash', function() {
  it('should create a new set of coordinates from lat, long, date, dow', function() {
    var hexToDec = function(hex) {
      if (hex === 'db9318c2259923d0') {
        return 0.857713;
      } else if (hex === '8b672cb305440f97') {
        return 0.544544;
      }
    }

    var inputLat = 37.421542;
    var inputLong = -122.085589;
    var date = '2005-05-26';
    var dow = '10458.68';

    var subject = geohashCalculator.calculateGeohashWithHexConverter(hexToDec);
    
    expect(subject(inputLat, inputLong, date, dow)).toEqual({lat: 37.857713, lon: -122.544544});
  });

  it('should convert a hexidecimal string to a floating point number', function() {
    var subject = geohashCalculator.hexToDec;

    expect(subject('8b672cb305440f97')).toBeCloseTo(0.544544)
  });

});
