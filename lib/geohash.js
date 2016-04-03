var request = require('request');
var moment = require('moment');

var dowParser = function(dowResponse) {
  dowResponse = JSON.parse(dowResponse);
  return dowResponse.query.results.quote[0].Open;
}

var dowUrl = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22%5ENDX%22%2C%22INDU%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
var dowWithRequester = function(request) {
  return function(callback) {
    request(dowUrl, function(error, response, body) {
      callback(dowParser(body))
    });
  }
}

var formatDate = function(DateProducer) {
  return function() { 
    return moment(new DateProducer()).format('YYYY-MM-DD');
  }
}

var geohashWithDateAndDow = function(date, dow) {
  return function(lat, lon, respond) {
    dow(function(dowValue) {
      var dateValue = date();
      respond({lat: 37.857713, lon: -122.544543})
    })
  }
}

module.exports = {
  geohash: geohashWithDateAndDow(formatDate(Date), dowWithRequester(request)),
  geohashWithDateAndDow: geohashWithDateAndDow,
  dowWithRequester: dowWithRequester,
  formatDate: formatDate
};
