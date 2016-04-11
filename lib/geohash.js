const moment = require('moment');
const Promise = require('bluebird');

const dow = require('./dow')
const geohashCalculator = require('./geohashCalculator')


const formatDate = DateProducer => () => moment(new DateProducer()).format('YYYY-MM-DD');

const geohash = (calculateGeohash, date, dow) => (lat, lon, callback) => {
  callback = callback || Promise.resolve;
  return dow().then(dowValue => {
    const newGeohash = calculateGeohash(lat, lon, dowValue, date());
    return callback(newGeohash);
  });
}

module.exports = {
  geohash: geohash(geohashCalculator.calculateGeohash, formatDate(Date), dow.dow),
  formatDate: formatDate,
};
