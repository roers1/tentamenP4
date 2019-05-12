const express = require("express");
const assert = require("assert");
const router = express.Router();
const User = require("../models/User");
const database = require("../mssql_connection");
const bcrypt = require('bcrypt');
const config = require('../config/config');
const logger = config.logger;

router.post('/', (req, res, next) => {

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

    password = bcrypt.hash(req.body.Password, 10, (err, hash) => {

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
                user.hash + "\')")


            logger.info('query: ' + query)

            executeQuery(query, req, res, next)
        }


    })



})

router.get('/', (req, res, next) => {

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
            res.status(200).json({
                result: rows
            })
        }
    })

}

module.exports = router;