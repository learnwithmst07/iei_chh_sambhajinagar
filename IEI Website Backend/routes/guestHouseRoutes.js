const express = require('express');
const router = express.Router();
const {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
  deleteRequest,
  sendWhatsAppMessage
} = require('../controllers/guestHouseController');

// Public route
router.post('/', createRequest);

// Admin routes (no auth for now - will add later)
router.get('/', getAllRequests);
router.get('/:id', getRequestById);
router.put('/:id/status', updateRequestStatus);
router.delete('/:id', deleteRequest);
router.post('/:id/whatsapp', sendWhatsAppMessage);

module.exports = router;
