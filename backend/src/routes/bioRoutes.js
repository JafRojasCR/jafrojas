const express = require('express');
const router = express.Router();
const bioController = require('../controllers/bioController');
const auth = require('../middleware/auth');

router.get('/', bioController.getBio);
router.put('/', auth, bioController.upsertBio);

module.exports = router;
