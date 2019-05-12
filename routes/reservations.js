const express = require('express');
const router = express.Router();
const config = require('../config/config');
const logger = config.logger;
const checkAuth = require('../middleware/check-auth')

router.post('/',checkAuth,(req,res,next)=>{
    res.status(200).json({
        message: 'POST request naar /api/appartments/:id/reservations'
    })
})

router.get('/',checkAuth,(req,res,next)=>{
    res.status(200).json({
        message: 'GET request naar /api/appartments/:id/reservations'
    })
})

router.get('/:id',checkAuth,(req,res,next)=>{
    res.status(200).json({
        message: 'GET request naar /api/appartments/:id/reservations:id'
    })
})

router.put('/:id',checkAuth,(req,res,next)=>{
    res.status(200).json({
        message: 'PUT request naar /api/appartments/:id/reservations:id'
    })
})

router.delete('/:id',checkAuth,(req,res,next)=>{
    res.status(200).json({
        message: 'DELETE request naar /api/appartments/:id/reservations:id'
    })
})

module.exports = router;