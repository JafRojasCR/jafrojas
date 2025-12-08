const express = require('express');
const router = express.Router();
const socialMediaController = require('../controllers/socialMediaController');
const auth = require('../middleware/auth');
const { writeLimiter } = require('../middleware/rateLimiter');

// Public routes
router.get('/', socialMediaController.getAllSocialMedia);
router.get('/:id', socialMediaController.getSocialMediaById);

// Protected routes with rate limiting
router.post('/', auth, writeLimiter, socialMediaController.createSocialMedia);
router.put('/:id', auth, writeLimiter, socialMediaController.updateSocialMedia);
router.delete('/:id', auth, writeLimiter, socialMediaController.deleteSocialMedia);

module.exports = router;
