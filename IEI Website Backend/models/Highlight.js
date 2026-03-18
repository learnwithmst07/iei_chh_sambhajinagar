const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Highlight title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  images: [{
    type: String,
    required: true
  }],
  fullContent: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
highlightSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Highlight', highlightSchema);
