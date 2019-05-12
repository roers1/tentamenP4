const express = require("express");
const assert = require("assert");
const router = express.Router();
const User = require("../models/User");
const database = require("../mssql_connection");
const bcrypt = require('bcrypt');
const config = require('../config/config');
const logger = config.logger;

router.post('/register', (req, res, next) => {

    logger.info('Handling POST request to /api/register')

    assert.ok(typeof req.body.FirstName === "string", "FirstName is not a string!");
    assert.ok(typeof req.body.LastName === "string", "LastName is not a string!");
    assert.ok(typeof req.body.StreetAddress === "string", "StreetAddress is not a string!");
    assert.ok(typeof req.body.PostalCode === "string", "PostalCode is not a string!");
    assert.ok(typeof req.body.City === "string", "City is not a string!");
    assert.ok(typeof req.body.DateOfBirth === "string", "DateOfBirth is not a string!");
    assert.ok(typeof req.body.PhoneNumber === "number", "PhoneNumber is not a number!");
    assert.ok(typeof req.body.EmailAddress === "string", "EmailAddress is not a string!");
    assert.ok(typeof req.body.Password === "string", "Password is not a string!");

    bcrypt.hash(req.body.Password, 10, (err, hash) => {

        console.log(hash)
        if (err) {
            return res.json(500).json({
                error: err
            });
        } else {

            user = new User(

                req.body.FirstName,
                req.body.LastName,
                req.body.StreetAddress,
                req.body.PostalCode,
                req.body.City,
                req.body.DateOfBirth,
                req.body.PhoneNumber,
                req.body.EmailAddress,
                hash

            )

            const query = ("INSERT INTO DBUser VALUES (\'" +
                user.FirstName + "\' , \'" +
                user.LastName + "\' , \'" +
                user.StreetAddress + "\' , \'" +
                user.PostalCode + "\' , \'" +
                user.City + "\' , \'" +
                user.DateOfBirth + "\' , " +
                user.PhoneNumber + " , \'" +
                user.EmailAddress + "\', +\'" +
                user.Password + "\')")


            logger.info('query: ' + query)

            executeQuery(query, req, res, next)
        }


    })



})

router.post('/login', (req, res, next) => {
    logger.info('Handling POST LOGIN request to /api/auth')

    assert.ok(typeof req.body.EmailAddress === "string", "EmailAddress is not a string!");

    const EmailAddress = req.body.EmailAddress;

    //Query welke uitgevoerd gaat worden door de database
    const query = ('SELECT * FROM DBUser ' +
        'WHERE EmailAddress = \'' + EmailAddress + '\';')

    logger.info('Used query is:' + query);

    database.executeQuery(query, (err, rows) =>{

        //Als de database een error verstuurd zal de error doorgegeven worden naar de gebruiker
        if (err) {
            const error = {
                message: err,
                code: 500
            }
            next(error)
        }

        if (rows<1){
            return res.status(401).json({
                message: 'Login failed'
            })
        }

        bcrypt.compare(req.body.Password, rows.recordset[0].Password, (err, result)=>{
            if (err){
                return res.status(401).json({
                    message: 'U heeft geen consent om deze corpus te benaderen en marcheert daardoor averechts tegen de autorisatie en stellingname van de applicatie in',
                })
            }
            if(result){
                return res.status(200).json({
                    message: 'Login succesfull'
                })
            }
            
            return res.status(401).json({
                message: 'U heeft geen consent om deze corpus te benaderen en marcheert daardoor averechts tegen de autorisatie en stellingname van de applicatie in'
            })
        })
    })
})

router.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId;

    const query = ("DELETE FROM DBUser " +
        "WHERE userId = " + userId)

    logger.info('query: ' + query)

    executeQuery(query, req, res, next)
})

function executeQuery(query, req, res, next) {

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
            res.status(201).json({
                message: rows 
            })
        }
    })

}

module.exports = router;