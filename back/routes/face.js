const express = require('express');
const router = express.Router();
const faceCtrl = require('../controllers/face');

router.post('/', faceCtrl.create);

router.get('/', faceCtrl.read);

module.exports = router;