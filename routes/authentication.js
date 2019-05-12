const express = require("express");
const assert = require("assert");
const router = express.Router();
const User = require("../models/User");
const db = require("../mssql_connection");
const bcrypt = require("bcryptjs");

router.post('/', (req, res, next) => {



    const user = new User
})

router.get('/', (req,res,next)=>{
    
})
