const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Gallery title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    enum: ['Events', 'Activities', 'Infrastructure', 'Members', 'Other'],
    default: 'Other'
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
gallerySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Gallery', gallerySchema);
