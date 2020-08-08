const express = require('express');
const router = express.Router();
const faceCtrl = require('../controllers/face');

router.post('/', faceCtrl.create);

module.exports = router;