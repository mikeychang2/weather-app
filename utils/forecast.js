const request = require('request');

//

// request({ url, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to weather service');
//   } else if (response.body.error) {
//     console.log('Unable to find location');
//   } else {
//     const data = response.body.current;
//     console.log(`It is ${data.weather_descriptions[0].toLowerCase()}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`);
//   } 
// });

// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=199d3bb0f0f1bebd3b6aa26b64514a49&query=${latitude},${longitude}&units=f`

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Error: Unable to connect to weather service.');
    } else if (body.error) {
      callback('Error: Unable to find location.');
    } else {
      const data = body.current;
      callback(undefined, `It is ${data.weather_descriptions[0].toLowerCase()}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`);
    }
  });
}

module.exports = forecast;