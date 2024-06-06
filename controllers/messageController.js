const ChatRoom = require('../models/chatroom');
const Message = require('../models/message');


// Controller to send a message to a chat room
const sendMessageToChatRoom = async (req, res) => {
  try {
    const { roomId, content } = req.body;
    const userId = req.user.userId;

    const chatRoom = await ChatRoom.findOne({where:{roomId}});

    if(!chatRoom){
      return res.status(404).json({error:'chatroom not found!'})
    }

    // Check if user is part of the chat room
    const isMember = chatRoom.members.includes(userId);

    if (!isMember) {
      return res.status(403).json({ message: 'User is not part of the chat room' });
    }

    // Create the message
    const message = await Message.create({  senderId: userId, content, roomId });

    const io = req.app.get('io');
    // Emit the message to all clients in the chat room
    io.to(roomId).emit('message', message);

    res.status(201).json({message:"message sent successfully!",data:message});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get messages from a chat room
const getMessageFromChatRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Check if user is part of the chat room
    const chatRoom = await ChatRoom.findByPk(roomId);
     
    if(!chatRoom) return res.status(404).json({error:"chat room not found"})
    
    const isMember = chatRoom.members.includes(req.user.userId);
    
    if (!isMember) {
      return res.status(403).json({ message: 'User is not part of the chat room' });
    }

    // Get the messages from the chat room
    const messages = await Message.findAll({ where: { roomId } });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  sendMessageToChatRoom,
  getMessageFromChatRoom
};
