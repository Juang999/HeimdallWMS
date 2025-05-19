const { Router } = require('express');
const { Role } = require('../requests/Request')
const { AuthMiddleware } = require('../middleware/kernel');
const { createRole } = require('../services/role.service');
const router = Router();
const { sequelize } = require('./../../../models')

router.post('/create', [AuthMiddleware, Role.CreateRoleRequest], (req, res) => {
    let attributes = req.body.features.map(items => {
        return {
            feature_id: items.feature_id,
            role_subfeatures: items.sub_features.map(items => {
                return {
                    sub_feature_id: items.sub_feature_id,
                    role_accesses: items.accesses.map(items => {
                        return {
                            access_id: items.access_id
                        }
                    })
                }
            })
        }
    });

    sequelize.transaction(async t => {
        let result = await createRole(req.body.role_name, attributes, t);

        return {
            responseCode: 200,
            json: {
                status: 'success',
                message: 'role created!',
                data: result,
                error: null
            }
        };
    })
    .then(result => {
        res.status(result.responseCode)
            .json(result.json);
    })
    .catch(err => {
        res.status(500)
            .json({
                status: 'failed',
                message: 'error',
                data: null,
                error: err.message
            });
    });
});

module.exports = router;