const {Router} = require('express');
const router = Router();
const {login} = require('../services/auth.service');
const bcrypt = require('bcrypt');
const {config} = require('../../../config/environment');
const jwt = require('jsonwebtoken');
const {AuthMiddleware, RefreshTokenMiddleware} = require('../middleware/kernel');
const {get} = require('express-http-context');
const {Auth} = require('../requests/Request');

router.post('/login', [Auth.LoginRequest], async (req, res) => {
    try {
        let {email, password} = req.body;

        let dataResult = await login(email);

        if (!dataResult) {
            res.status(300)
                .json({
                    status: 'failed',
                    message: 'wrong username or password',
                    data: null,
                    error: null
                })

            return;
        }

        let isValidPassword = await bcrypt.compare(password, dataResult[0].dataValues.password);

        if (isValidPassword == false) {
            res.status(300)
                .json({
                    status: 'failed',
                    message: 'wrong username or password',
                    data: null,
                    error: null
                })

            return;
        }

        let dataUser = {
            email: dataResult[0].dataValues.email,
            username: dataResult[0].dataValues.username,
            role_id: dataResult[0].role_relationship.map(({dataValues: item}) => item.role_id)
        }

        let access_token = jwt.sign(dataUser, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
        let refresh_token = jwt.sign(dataUser, config.REFRESH_TOKEN_SECRET, {expiresIn: '168h'})

        res.status(200)
            .json({
                status: 'success',
                message: 'logged in!',
                data: {
                    type: 'Bearer',
                    access_token,
                    refresh_token
                },
                error: null
            })
    } catch (error) {
        res.status(400)
            .json({
                status: 'failed',
                message: 'error',
                data: null,
                error: error.message
            })
    }
})

router.post('/refresh-token', [RefreshTokenMiddleware], async (req, res) => {
    try {
        let {email} = get('user');
        let dataResult = await login(email);

        let dataUser = {
            email: dataResult[0].dataValues.email,
            username: dataResult[0].dataValues.username,
            role_id: dataResult[0].role_relationship.map(({dataValues: item}) => item.role_id)
        }

        let access_token = jwt.sign(dataUser, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})

        res.status(200)
            .json({
                status: 'success',
                message: 'logged in!',
                data: {
                    type: 'Bearer',
                    access_token,
                },
                error: null
            })
    } catch (error) {
        res.status(400)
            .json({
                status: 'failed',
                message: 'error',
                data: null,
                error: error.message
            })
    }
})

module.exports = router;