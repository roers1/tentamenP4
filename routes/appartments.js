const express = require('express');
const router = express.Router();
const config = require('../config/config');
const logger = config.logger;

var database = require('../mssql_connection')

router.get('/', (req, res, next) => {
    logger.info('Handling GET request to /api/appartments')

    //Query welke uitgevoerd gaat worden door de database
    const query = ('SELECT * FROM Apartment ' +
        'JOIN Reservation ON [Apartment].[ApartmentId] = [Reservation].[ApartmentId] ' +
        'JOIN DBUser ON Reservation.UserId = DBUser.UserId ' +
        'WHERE [Status] = \'ACCEPTED\';')

    logger.info('Used query is:' + query);

    database.executeQuery(query, (err, rows) => {
        //Als de database een error verstuurd zal de error doorgegeven worden naar de gebruiker
        if (err) {
            const error = {
                message: err,
                code: 500
            }
            next(error)
        }

        //Als er geen error is worden de rijen getoont die uit de query volgen
        if (rows) {
            res.status(200).json({
                result: rows
            })
        }
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST request naar /api/appartments'
    })
})

router.get('/:id', (req, res, next) => {
    logger.info('Handling GET request to /api/appartments')

    const apartmentId = req.params.id;

    //Query welke uitgevoerd gaat worden door de database
    const query = ('SELECT * FROM Apartment ' +
        'JOIN Reservation ON [Apartment].[ApartmentId] = [Reservation].[ApartmentId] ' +
        'JOIN DBUser ON Reservation.UserId = DBUser.UserId ' +
        'WHERE Apartment.ApartmentId = ' + apartmentId + ';')

    logger.info('Used query is:' + query);

    database.executeQuery(query, (err, rows) => {
        //Als de database een error verstuurd zal de error doorgegeven worden naar de gebruiker
        if (err) {
            const error = {
                message: err,
                code: 500
            }
            next(error)
        }

        //Als er geen error is worden de rijen getoont die uit de query volgen
        if (rows) {
            res.status(200).json({
                result: rows
            })
        }
    })
})

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'DELETE request naar /api/appartments/:id'
    })
})

module.exports = router;