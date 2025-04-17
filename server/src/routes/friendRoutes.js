const express = require('express');
const router = express.Router();
const { create, getByUser } = require('../controllers/friendController'); 

router.post('/create', create);
router.get('/user/:username', getByUser);

module.exports = router;