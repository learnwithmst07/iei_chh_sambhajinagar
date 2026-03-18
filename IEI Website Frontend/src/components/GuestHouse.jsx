import React, { useState } from 'react';
import { Home, User, Phone, Mail, Calendar, Clock, Send, CheckCircle, Upload, Eye } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/guesthouse';

const GuestHouse = () => {
  const [formData, setFormData] = useState({
    membershipId: '',
    referralMemberId: '',
    name: '',
    mobile: '',
    fromDate: '',
    toDate: '',
    checkInTime: '',
    checkOutTime: '',
    idProofPhoto: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [idProofPreview, setIdProofPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          idProofPhoto: reader.result
        });
        setIdProofPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          membershipId: '',
          referralMemberId: '',
          name: '',
          mobile: '',
          fromDate: '',
          toDate: '',
          checkInTime: '',
          checkOutTime: '',
          idProofPhoto: ''
        });
        setIdProofPreview(null);
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
            <Home className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            IEI Guest House Booking
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book your stay at IEI Guest House. Fill in the details below and submit your request. 
            Our admin team will review and confirm your booking.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="max-w-2xl mx-auto mb-8 bg-green-50 border-2 border-green-500 rounded-lg p-6 flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-green-900">Request Submitted Successfully!</h3>
              <p className="text-green-700 mt-1">
                Your guest house booking request has been submitted. Our admin team will review it and contact you soon.
              </p>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Membership ID / Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Membership ID / Email *
              </label>
              <input
                type="text"
                name="membershipId"
                value={formData.membershipId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your membership ID or email"
              />
            </div>

            {/* Referral Membership ID / Gmail */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Referral Membership ID / Gmail
              </label>
              <input
                type="text"
                name="referralMemberId"
                value={formData.referralMemberId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter referral membership ID or gmail (optional)"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your full name"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter 10-digit mobile number"
              />
              <p className="text-xs text-gray-500 mt-1">Format: 9876543210 (10 digits)</p>
            </div>

            {/* ID Proof Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Upload className="w-4 h-4 inline mr-2" />
                ID Proof Photo *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">Upload a clear photo of your valid ID proof (Aadhar, Passport, Driving License, etc.)</p>
              {idProofPreview && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 font-semibold mb-2">Preview:</p>
                  <img src={idProofPreview} alt="ID Proof Preview" className="h-32 w-auto rounded" />
                </div>
              )}
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  From Date *
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  To Date *
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  required
                  min={formData.fromDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Check-in Time *
                </label>
                <input
                  type="time"
                  name="checkInTime"
                  value={formData.checkInTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Check-out Time *
                </label>
                <input
                  type="time"
                  name="checkOutTime"
                  value={formData.checkOutTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Request
                </>
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Important Information:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Please carry your membership card and valid ID proof</li>
              <li>• Check-in time: After 12:00 PM</li>
              <li>• Check-out time: Before 11:00 AM</li>
              <li>• You will receive confirmation via WhatsApp</li>
              <li>• Booking is subject to availability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestHouse;
