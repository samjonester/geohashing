var Promise = require('bluebird')

var dow = require('../lib/dow')

describe('Dow', () => {
  it('should get the opening dow', done => {
    var requester = url => Promise.resolve({
      body: JSON.stringify({query: {results: {quote: [{Open: 'foobar'}]}}})
    });

    var subject = dow.dowWithRequester(requester);

    subject().then(data => {
      expect(data).toEqual('foobar');
      done();
    });
  });
});
