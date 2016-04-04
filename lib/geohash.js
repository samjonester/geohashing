var moment = require('moment');
var Promise = require('bluebird');

var dow = require('./dow')
var geohashCalculator = require('./geohashCalculator')


var formatDate = function(DateProducer) {
  return function() { 
    return moment(new DateProducer()).format('YYYY-MM-DD');
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
  geohash: geohashWithDateAndDow(geohashCalculator.calculateGeohash)(formatDate(Date))(dow.dow),
  formatDate: formatDate,
};
