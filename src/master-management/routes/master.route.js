const { Router } = require('express');
const { getSizeGroup, getGender } = require('../controllers/master.controller');
const router = Router();

router.get('/size-group', getSizeGroup);
router.get('/gender', getGender);

module.exports = router;