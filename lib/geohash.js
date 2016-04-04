var request = require('request');
var moment = require('moment');
var md5 = require('md5');
var R = require('ramda');
var Promise = require('bluebird');
Promise.promisifyAll(request);

var dowParser = function(dowResponse) {
  dowResponse = JSON.parse(dowResponse);
  return dowResponse.query.results.quote[0].Open;
}

var dowUrl = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22%5ENDX%22%2C%22INDU%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
var dowWithRequester = function(request) {
  return function() {
    return request(dowUrl).then(function(body) {
      return Promise.resolve(dowParser(body));
    });
  }
}

var formatDate = function(DateProducer) {
  return function() { 
    return moment(new DateProducer()).format('YYYY-MM-DD');
  }
}

var hexToDec = R.compose(
  R.sum,
  R.reduce(function(acc, dec){
    acc.push(dec * Math.pow(16, -(acc.length+1)));
    return acc;
  }, []),
  R.map(function(hex) { return parseInt(hex, 16); }),
  R.split('')
);

var joinNumbers = function(int, decimal) {
  int = parseInt(int);
  if (int > 0) {
    return int + decimal;
  } else {
    return int - decimal;
  }
}

var calculateGeohash = function(hexToDec) {
  return function(lat, lon, dowValue, dateValue) {
    var decimals =  R.compose(
      R.map(hexToDec),
      R.splitAt(16), 
      md5)(dowValue+'-'+dateValue);

    return {lat: joinNumbers(lat, decimals[0]), lon: joinNumbers(lon, decimals[1])};
  }
}

var geohashWithDateAndDow = function(calculateGeohash) {
  return function(date) {
    return function(dow) {
      return function(lat, lon, respond) {
        dow(function(dowValue) {
          respond(calculateGeohash(lat, lon, dowValue, date()));
        });
      }
    }
  }
}

module.exports = {
  geohash: geohashWithDateAndDow(calculateGeohash(hexToDec))(formatDate(Date))(dowWithRequester(request)),
  calculateGeohash: calculateGeohash,
  dowWithRequester: dowWithRequester,
  formatDate: formatDate,
  hexToDec: hexToDec
};
