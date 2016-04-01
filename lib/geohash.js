var geohash = function(lat, lon, respond) {
  respond({lat: 37.857713, lon: -122.544543})
}

var geohashWithDateAndDow = function(date) {
  return function(dow) {
    return geohash;
  }
}

var dowParser = function(dowResponse) {
  return dowResponse.query.results.quote[0].Open;
}

var dowWithRequester = function(requester) {
  return function(callback) {
    requester.get('/yahoo/url/', function(data) {
      callback(dowParser(data))
    });
  }
}

module.exports = {
  geohash: geohash,
  geohashWithDateAndDow: geohashWithDateAndDow,
  dow: dowWithRequester(foobargetlibrary),
  dowWithRequester: dowWithRequester,
};
