const FriendRequest  = require('../models/friendrequest');

const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const friendRequest = await FriendRequest.create({ senderId: req.user.userId, receiverId, status: 'pending' });
    res.status(201).json({message:"Friend request sent successfully!",data:friendRequest});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  sendFriendRequest,
};
