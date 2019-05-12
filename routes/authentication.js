const express = require("express");
const assert = require("assert");
const router = express.Router();
const User = require("../models/User");
const db = require("../mssql_connection");
const bcrypt = require("bcryptjs");

router.post('/', (req, res, next) => {

    assert.ok(typeof req.body.FirstName === "string", "FirstName is not a string!");
    assert.ok(typeof req.body.LastName === "string", "LastName is not a string!");
    assert.ok(typeof req.body.StreetAddress === "string", "StreetAddress is not a string!");
    assert.ok(typeof req.body.PostalCode === "string", "PostalCode is not a string!");
    assert.ok(typeof req.body.City === "number", "City is not a number!");
    assert.ok(typeof req.body.DateOfBirth === "string", "DateOfBirth is not a string!");
    assert.ok(typeof req.body.PhoneNumber === "number", "PhoneNumber is not a number!");
    assert.ok(typeof req.body.EmailAddress === "string", "EmailAddress is not a string!");
    assert.ok(typeof req.body.Password === "string", "Password is not a string!");



    const user = new User(

         req.body.FirstName,
            req.body.LastName,
            req.body.StreetAddress,
            req.body.PostalCode,
            req.body.City, 
            req.body.DateOfBirth,
            req.body.PhoneNumber,
            req.body.EmailAddress,
            req.body.Password 
    )
        
})

router.get('/', (req,res,next)=>{

})
