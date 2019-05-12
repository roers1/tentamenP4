const jwt = require('jsonwebtoken')
const config = require('../config/config');
const logger = config.logger;

module.exports = (req, res, next) => {

    const authorizationToken = req.headers.authorization;

    if (!authorizationToken) {
        logger.warn('Validate token failed: no token available')

        return res.status(401).json({
            message: 'no token available',
        })
    }

    jwt.verify(authorizationToken, 'secret', (err, payload) => {
        if (err) {
            logger.warn('Validate token failed: authorization failed')
            return res.status(401).json({
                message: 'auth failed'
            })
        }

        logger.debug(payload)
        if(payload){
            logger.debug('payload werkt')
        }

        if (payload && payload.userId) {
            logger.debug('token is valid', payload)

            req.userId = payload.userId;
            logger.debug(req.userId)
            next()
        } else {
            logger.warn('Validate token failed: userId is missing')

            return res.status(401).json({
                message: 'UserId is not available'
            })
        }
    })
};