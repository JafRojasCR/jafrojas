const express = require('express');
const router = express.Router();
const socialMediaController = require('../controllers/socialMediaController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', socialMediaController.getAllSocialMedia);
router.get('/:id', socialMediaController.getSocialMediaById);

// Protected routes
router.post('/', auth, socialMediaController.createSocialMedia);
router.put('/:id', auth, socialMediaController.updateSocialMedia);
router.delete('/:id', auth, socialMediaController.deleteSocialMedia);

module.exports = router;
