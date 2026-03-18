const Highlight = require('../models/Highlight');
const path = require('path');
const fs = require('fs');
const { cloudinary } = require('../config/upload');

// @desc    Get all highlights
// @route   GET /api/highlights
// @access  Public
exports.getAllHighlights = async (req, res) => {
  try {
    const highlights = await Highlight.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: highlights.length,
      data: highlights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching highlights',
      error: error.message
    });
  }
};

// @desc    Get single highlight
// @route   GET /api/highlights/:id
// @access  Public
exports.getHighlightById = async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);
    
    if (!highlight) {
      return res.status(404).json({
        success: false,
        message: 'Highlight not found'
      });
    }

    res.json({
      success: true,
      data: highlight
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching highlight',
      error: error.message
    });
  }
};

// @desc    Create new highlight
// @route   POST /api/highlights
// @access  Private (Admin only)
exports.createHighlight = async (req, res) => {
  try {
    const { title, description, fullContent, order } = req.body;
    
    // Get uploaded image paths (Cloudinary stores the URL in file.path)
    const images = req.files ? req.files.map(file => file.path) : [];
    
    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
    }

    const highlight = await Highlight.create({
      title,
      description,
      fullContent,
      images,
      order: order || 0
    });
    
    res.status(201).json({
      success: true,
      message: 'Highlight created successfully',
      data: highlight
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating highlight',
      error: error.message
    });
  }
};

// @desc    Update highlight
// @route   PUT /api/highlights/:id
// @access  Private (Admin only)
exports.updateHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);

    if (!highlight) {
      return res.status(404).json({
        success: false,
        message: 'Highlight not found'
      });
    }

    const { title, description, fullContent, order, existingImages } = req.body;
    
    // Handle new images
    let images = existingImages ? JSON.parse(existingImages) : [];
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      images = [...images, ...newImages];
    }

    const updatedHighlight = await Highlight.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        fullContent,
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
      message: 'Highlight updated successfully',
      data: updatedHighlight
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating highlight',
      error: error.message
    });
  }
};

// @desc    Delete highlight
// @route   DELETE /api/highlights/:id
// @access  Private (Admin only)
exports.deleteHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);

    if (!highlight) {
      return res.status(404).json({
        success: false,
        message: 'Highlight not found'
      });
    }

    // Delete associated images from Cloudinary
    if (highlight.images && highlight.images.length > 0) {
      const deletePromises = highlight.images.map(imagePath => {
        // Extract public ID from Cloudinary URL
        // format: https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/public_id.jpg
        const parts = imagePath.split('/');
        const folderAndId = parts.slice(-2).join('/'); // folder/public_id.jpg
        const publicId = folderAndId.split('.')[0];     // folder/public_id
        return cloudinary.uploader.destroy(publicId);
      });
      await Promise.all(deletePromises);
    }

    await Highlight.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Highlight deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting highlight',
      error: error.message
    });
  }
};

// @desc    Delete single image from highlight
// @route   DELETE /api/highlights/:id/images
// @access  Private (Admin only)
exports.deleteImage = async (req, res) => {
  try {
    const { imagePath } = req.body;
    const highlight = await Highlight.findById(req.params.id);

    if (!highlight) {
      return res.status(404).json({
        success: false,
        message: 'Highlight not found'
      });
    }

    // Remove image from array
    highlight.images = highlight.images.filter(img => img !== imagePath);
    await highlight.save();

    // Delete from Cloudinary
    if (imagePath.includes('cloudinary.com')) {
      const parts = imagePath.split('/');
      const folderAndId = parts.slice(-2).join('/');
      const publicId = folderAndId.split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    } else {
      // Handle legacy local files if any
      const fullPath = path.join(__dirname, '..', imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    res.json({
      success: true,
      message: 'Image deleted successfully',
      data: highlight
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
};
