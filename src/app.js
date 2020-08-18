// Modules & Dependencies
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

// Initialize App
const app = express(); 
const port = 3000;

// Define paths for Express configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs'); // allows you to set a value for given express setting - key, value
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup statis directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Michael Chang'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Michael Chang'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpText: 'Help Me!',
    name: 'Michael Chang'
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error });
    } 
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        address: address.charAt(0).toUpperCase() + address.slice(1),
        location: location
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search input'
    });
  }

  res.send({
    products: []
  });
});

app.get('/help/*', (req,res) => {
  res.render('404',{
    title: '404',
    name: 'Michael Chang',
    errorMessage: 'Help article not found.'
  });
});

// Match anything that hasn't been matched before
app.get('*', (req, res) => {
  res.render('404',{
    title: '404',
    name: 'Michael Chang',
    errorMessage: 'Page not found.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});