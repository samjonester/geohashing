const md5 = require('md5');

const hexToDec = hexString => 
hexString.split('')
.map(hex => parseInt(hex, 16))
.reduce((decimals, dec, i) => {
  decimals.push(dec * Math.pow(16, -(decimals.length+1)));
  return decimals;
}, [])
.reduce((sum, n) => sum + n, 0);

const calculateDecimalHashesWithHexConverter = hexConverter => seed => {
  const md5Val = md5(seed);
  return [md5Val.substring(0,16), md5Val.substring(16,32)]
  .map(hexHash => hexConverter(hexHash))
}

const joinNumbers = (int, decimal) => {
  const parsedInt  = parseInt(int);
  if (parsedInt > 0) {
    return parsedInt + decimal;
  } else {
    return parsedInt - decimal;
  }
}

const combineLatLonWithDecimals = (lat, lon) => decimals => {
  return {lat: joinNumbers(lat, decimals[0]), lon: joinNumbers(lon, decimals[1])};
};

const calculateDecimalHashes = calculateDecimalHashesWithHexConverter(hexToDec);

const calculateGeohash = (lat, lon, dowValue, dateValue) => 
combineLatLonWithDecimals(lat, lon)(calculateDecimalHashes(dowValue+'-'+dateValue))

module.exports = {
  calculateGeohash: calculateGeohash,
  hexToDec: hexToDec,
  combineLatLonWithDecimals: combineLatLonWithDecimals,
  calculateDecimalHashes: calculateDecimalHashesWithHexConverter
}
