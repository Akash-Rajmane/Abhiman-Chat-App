const express = require('express');
const checkAuth = require('../middlewares/auth');
const { sendMessageToChatRoom, getMessageFromChatRoom } = require('../controllers/messageController');

const router = express.Router();

// Endpoint to send a message to a chat room
router.post('/messages', checkAuth, sendMessageToChatRoom);

// Endpoint to get all messages from a chat room
router.get('/messages/:roomId', checkAuth, getMessageFromChatRoom);

module.exports = router;
