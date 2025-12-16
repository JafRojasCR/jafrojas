const mongoose = require('mongoose');

const bioSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bio', bioSchema);
