var moment = require('moment');
var Promise = require('bluebird');

var dow = require('./dow')
var geohashCalculator = require('./geohashCalculator')


var formatDate = function(DateProducer) {
  return function() { 
    return moment(new DateProducer()).format('YYYY-MM-DD');
  }
}

var geohash = function(calculateGeohash, date, dow) {
  return function(lat, lon, callback) {
    callback = callback || Promise.resolve;
    return dow().then(function(dowValue) {
      var newGeohash = calculateGeohash(lat, lon, dowValue, date());
      return callback(newGeohash);
    });
  }
}

module.exports = {
  geohash: geohash(geohashCalculator.calculateGeohash, formatDate(Date), dow.dow),
  formatDate: formatDate,
};
