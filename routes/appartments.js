const express = require('express');
const router = express.Router();
const config = require('../config/config');
const logger = config.logger;
const assert = require('assert')
const Appartment = require('../models/appartment')
const checkAuth = require('../middleware/check-auth')

var database = require('../mssql_connection')

router.get('/', checkAuth,(req, res, next) => {
    logger.info('Handling GET request to /api/appartments')

    //Query welke uitgevoerd gaat worden door de database
    const query = ('SELECT * FROM Apartment ' +
        'JOIN Reservation ON [Apartment].[ApartmentId] = [Reservation].[ApartmentId] ' +
        'JOIN DBUser ON Reservation.UserId = DBUser.UserId ' +
        'WHERE [Status] = \'ACCEPTED\';')

    logger.info('Used query is:' + query);

    executeQuery(query, req, res, next)

})

router.post('/', checkAuth,(req, res, next) => {

    logger.info('Handling POST request to /api/appartments')
    logger.info('body: ' +req.body)
    try {

        assert.ok(typeof req.body.Description === "string", "Description is not a string!");
        assert.ok(typeof req.body.StreetAddress === "string", "StreetAddress is not a string!");
        assert.ok(typeof req.body.PostalCode === "string", "PostalCode is not a string!");
        assert.ok(typeof req.body.City === "string", "City is not a string!");

        const appartment = new Appartment(
            req.body.Description,
            req.body.StreetAddress,
            req.body.PostalCode,
            req.body.City,
            req.UserId
        )

        const query = ("INSERT INTO Apartment VALUES (\'" +
            appartment.Description + "\', \'" +
            appartment.StreetAddress + "\', \'" +
            appartment.PostalCode + "\', \'" +
            appartment.City + "\', " +
            appartment.UserId + ");")

        logger.info('query: ' + query)

        executeQuery(query, req, res, next)

    } catch (ex) {
        next(ex);
    }

})

router.get('/:id',checkAuth, (req, res, next) => {
    logger.info('Handling GET request to /api/appartments')

    const apartmentId = req.params.id;

    //Query welke uitgevoerd gaat worden door de database
    const query = ('SELECT * FROM Apartment ' +
        'JOIN Reservation ON [Apartment].[ApartmentId] = [Reservation].[ApartmentId] ' +
        'JOIN DBUser ON Reservation.UserId = DBUser.UserId ' +
        'WHERE Apartment.ApartmentId = ' + apartmentId + ';')

    logger.info('Used query is:' + query);

    executeQuery(query, req, res, next)
})

router.put('/:id', (req, res, next) => {

    const apartmentId = req.params.id;

    try {

        assert.ok(typeof req.body.Description === "string", "Description is not a string!");
        assert.ok(typeof req.body.StreetAddress === "string", "StreetAddress is not a string!");
        assert.ok(typeof req.body.PostalCode === "string", "PostalCode is not a string!");
        assert.ok(typeof req.body.City === "string", "City is not a string!");

        const appartment = new Appartment(
            req.body.Description,
            req.body.StreetAddress,
            req.body.PostalCode,
            req.body.City,
        )

        const query = ("UPDATE Apartment SET " +
            "Description = '" + appartment.Description + "\'," +
            "StreetAddress = '" + appartment.StreetAddress + "\'," +
            "PostalCode = '" + appartment.PostalCode + "\'," +
            "City = '" + appartment.City + "\' " +
            "WHERE ApartmentId = " + apartmentId + ";")

        logger.info('query: ' + query)

        executeQuery(query, req, res, next)

    } catch (ex) {
        next(ex);
    }

})

router.delete('/:id',checkAuth, (req, res, next) => {

    const apartmentId = req.params.id;

    const query = ("DELETE FROM Apartment " +
        "WHERE ApartmentId = " + apartmentId)

    logger.info('query: ' + query)

    executeQuery(query, req, res, next)

})

function executeQuery(query, req, res, next){

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

}

module.exports = router;