const Promise = require('bluebird');
const moment = require('moment');
const request = Promise.promisify(require('request'));

const cacheable = require('./cacheable');

const dowParser = dowResponse => {
  return Promise.resolve(dowResponse.body)
  .then(JSON.parse)
  .then(body => {
    return body.query.results.quote[0].Open;
  });
}

const dowUrl = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22%5ENDX%22%2C%22INDU%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
const dowWithRequester = request => {
  return cacheable.cacheable(() => request(dowUrl).then(dowParser), 
                             moment(new Date()).format('YYY-MM-DD-dow'));
}

module.exports = {
  dowWithRequester: dowWithRequester,
  dow: dowWithRequester(request)
}
