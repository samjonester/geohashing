var Promise = require('bluebird');
var moment = require('moment');
var request = Promise.promisify(require('request'));

var cacheable = require('./cacheable');

var dowParser = dowResponse => {
  return Promise.resolve(dowResponse.body)
  .then(JSON.parse)
  .then(body => {
    return body.query.results.quote[0].Open;
  });
}

var dowUrl = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22%5ENDX%22%2C%22INDU%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
var dowWithRequester = request => {
  return cacheable.cacheable(() => request(dowUrl).then(dowParser), 
                             moment(new Date()).format('YYY-MM-DD-dow'));
}

module.exports = {
  dowWithRequester: dowWithRequester,
  dow: dowWithRequester(request)
}
