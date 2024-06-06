const User = require('../models/user');

const checkPrime = async (req, res, next) => {
  try {
    const userId = req.user.userId; 
    const user = await User.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isPrime) {
      return res.status(403).json({ message: 'Access denied. User is not a prime member.' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = checkPrime;
