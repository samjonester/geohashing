const express = require('express');
const bodyParser = require('body-parser');

app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

geoHash = require('./lib/geohash');

app.get('/geohash', (req, res) => {
  geoHash.geohash(req.query.lat, req.query.lon).then(data => res.json(data));
});

app.post('/geohash', (req, res) => {
  console.log(req.body);
  geoHash.geohash(req.body.lat, req.body.lon).then(data => res.json(data));
});

const DEFAULT_URL = 'https://geohasher.herokuapp.com/geohash?lat=37.421542&lon=-122.085589'
const GITHUB_URL = 'https://github.com/samlawrencejones/geohashing'
app.all('*', (req, res) => {
  res.send('Please try the url <a href="'+DEFAULT_URL+'">'+DEFAULT_URL+'</a><br/><br/>Or checkout project! <a href="'+GITHUB_URL+'">'+GITHUB_URL+'</a>');
});

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log("api listening on " + port);
});

module.exports = app;
