const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
