const { Router } = require('express');
const { Role } = require('../requests/Request')
const { AuthMiddleware } = require('../middleware/kernel');
const { createRole } = require('../services/role.service');
const router = Router();

router.post('/create', [AuthMiddleware, Role.CreateRoleRequest], (req, res) => {
    res.status(200)
        .json({
            status: 'success',
            message: 'created!',
            data: 'hello world',
            error: null
        });
});

module.exports = router;