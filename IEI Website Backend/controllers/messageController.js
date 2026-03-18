const Message = require('../models/Message');

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get active message
exports.getActiveMessage = async (req, res) => {
  try {
    const message = await Message.findOne({ isActive: true });
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create message
exports.createMessage = async (req, res) => {
  try {
    const { message, isActive } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // If this message is being set as active, deactivate others
    if (isActive) {
      await Message.updateMany({}, { isActive: false });
    }

    const newMessage = new Message({
      message,
      isActive: isActive || false
    });

    await newMessage.save();
    res.status(201).json({ success: true, data: newMessage, message: 'Message created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update message
exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, isActive } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // If this message is being set as active, deactivate others
    if (isActive) {
      await Message.updateMany({ _id: { $ne: id } }, { isActive: false });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { message, isActive },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, data: updatedMessage, message: 'Message updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
