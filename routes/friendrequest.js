const express = require('express');
const friendRequestController = require("../controllers/friendRequestController");
const checkPrime = require("../middlewares/prime");
const checkAuth  = require('../middlewares/auth');

const router = express.Router();

router.post('/friend-requests', checkAuth, checkPrime, friendRequestController.sendFriendRequest);
  

module.exports = router;