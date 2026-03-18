const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Get all messages
router.get('/', messageController.getAllMessages);

// Get active message
router.get('/active', messageController.getActiveMessage);

// Create message
router.post('/', messageController.createMessage);

// Update message
router.put('/:id', messageController.updateMessage);

// Delete message
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
