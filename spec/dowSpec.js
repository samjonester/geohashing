var Promise = require('bluebird')

var dow = require('../lib/dow')

describe('Dow', function() {
  it('should get the opening dow', function(done) {
   var requester = function(url) {
     return Promise.resolve({
       body: JSON.stringify({query: {results: {quote: [{Open: 'foobar'}]}}})
     });
   } 
    
    var subject = dow.dowWithRequester(requester);

    subject().then(function(data) {
      expect(data).toEqual('foobar');
      done();
    });
  });
});
