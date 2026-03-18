const mongoose = require('mongoose');

const guestHouseRequestSchema = new mongoose.Schema({
  membershipId: {
    type: String,
    required: [true, 'Membership ID or Email is required'],
    trim: true
  },
  referralMemberId: {
    type: String,
    trim: true,
    default: ''
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true
  },
  fromDate: {
    type: String,
    required: [true, 'From date is required']
  },
  toDate: {
    type: String,
    required: [true, 'To date is required']
  },
  checkInTime: {
    type: String,
    required: [true, 'Check-in time is required']
  },
  checkOutTime: {
    type: String,
    required: [true, 'Check-out time is required']
  },
  idProofPhoto: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    default: ''
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
guestHouseRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('GuestHouseRequest', guestHouseRequestSchema);
