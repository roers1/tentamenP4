const express = require('express');
const router = express.Router();
const config = require('../config/config');
const logger = config.logger;
const assert = require('assert')
const Appartment = require('../models/appartment')

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
    try {

        assert.ok(typeof req.body.Description === "string", "Description is not a string!");
        assert.ok(typeof req.body.StreetAddress === "string", "StreetAddress is not a string!");
        assert.ok(typeof req.body.PostalCode === "string", "PostalCode is not a string!");
        assert.ok(typeof req.body.City === "string", "City is not a string!");
        assert.ok(typeof req.body.UserId === "number", "UserId is not a number!");

        const appartment = new Appartment(
            req.body.Description,
            req.body.StreetAddress,
            req.body.PostalCode,
            req.body.City,
            req.body.UserId
        )

        const query = ("INSERT INTO Apartment VALUES (\'" +
            appartment.Description + "\', \'" +
            appartment.StreetAddress + "\', \'" +
            appartment.PostalCode + "\', \'" +
            appartment.City + "\', " +
            appartment.UserId + ");")

        logger.info('query: ' + query)

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

    } catch (ex) {
        next(ex);
    }

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