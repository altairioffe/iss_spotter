const { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

let ipAddress;
let coordinates;

fetchMyIp((error, ip) => {
  if (error) {
    return console.log('ERROR WAHT!!: ', error);
  }
  //console.log(ip.ip)
  ipAddress = ip.ip;

  fetchCoordsByIP(ipAddress, (error, data) => {

    if (error) {
      return console.log('ERROR WAHT!!: ', error);
    }
    coordinates = data;

    fetchISSFlyOverTimes(coordinates, (error, data) => {

      if (error) {
        return console.log('ERROR WAHT!!: ', error);
      }
      console.log(data);
    });
  });
});


