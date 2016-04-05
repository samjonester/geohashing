var md5 = require('md5');

var hexToDec = function(hexString) {
  return hexString.split('')
    .map(function(hex) { return parseInt(hex, 16) })
    .reduce(function(acc, dec, i) {
      acc.push(dec * Math.pow(16, -(acc.length+1)));
      return acc;
    }, []).reduce(function(acc, n) {
      return acc + n;
    }, 0);
}

var calculateDecimalHashesWithHexConverter = function(hexConverter) {
  return function(seed) {
    var md5Val = md5(seed);
    return [md5Val.substring(0,16), md5Val.substring(16,32)].map(function(hexHash) {
      return hexConverter(hexHash)
    });
  }
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
  return function(decimals) {
    return {lat: joinNumbers(lat, decimals[0]), lon: joinNumbers(lon, decimals[1])};
  }
}

var calculateDecimalHashes = calculateDecimalHashesWithHexConverter(hexToDec);
var calculateGeohash = function(lat, lon, dowValue, dateValue) {
  return combineLatLonWithDecimals(lat, lon)(calculateDecimalHashes(dowValue+'-'+dateValue))
}

module.exports = {
  calculateGeohash: calculateGeohash,
  hexToDec: hexToDec,
  combineLatLonWithDecimals: combineLatLonWithDecimals,
  calculateDecimalHashes: calculateDecimalHashesWithHexConverter
}
