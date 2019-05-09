const express = require('express');
const app = express();
const config = require('./config/config');
const logger = config.logger;


//vastleggen welke routes er opgevraagd worden dmv de logger te gebruiker
app.all('*', (req, res, next) => {
    logger.log("Hostname: " + req.connection.remoteAddress + " route: " + req.url)
    next();
  })

  module.exports = app;