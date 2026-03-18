const express = require('express');
const router = express.Router();
const { upload } = require('../config/upload');
const {
  getAllHighlights,
  getHighlightById,
  createHighlight,
  updateHighlight,
  deleteHighlight,
  deleteImage
} = require('../controllers/highlightController');

// Public routes
router.get('/', getAllHighlights);
router.get('/:id', getHighlightById);

// Admin routes (no auth for now - will add later)
router.post('/', upload.array('images', 10), createHighlight);
router.put('/:id', upload.array('images', 10), updateHighlight);
router.delete('/:id', deleteHighlight);
router.delete('/:id/images', deleteImage);

module.exports = router;
