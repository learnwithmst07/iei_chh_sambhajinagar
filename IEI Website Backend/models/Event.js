const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  date: {
    type: String,
    required: [true, 'Event date is required']
  },
  time: {
    type: String,
    required: [true, 'Event time is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required']
  },
  attendees: {
    type: String,
    default: 'TBA'
  },
  category: {
    type: String,
    required: [true, 'Event category is required'],
    enum: ['Conference', 'Seminar', 'Workshop', 'Networking', 'Ceremony', 'Competition', 'Other']
  },
  color: {
    type: String,
    default: 'from-blue-500 to-blue-600'
  },
  description: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
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
eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', eventSchema);
