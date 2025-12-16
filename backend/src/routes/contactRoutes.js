const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');

router.get('/', contactController.getContacts);
router.post('/', auth, contactController.createContact);
router.put('/:id', auth, contactController.updateContact);
router.delete('/:id', auth, contactController.deleteContact);

module.exports = router;
