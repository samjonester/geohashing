express = require('express');
app     = express();

geoHash = require('./lib/geohash');

app.get('/geohash', function(req, res, next) {
  geoHash.geohash(req.query.lat, req.query.lon).then(function(data) {
    res.json(data);
  });
});

var DEFAULT_URL = 'https://geohasher.herokuapp.com/geohash?lat=37.421542&lon=-122.085589'
var GITHUB_URL = 'https://github.com/samlawrencejones/geohashing'
app.all('*', function(req, res) {
  res.send('Please try the url <a href="'+DEFAULT_URL+'">'+DEFAULT_URL+'</a><br/><br/>Or checkout project! <a href="'+GITHUB_URL+'">'+GITHUB_URL+'</a>');
});

var port = process.env.PORT || 8000

app.listen(port, function() {
  console.log("api listening on " + port);
});

module.exports = app;
