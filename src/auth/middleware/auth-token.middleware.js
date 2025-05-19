const {config} = require('../../../config/environment');
const jwt = require('jsonwebtoken');
const {set} = require('express-http-context');

const AuthToken = (req, res, next) => {
    let authHeader = req.headers['authorization'];

    let token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            status: 'Unauthorized',
            message: 'Unauthorized',
            data: null,
            error: 'Unauthorized',
        });

        return
    }

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({
                status: 'Forbidden',
                message: 'Forbidden',
                data: null,
                error: 'Forbidden',
            });

            return
        }

        set('user', user);

        next();
    })
}

module.exports = AuthToken;