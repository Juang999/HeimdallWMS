const {Router} = require('express');
const {AuthMiddleware} = require('../middleware/kernel');
const {read: readFeature, create: createFeature} = require('../services/feature.service');
const {read: readAccess, create: createAccess} = require('../services/access.service');
const router = Router();
const {sequelize} = require('../../../models');

router.get('/', [AuthMiddleware], (req, res) => {
    readFeature()
        .then((result) => {
            res.status(200).json({
                status: true,
                message: 'Feature list',
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: err.message
            });
        });
})

router.post('/create', [AuthMiddleware], (req, res) => {
    sequelize.transaction(async t => {
        console.info(req.body)
        // let dataFeature = await createFeature({feature_name: req.body.feature_name}, t);
        // let dataAccess = req.body.accesses.map((item) => {
        //     return {
        //         feature_id: dataFeature.id,
        //         access_name: item.access_name,
        //         is_active: true
        //     }
        // });

        // await createAccess(dataAccess, t);
    })
    .then(result => {
        res.status(200)
            .json({
                status: 'success',
                message: 'ok',
                data: true,
                error: null
            })
    })
    .catch(err => {
        res.status(501)
            .json({
                status: 'error',
                message: 'Internal server error',
                data: null,
                error: err.message
            })  
    })
})

module.exports = router;