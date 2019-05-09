const express = require('express');
const router = express.Router();
const config = require('../config/config');
const logger = config.logger;

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'GET request naar /api/appartments'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message: 'POST request naar /api/appartments'
    })
})

router.get('/:id',(req,res,next)=>{
    res.status(200).json({
        message: 'GET request naar /api/appartments/:id'
    })
})

router.put('/:id',(req,res,next)=>{
    res.status(200).json({
        message: 'PUT request naar /api/appartments/:id'
    })
})

router.delete('/:id',(req,res,next)=>{
    res.status(200).json({
        message: 'DELETE request naar /api/appartments/:id'
    })
})

module.exports = router;