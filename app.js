const express = require('express');
const app = express();
const config = require('./config/config');
const logger = config.logger;

//routes deffinieren voor de app
const appartmentsRoute = require('./routes/appartments');

//vastleggen welke routes er opgevraagd worden dmv de logger te gebruiker
app.all('*', (req, res, next) => {
    logger.log("Hostname: " + req.connection.remoteAddress + " route: " + req.url)
    next();
  })


  //routes bepalen en doorlinken naar het juiste route bestand
app.use('/api/appartments', appartmentsRoute)

  module.exports = app;