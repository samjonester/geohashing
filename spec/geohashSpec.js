var geohash = require('../lib/geohash')

describe('geohashing', function() {

  it('should create a new set of coordinates from lat, long, date, dow', function() {
    var date = function() {return '2005-05-26'};
    var dow = function(callback) { callback('10458.68')};

    var subject = geohash.geohashWithDateAndDow(date, dow);

    subject(37.421542, -122.085589, function(result) {
      expect(result).toEqual({lat: 37.857713, lon: -122.544543});
    });
  });


  it('should get the opening dow', function() {
    var requester = {
      get: function(url, callback) {
        callback({query: {results: {quote: [{Open: 'foobar'}]}}});
      }
    }
    
    var subject = geohash.dowWithRequester(requester);

    subject(function(dow) {
      expect(dow).toEqual('foobar');
    });
  });

  it('should get the current formatted date', function() {
    var DateProducer = function() {
      // Jan 1, 2016 - month is zero based
      return new Date(2016, 00, 01);
    }

    var subject = geohash.formatDate;

    expect(subject(DateProducer)).toEqual('2016-01-01');
  });
});
