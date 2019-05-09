const express = require('express');
const router = express.Router();
const config = require('../config/config');
const logger = config.logger;

router.post('/api/appartments/:id/reservations')

router.get('/api/appartments/:id/reservations')

router.get('/api/appartments/:id/reservations/:id')

router.put('/api/appartments/:id/reservations/:id')

router.delete('/api/appartments/:id/reservations/:id')