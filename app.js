const express = require('express');
const app = express();
const config = require('./config/config');
const bodyParser = require('body-parser');
const logger = config.logger;

const routes = require('./routes/routes')

//vastleggen welke routes er opgevraagd worden dmv de logger te gebruiker
app.all('*', (req, res, next) => {
    logger.log("Hostname: " + req.connection.remoteAddress + " route: " + req.url)
    next();
  })

  app.use(bodyParser.urlencoded({
    extended: true
  }))
  
  app.use(bodyParser.json());
  
//routes bepalen en doorlinken naar het juiste route bestand
app.use('/api', routes)

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