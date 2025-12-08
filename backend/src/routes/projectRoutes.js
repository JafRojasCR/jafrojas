const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { writeLimiter } = require('../middleware/rateLimiter');

// Public routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// Protected routes with rate limiting
router.post('/', auth, writeLimiter, projectController.createProject);
router.put('/:id', auth, writeLimiter, projectController.updateProject);
router.delete('/:id', auth, writeLimiter, projectController.deleteProject);

module.exports = router;
