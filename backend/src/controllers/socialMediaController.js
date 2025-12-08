const SocialMedia = require('../models/SocialMedia');

// Get all social media links
exports.getAllSocialMedia = async (req, res) => {
  try {
    const socialMedia = await SocialMedia.find().sort({ order: 1 });
    res.json(socialMedia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single social media link by ID
exports.getSocialMediaById = async (req, res) => {
  try {
    const socialMedia = await SocialMedia.findById(req.params.id);
    if (!socialMedia) {
      return res.status(404).json({ error: 'Social media link not found' });
    }
    res.json(socialMedia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new social media link (protected)
exports.createSocialMedia = async (req, res) => {
  try {
    const socialMedia = new SocialMedia(req.body);
    await socialMedia.save();
    res.status(201).json(socialMedia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a social media link (protected)
exports.updateSocialMedia = async (req, res) => {
  try {
    const socialMedia = await SocialMedia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!socialMedia) {
      return res.status(404).json({ error: 'Social media link not found' });
    }
    res.json(socialMedia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a social media link (protected)
exports.deleteSocialMedia = async (req, res) => {
  try {
    const socialMedia = await SocialMedia.findByIdAndDelete(req.params.id);
    if (!socialMedia) {
      return res.status(404).json({ error: 'Social media link not found' });
    }
    res.json({ message: 'Social media link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
