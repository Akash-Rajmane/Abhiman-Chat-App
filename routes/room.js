const express = require('express');
const roomController = require("../controllers/roomController");
const checkPrime = require("../middlewares/prime");
const checkAuth = require("../middlewares/auth");

const router = express.Router();

router.post('/chatrooms', checkAuth, checkPrime, roomController.createChatRoom);
   
router.post('/joinroom', checkAuth, roomController.joinChatRoom)


module.exports = router;
