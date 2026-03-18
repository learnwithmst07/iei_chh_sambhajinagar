const Gallery = require('../models/Gallery');
const path = require('path');
const fs = require('fs');
const { cloudinary } = require('../config/upload');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: gallery.length,
      data: gallery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery',
      error: error.message
    });
  }
};

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    res.json({
      success: true,
      data: gallery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery item',
      error: error.message
    });
  }
};

// @desc    Create new gallery item
// @route   POST /api/gallery
// @access  Private (Admin only)
exports.createGallery = async (req, res) => {
  try {
    const { title, description, category, order } = req.body;
    
    // Get uploaded image paths (Cloudinary stores the URL in file.path)
    const images = req.files ? req.files.map(file => file.path) : [];
    
    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
    }

    const gallery = await Gallery.create({
      title,
      description,
      category,
      images,
      order: order || 0
    });
    
    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: gallery
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating gallery item',
      error: error.message
    });
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private (Admin only)
exports.updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    const { title, description, category, order, existingImages } = req.body;
    
    // Handle new images - safely parse JSON
    let images = [];
    if (existingImages) {
      try {
        const parsed = JSON.parse(existingImages);
        images = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        images = [];
      }
    }
    
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      images = [...images, ...newImages];
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        images,
        order
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      message: 'Gallery item updated successfully',
      data: updatedGallery
    });
  } catch (error) {
    console.error('Gallery update error:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating gallery item',
      error: error.message
    });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private (Admin only)
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    // Delete associated images from Cloudinary
    if (gallery.images && gallery.images.length > 0) {
      const deletePromises = gallery.images.map(imagePath => {
        // Extract public ID from Cloudinary URL
        // format: https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/public_id.jpg
        const parts = imagePath.split('/');
        const folderAndId = parts.slice(-2).join('/'); // folder/public_id.jpg
        const publicId = folderAndId.split('.')[0];     // folder/public_id
        return cloudinary.uploader.destroy(publicId);
      });
      await Promise.all(deletePromises);
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting gallery item',
      error: error.message
    });
  }
};

// @desc    Delete single image from gallery
// @route   DELETE /api/gallery/:id/images
// @access  Private (Admin only)
exports.deleteImage = async (req, res) => {
  try {
    const { imagePath } = req.body;
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    // Remove image from array
    gallery.images = gallery.images.filter(img => img !== imagePath);
    await gallery.save();

    // Delete from Cloudinary
    if (imagePath.includes('cloudinary.com')) {
      const parts = imagePath.split('/');
      const folderAndId = parts.slice(-2).join('/');
      const publicId = folderAndId.split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    } else {
      // Handle legacy local files
      const fullPath = path.join(__dirname, '..', imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    res.json({
      success: true,
      message: 'Image deleted successfully',
      data: gallery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
};
