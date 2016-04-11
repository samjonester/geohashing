var moment = require('moment');
var Promise = require('bluebird');

var dow = require('./dow')
var geohashCalculator = require('./geohashCalculator')


var formatDate = DateProducer => () => moment(new DateProducer()).format('YYYY-MM-DD');

var geohash = (calculateGeohash, date, dow) => (lat, lon, callback) => {
  callback = callback || Promise.resolve;
  return dow().then(dowValue => {
    var newGeohash = calculateGeohash(lat, lon, dowValue, date());
    return callback(newGeohash);
  });
}

module.exports = {
  geohash: geohash(geohashCalculator.calculateGeohash, formatDate(Date), dow.dow),
  formatDate: formatDate,
};
