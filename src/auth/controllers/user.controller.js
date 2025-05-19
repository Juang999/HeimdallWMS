const {Router} = require('express');
const {AuthMiddleware} = require('../middleware/kernel');
const {getProfile} = require('../services/user.service');
const router = Router();
const {get} = require('express-http-context');

router.get('/profile', [AuthMiddleware], (req, res) => {
    let {email} = get('user');

    getProfile(email)
    .then(result => {
        res.status(200)
            .json({
                status: 'success',
                message: 'User profile retrieved successfully',
                data: result,
                error: null
            })
    })
    .catch(err => {
        res.status(500)
            .json({
                status: 'error',
                message: 'Failed to retrieve user profile',
                data: null,
                error: err.message
            })
    })
});

module.exports = router;