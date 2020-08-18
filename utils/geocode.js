const request = require('request');

const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibWlrZXljaGFuZzIiLCJhIjoiY2tkZ2h0NGtwMW51bjJ3bXQ5MmZpeDNxMyJ9.fwVEXtRmzdO5OXGVld3ZlA&limit=1`;

  request({ url: url, json: true}, (error, response) => {
    if (error) {
      callback('Error: Unable to connect to location service');
    } else if (response.body.features.length === 0) {
      callback('Error: Unable to find location. Try another search.');
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
}

module.exports = geocode;