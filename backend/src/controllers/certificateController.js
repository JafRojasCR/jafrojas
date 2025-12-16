const Certificate = require('../models/Certificate');

exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1, issuedAt: -1, createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCertificate = async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
