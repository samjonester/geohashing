var geohash = require('../lib/geohash')
var Promise = require('bluebird')

describe('geohashing', function() {

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

    var subject = geohash.calculateGeohash(hexToDec);
    
    expect(subject(inputLat, inputLong, date, dow)).toEqual({lat: 37.857713, lon: -122.544544});
  });

  it('should get the opening dow', function(done) {
   var requester = function(url) {
     return Promise.resolve({
       body: JSON.stringify({query: {results: {quote: [{Open: 'foobar'}]}}})
     });
   } 
    
    var subject = geohash.dowWithRequester(requester);

    subject().then(function(data) {
      expect(data).toEqual('foobar');
      done();
    });
  });

  it('should get the current formatted date', function() {
    var DateProducer = function() {
      // Jan 1, 2016 - month is zero based
      return new Date(2016, 00, 01);
    }

    var subject = geohash.formatDate(DateProducer);

    expect(subject()).toEqual('2016-01-01');
  });

  it('should convert a hexidecimal string to a floating point number', function() {
    var subject = geohash.hexToDec;

    expect(subject('8b672cb305440f97')).toBeCloseTo(0.544544)
  })
});
