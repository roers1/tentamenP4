const express = require('express')
const router = express.Router()
const appartments = require('../controllers/appartments')
const reservations = require('../controllers/reservations')
const AuthController = require('../controllers/authentication')
const checkAuth = require('../middleware/check-auth')


// Lijst van movies
router.post('/register', AuthController.register)
router.post('/login',AuthController.login)
router.delete('/:userId', AuthController.deleteUser)
router.post('/appartments', checkAuth, appartments.postAppartment)
router.post('/appartments', checkAuth, appartments.postAppartment)
router.get('/appartments', checkAuth, appartments.getAppartments)
router.get('/appartments/:id', checkAuth, appartments.postAppartment)
router.put('/appartments/:id', checkAuth, appartments.putAppartment)
router.delete('/appartments/:id', checkAuth, appartments.deleteAppartment)
router.post('/appartments/:id/reservations', checkAuth, reservations.postReservation)
router.get('/appartments/:id/reservations', checkAuth, reservations.getReservations)
router.get('/appartments/:id/reservations:id', checkAuth, )
router.put('/appartments/:id/reservations:id', checkAuth, )
router.delete('/appartments/:id/reservations:id', checkAuth, )

module.exports = router
