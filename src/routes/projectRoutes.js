const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController');

router.get('/project/:name', ProjectController.getProjectPage);

module.exports = router; 