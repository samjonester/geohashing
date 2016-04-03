express = require('express');
app     = express();

geoHash = require('./lib/geohash');

app.get('/geohash', function(req, res, next) {
  geoHash.geohash(req.query.lat, req.query.lon, function(data) {
    res.json(data);
  });
});

console.log("api listening on 8000");

app.listen(8000);

module.exports = app;
