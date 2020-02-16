const { findNextIssFlyOverTimes } = require('./iss_promised');

findNextIssFlyOverTimes()
  .then(passTimes => console.log(passTimes))
  .catch(error => console.log("UH OH:", error.message))