const express = require('express');
const userController = require('../controllers/userController');
const checkAuth  = require("../middlewares/auth");


const router = express.Router();


router.get('/profile/:userId', checkAuth, userController.getUserProfile);

router.post('/sign-up', userController.signUpUser);

router.post('/login', userController.logInUser);


module.exports = router;

