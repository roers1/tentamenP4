const express = require('express');
const app = express();
const config = require('./config/config');
const logger = config.logger;

//routes deffinieren voor de app
const appartmentsRoute = require('./routes/appartments');
const reservationsRoute = require('./routes/reservations');

//vastleggen welke routes er opgevraagd worden dmv de logger te gebruiker
app.all('*', (req, res, next) => {
    logger.log("Hostname: " + req.connection.remoteAddress + " route: " + req.url)
    next();
  })


//routes bepalen en doorlinken naar het juiste route bestand
app.use('/api/appartments', appartmentsRoute)
app.use('/api/appartments/:id/reservations', reservationsRoute)

app.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = (404);
    next(error);
  })

//Hier worden de errors in opgevangen, ook een database error kan hierin terecht komen
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
      error: {
        message: error.message
      }
    })
  })

  module.exports = app;