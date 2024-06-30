// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createProject', authMiddleware.isLoggedIn, projectController.createProject);
router.get('/getProjects', authMiddleware.isLoggedIn, projectController.getAllProjectsForUser);
router.post('/addAngebotToProject/:projectId/:angebotId', authMiddleware.isLoggedIn, projectController.addAngebotToProject);
router.post('/addRechnungToProject/:projectId/:rechnungId', authMiddleware.isLoggedIn, projectController.addRechnungToProject);
router.get('/:id', projectController.getProjectById);
module.exports = router;
