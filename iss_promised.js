const request = require('request-promise-native');
const log = console.log;

const fetchMyIp = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIp = function(body) {
  const ip = JSON.parse(body).ip;
  return request('https://ipvigilante.com/' + ip);
};

const fetchISSFlyOverTimes = function(geoData) {
  const { latitude, longitude } = JSON.parse(geoData).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

const findNextIssFlyOverTimes = function() {
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then(input => JSON.parse(input).response)
};


module.exports = { findNextIssFlyOverTimes };