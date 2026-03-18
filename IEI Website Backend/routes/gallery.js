const express = require('express');
const router = express.Router();
const { upload } = require('../config/upload');
const {
  getAllGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
  deleteImage
} = require('../controllers/galleryController');

// Public routes
router.get('/', getAllGallery);
router.get('/:id', getGalleryById);

// Admin routes (no auth for now - will add later)
router.post('/', upload.array('images', 10), createGallery);
router.put('/:id', upload.array('images', 10), updateGallery);
router.delete('/:id', deleteGallery);
router.delete('/:id/images', deleteImage);

module.exports = router;
