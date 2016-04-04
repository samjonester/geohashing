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

var joinNumbers = function(int, decimal) {
  int = parseInt(int);
  if (int > 0) {
    return int + decimal;
  } else {
    return int - decimal;
  }
}

var calculateGeohash = function(hexToDec) {
  return function(lat, lon, dowValue, dateValue) {
    var decimals =  R.compose(
      R.map(hexToDec),
      R.splitAt(16), 
      md5)(dowValue+'-'+dateValue);

    return {lat: joinNumbers(lat, decimals[0]), lon: joinNumbers(lon, decimals[1])};
  }
}

module.exports = {
  calculateGeohash: calculateGeohash(hexToDec),
  calculateGeohashWithHexConverter: calculateGeohash,
  hexToDec: hexToDec
}
