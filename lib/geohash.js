var http = require('http');

var dowParser = function(dowResponse) {
  return dowResponse.query.results.quote[0].Open;
}

var dowUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22%5ENDX%22%2C%22INDU%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
var dowWithRequester = function(requester) {
  return function(callback) {
    requester.get(dowUrl, function(data) {
      callback(dowParser(data))
    });
  }
}

var geohashWithDateAndDow = function(date, dow) {
  return function(lat, lon, respond) {
    dow(function(dowValue) {
      respond({lat: 37.857713, lon: -122.544543})
    })
  }
}

module.exports = {
  geohash: geohashWithDateAndDow(null, dowWithRequester(http)),
  geohashWithDateAndDow: geohashWithDateAndDow,
  dowWithRequester: dowWithRequester,
};
