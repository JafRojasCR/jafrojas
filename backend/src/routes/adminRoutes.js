const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/users', adminController.listAdmins);
router.post('/users', adminController.createAdmin);
router.put('/users/:id', adminController.updateAdmin);
router.delete('/users/:id', adminController.deleteAdmin);

module.exports = router;
