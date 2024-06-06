const bcrypt = require('bcrypt');
const ChatRoom = require("../models/chatroom");
const User = require('../models/user');



// Controller to create a chat room
const createChatRoom = async (req, res) => {
  const { roomId, password, name } = req.body;
  
  try {
    // Hash the provided password
    const hashedPassword = await bcrypt.hash(password, 10);

    const members = [req.user.userId];
    const chatRoom = await ChatRoom.create({ roomId, name, capacity: 1, password: hashedPassword, members });

    
    // Emit an event to notify clients that a new room has been created
  
    req.app.get('io').emit('chatRoomCreated', chatRoom);


    res.status(200).json({ message: 'Chat room created successfully', chatRoom: chatRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to join a chat room
const joinChatRoom = async (req, res) => {
  const { roomId, password } = req.body;
  try {
    const chatRoom = await ChatRoom.findOne({ where: { roomId } });
    
    if (!chatRoom) return res.status(404).json({ error: 'Chat room not found' });

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, chatRoom.password);
    if (!passwordMatch) return res.status(403).json({ error: 'Invalid password' });

    if (chatRoom.capacity >= 6) return res.status(403).json({ error: 'Chat room is full' });

    // Check if the user is already a member of the chat room
    if (chatRoom.members.includes(req.user.userId)) {
      return res.status(400).json({ error: 'User is already a member of this chat room' });
    }

    if (!req.user.isPrime) {
      const user = await User.findOne({ where: { userId: req.user.userId } });
      
      // If the user has a freeJoin option, allow joining without deducting coins
      if (!user.freeJoin) {
          if (user.availCoins < 150) {
            return res.status(403).json({ error: 'Insufficient coins' });
          }
          user.availCoins -= 150;
          await user.save();
      } else {
          user.freeJoin = false;
          await user.save();
      }
  }

  // Increase the chat room capacity and add member
  chatRoom.capacity = parseInt(chatRoom.capacity) + 1;
  chatRoom.members = [...chatRoom.members, req.user.userId];

  await chatRoom.save();

  // const io = req.app.get('io');
  // io.to(chatRoom.roomId).emit("joinRoom",chatRoom.roomId);

  res.status(200).json({ message: `Joined chat room ${roomId} successfully` });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createChatRoom,
  joinChatRoom,
};
