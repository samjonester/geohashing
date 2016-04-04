var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var dowParser = function(dowResponse) {
  var body = JSON.parse(dowResponse.body);
  return body.query.results.quote[0].Open;
}

var dowUrl = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22%5ENDX%22%2C%22INDU%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
var dowWithRequester = function(request) {
  return function() {
    return request(dowUrl).then(function(body) {
      return Promise.resolve(dowParser(body));
    });
  }
}

module.exports = {
  dowWithRequester: dowWithRequester,
  dow: dowWithRequester(request)
}
