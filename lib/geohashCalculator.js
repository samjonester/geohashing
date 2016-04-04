var md5 = require('md5');
var R = require('ramda');

var hexToDec = R.compose(
  R.sum,
  R.reduce(function(acc, dec){
    acc.push(dec * Math.pow(16, -(acc.length+1)));
    return acc;
  }, []),
  R.map(function(hex) { return parseInt(hex, 16); }),
  R.split('')
);

var calculateDecimalHashes = function(hexConverter) {
  return R.compose(
    R.map(hexConverter),
    R.splitAt(16), 
    md5
  );
}

var joinNumbers = function(int, decimal) {
  var parsedInt  = parseInt(int);
  if (parsedInt > 0) {
    return parsedInt + decimal;
  } else {
    return parsedInt - decimal;
  }
}

var combineLatLonWithDecimals = function(lat, lon) {
  return R.compose(
    R.zipObj(['lat', 'lon']),
    R.map(function(latDec) {return joinNumbers(latDec[0], latDec[1])}),
    R.zip([lat, lon])
  );
}

var calculateGeohash = function(lat, lon, dowValue, dateValue) {
  var calculation = R.compose(combineLatLonWithDecimals(lat, lon), calculateDecimalHashes(hexToDec))
  return calculation(dowValue+'-'+dateValue);
}

module.exports = {
  calculateGeohash: calculateGeohash,
  hexToDec: hexToDec,
  combineLatLonWithDecimals: combineLatLonWithDecimals,
  calculateDecimalHashes: calculateDecimalHashes
}
