const express = require('express');
const router = express.Router();
const config = require('../config/config');
const logger = config.logger;
const assert = require('assert')
const Reservation = require('../models/Reservation')
const checkAuth = require('../middleware/check-auth')

var database = require('../mssql_connection')

module.exports = {
    postReservation: function (req, res, next) {
        logger.debug('APPARTMENTID: ' + req.params.id)
        const appartmentId = req.params.id
        logger.info('Handling POST request to /api/reservations')
        logger.info('body: ' + req.body)

        try {
            assert.ok(typeof req.body.StartDate === "string", "StartDate is not a string!");
            assert.ok(typeof req.body.EndDate === "string", "EndDate is not a string!");

            const reservations = new Reservation(
                req.body.ApartmentId,
                req.body.StartDate,
                req.body.EndDate
            )

            const query = ("INSERT INTO Reservation VALUES (" +
                appartmentId + ", \'" +
                reservations.StartDate + "\', \'" +
                reservations.EndDate + "\', \'" +
                'INITIAL' + "\', " +
                req.UserId + ");")

            logger.info('query: ' + query)

            database.executeQuery(query, (err, rows) => {
                //Als de database een error verstuurd zal de error doorgegeven worden naar de gebruiker
                if (err) {
                    res.status(404).json({
                        message: 'Appartment does not exist'
                    })
                }

                //Als er geen error is worden de rijen getoont die uit de query volgen
                if (rows) {
                    res.status(200).json({
                        message: 'Reservation succesfull'
                    })
                }
            })

        } catch (ex) {
            next(ex);
        }
    },

    getReservations: function(req,res,next){
        logger.info('Handling GET request to /api/appartments/:id/reservations')

        const apartmentId = req.params.id;

        //Query welke uitgevoerd gaat worden door de database
        const query = ('SELECT * FROM Reservation WHERE ApartmentId = ' + apartmentId)

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
    },

    getReservation: function(req,res,next){
        logger.info('Handling GET request to /api/appartments/:id/reservations')

        const apartmentId = req.params.id;
        const reservationId = req.params.id;

        //Query welke uitgevoerd gaat worden door de database
        const query = ('SELECT * FROM Reservation' +
        ' WHERE ApartmentId = ' + apartmentId + 
        ' AND ReservationId = ' + reservationId)

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
    },

    putReservation:function(req,res,next){
    
    },

    deleteReservation:function(req,res,next){

    }



    
}