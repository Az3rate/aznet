const express = require('express');
const router = express.Router();
const AboutController = require('../controllers/aboutController');

router.get('/about', AboutController.getAboutPage);

module.exports = router; 