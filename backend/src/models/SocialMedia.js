const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['instagram', 'linkedin', 'github', 'twitter', 'facebook', 'other']
  },
  url: {
    type: String,
    required: true
  },
  displayName: {
    type: String
  },
  icon: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SocialMedia', socialMediaSchema);
