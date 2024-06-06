const User  = require('../models/user');

// Controller to buy prime subscription
const buyPrime = async (req, res) => {
  const {plan} = req.body;
  try {
    const { userId } = req.user;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isPrime) {
      return res.status(400).json({ error: 'User is already a prime member' });
    }

    // Set user's isPrime to true
    user.isPrime = true;
    await user.save();

    res.status(200).json({ message: `${plan} Prime subscription purchased successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to buy coins
const buyCoins = async (req, res) => {
  try {
    const { userId } = req.user;
    const coins  = parseInt(req.body.coins);

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add coins to user's availCoins
    user.availCoins += coins;
    await user.save();

    res.status(200).json({ message: `${coins} coins purchased successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  buyPrime,
  buyCoins
};
