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
    const query = ('SELECT	[Apartment].[ApartmentId]' +
		',[Apartment].[Description]'+
		',[Apartment].[PostalCode]'+
		',[Apartment].[StreetAddress]'+
		',[DBUser].[UserId] AS OwnerId'+
		',[DBUser].[FirstName] AS OwnerFirstName'+
		',[DBUser].[LastName] AS OwnerLastName'+
		',[DBUser].[StreetAddress] AS OwnerStreetAddress'+
		',[DBUser].[PostalCode] AS OwnerPostalCode'+
		',[DBUser].[City] AS OwnerCity'+
		',[DBUser].[DateOfBirth] AS OwnerDateOfBirth'+
		',[DBUser].[PhoneNumber] AS OwnerPhoneNumber'+
		',[DBUser].[EmailAddress] AS OwnerEmailAddress'+
		',[Reservation].[ReservationId]'+
		',[Reservation].[StartDate] AS ReservationStartDate'+
		',[Reservation].[EndDate] AS ReservationEndDate'+
		',[Reservation].[Status] AS ReservationStatus'+
		',[Reservation].[UserId] AS ReservationUserId '+
'FROM Apartment JOIN Reservation ON [Apartment].[ApartmentId] = [Reservation].[ApartmentId] JOIN DBUser ON Reservation.UserId = DBUser.UserId WHERE [Status] = \'ACCEPTED\'')

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

router.get('/:id',checkAuth, (req, res, next) => {
    logger.info('Handling GET request to /api/appartments')

    const apartmentId = req.params.id;

    //Query welke uitgevoerd gaat worden door de database
    const query = ('SELECT	[Apartment].[ApartmentId]' +
		',[Apartment].[Description]'+
		',[Apartment].[PostalCode]'+
		',[Apartment].[StreetAddress]'+
		',[DBUser].[UserId] AS OwnerId'+
		',[DBUser].[FirstName] AS OwnerFirstName'+
		',[DBUser].[LastName] AS OwnerLastName'+
		',[DBUser].[StreetAddress] AS OwnerStreetAddress'+
		',[DBUser].[PostalCode] AS OwnerPostalCode'+
		',[DBUser].[City] AS OwnerCity'+
		',[DBUser].[DateOfBirth] AS OwnerDateOfBirth'+
		',[DBUser].[PhoneNumber] AS OwnerPhoneNumber'+
		',[DBUser].[EmailAddress] AS OwnerEmailAddress'+
		',[Reservation].[ReservationId]'+
		',[Reservation].[StartDate] AS ReservationStartDate'+
		',[Reservation].[EndDate] AS ReservationEndDate'+
		',[Reservation].[Status] AS ReservationStatus'+
		',[Reservation].[UserId] AS ReservationUserId '+
        'FROM Apartment '+
        'JOIN Reservation ON [Apartment].[ApartmentId] = [Reservation].[ApartmentId] '+
        'JOIN DBUser ON Reservation.UserId = DBUser.UserId '+
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

router.put('/:id',checkAuth,  (req, res, next) => {
    logger.info('Handling PUT request to /api/appartments/:id')

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
            "WHERE ApartmentId = " + apartmentId + 
            " AND UserId = " + req.UserId +";")

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
                if (rows.rowsAffected < 1){
                    res.status(401).json({
                        message: 'You are not the owner of this appartment'
                    })
                } else{
                    res.status(200).json({
                    message: 'Your appartment has been updated!'
                }) 
                }
               
            }
        })

    } catch (ex) {
        next(ex);
    }

})

router.delete('/:id',checkAuth, (req, res, next) => {
    logger.info('Handling DELETE request to /api/appartments/:id')

    const apartmentId = req.params.id;

    const query = ("DELETE FROM Apartment " +
    "WHERE ApartmentId = " + apartmentId + 
    " AND UserId = " + req.UserId +";")

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
            if (rows.rowsAffected < 1){
                res.status(401).json({
                    message: 'You are not the owner of this appartment'
                })
            } else{
                res.status(200).json({
                message: 'Your appartment has been deleted!'
            }) 
            }
           
        }
    })

})

module.exports = router;