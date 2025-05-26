const { Router } = require('express');
const { getSizeGroup } = require('../controllers/master.controller');
const router = Router();

router.get('/size-group', getSizeGroup);

module.exports = router;