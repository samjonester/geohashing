const Promise = require('bluebird')

const dow = require('../lib/dow')

describe('Dow', () => {
  it('should get the opening dow', done => {
    const requester = url => Promise.resolve({
      body: JSON.stringify({query: {results: {quote: [{Open: 'foobar'}]}}})
    });

    const subject = dow.dowWithRequester(requester);

    subject().then(data => {
      expect(data).toEqual('foobar');
      done();
    });
  });
});
