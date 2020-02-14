const request = require('request');

const fetchMyIp = function(cb) {

  const ipURL = 'https://api.ipify.org?format=json';

  request(ipURL, (error, response, body) => {

    if (error) return cb(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    cb(error, data);
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

    const returnData = {
      latitude: data.data.latitude,
      longitude: data.data.longitude
    };
    // console.log(returnData);
    cb(error, returnData);
  });
}

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

    const returnData = data.response

    // console.log(returnData);
    cb(error, returnData);
  });

}

//fetchCoordsByIP('66.207.199.230', x => console.log(x))
module.exports = {
  fetchMyIp,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};