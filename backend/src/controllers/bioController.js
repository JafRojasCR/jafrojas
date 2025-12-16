const Bio = require('../models/Bio');

exports.getBio = async (req, res) => {
  try {
    const bio = await Bio.findOne().sort({ updatedAt: -1 });
    if (!bio) {
      return res.json(null);
    }
    res.json(bio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.upsertBio = async (req, res) => {
  try {
    const { content, imageUrl } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Bio content is required.' });
    }

    const update = { content, imageUrl };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };

    const bio = await Bio.findOneAndUpdate({}, update, options);

    res.json({
      message: 'Bio saved successfully',
      bio
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
