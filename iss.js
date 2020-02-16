const request = require('request');

const log = console.log;

const fetchMyIp = function(cb) {
  const ipURL = 'https://api.ipify.org?format=json';

  request(ipURL, (error, response, body) => {
    if (error) return cb(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    cb(null, ip);
  });
};

const fetchCoordsByIP = function(ip, cb) {
  const geoFetchURL = 'https://ipvigilante.com/' + ip;
  request(geoFetchURL, (error, response, body) => {
    if (error) return cb(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const coords = {
      latitude: data.data.latitude,
      longitude: data.data.longitude
    };
    cb(error, coords);
  });
};

const fetchISSFlyOverTimes = function(coordinates, cb) {
  const fetchTimesUrl = `http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`

  request(fetchTimesUrl, (error, response, body) => {
    if (error) return cb(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching times. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const flyOverTimes = data.response;

    cb(null, flyOverTimes);
  });
};

const nextISSTimesForMyLocation = function(cb) {
  fetchMyIp((error, ip) => {
    if (error) {
      return cb(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return cb(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return cb(error, null);
        }
        cb(null, flyOverTimes);
      });
    });
  });
};


//fetchCoordsByIP('66.207.199.230', x => console.log(x))
module.exports = { nextISSTimesForMyLocation };