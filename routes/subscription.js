const express = require('express');
const checkAuth = require('../middlewares/auth');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

// Endpoint to buy prime subscription
router.post('/buy-prime', checkAuth, subscriptionController.buyPrime);

// Endpoint to buy coins
router.post('/buy-coins', checkAuth, subscriptionController.buyCoins);

module.exports = router;
