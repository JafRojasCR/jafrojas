const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const auth = require('../middleware/auth');

router.get('/', certificateController.getCertificates);
router.get('/:id', certificateController.getCertificate);
router.post('/', auth, certificateController.createCertificate);
router.put('/:id', auth, certificateController.updateCertificate);
router.delete('/:id', auth, certificateController.deleteCertificate);

module.exports = router;
