const GuestHouseRequest = require('../models/GuestHouseRequest');

// @desc    Get all guest house requests
// @route   GET /api/guesthouse
// @access  Private (Admin)
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await GuestHouseRequest.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching requests',
      error: error.message
    });
  }
};

// @desc    Get single request
// @route   GET /api/guesthouse/:id
// @access  Private (Admin)
exports.getRequestById = async (req, res) => {
  try {
    const request = await GuestHouseRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching request',
      error: error.message
    });
  }
};

// @desc    Create new guest house request
// @route   POST /api/guesthouse
// @access  Public
exports.createRequest = async (req, res) => {
  try {
    const request = await GuestHouseRequest.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Guest house request submitted successfully',
      data: request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating request',
      error: error.message
    });
  }
};

// @desc    Update request status (Approve/Reject)
// @route   PUT /api/guesthouse/:id/status
// @access  Private (Admin)
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    const request = await GuestHouseRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    request.status = status;
    if (adminNotes) {
      request.adminNotes = adminNotes;
    }
    await request.save();

    res.json({
      success: true,
      message: `Request ${status} successfully`,
      data: request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating request status',
      error: error.message
    });
  }
};

// @desc    Delete request
// @route   DELETE /api/guesthouse/:id
// @access  Private (Admin)
exports.deleteRequest = async (req, res) => {
  try {
    const request = await GuestHouseRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    res.json({
      success: true,
      message: 'Request deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting request',
      error: error.message
    });
  }
};

// @desc    Send WhatsApp message
// @route   POST /api/guesthouse/:id/whatsapp
// @access  Private (Admin)
exports.sendWhatsAppMessage = async (req, res) => {
  try {
    const request = await GuestHouseRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Format mobile number (remove spaces, dashes, etc.)
    const mobile = request.mobile.replace(/\D/g, '');
    
    // Create WhatsApp message
    let message = '';
    if (request.status === 'approved') {
      message = `Dear ${request.name},\n\nYour IEI Guest House booking request has been APPROVED!\n\nBooking Details:\nMembership ID: ${request.membershipId}\nCheck-in: ${request.fromDate} at ${request.checkInTime}\nCheck-out: ${request.toDate} at ${request.checkOutTime}\n\nPlease carry your membership card and valid ID proof.\n\nThank you,\nIEI Chh. Sambhajinagar`;
    } else if (request.status === 'rejected') {
      message = `Dear ${request.name},\n\nWe regret to inform you that your IEI Guest House booking request has been REJECTED.\n\nReason: ${request.adminNotes || 'Not available for selected dates'}\n\nPlease contact us for alternative dates.\n\nThank you,\nIEI Chh. Sambhajinagar`;
    }

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/91${mobile}?text=${encodeURIComponent(message)}`;

    res.json({
      success: true,
      message: 'WhatsApp URL generated',
      whatsappUrl: whatsappUrl,
      mobile: mobile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating WhatsApp message',
      error: error.message
    });
  }
};
