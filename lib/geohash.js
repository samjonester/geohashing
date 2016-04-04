var moment = require('moment');
var md5 = require('md5');
var R = require('ramda');
var Promise = require('bluebird');

var dow = require('./dow')


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
      return function(lat, lon) {
        return dow().then(function(dowValue) {
          return Promise.resolve(calculateGeohash(lat, lon, dowValue, date()));
        });
      }
    }
  }
}

module.exports = {
  geohash: geohashWithDateAndDow(calculateGeohash(hexToDec))(formatDate(Date))(dow.dow),
  calculateGeohash: calculateGeohash,
  formatDate: formatDate,
  hexToDec: hexToDec
};
