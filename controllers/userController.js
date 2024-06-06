const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller to sign up a new user
const signUpUser = async (req, res) => {
  const { userId, deviceId, name, phone, password } = req.body;
 
  try {
    const existingUser = await User.findOne({ where: { phone:phone } });
    if(existingUser){
      return res.status(400).json({ error: 'User is already signed up, please login' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userId, deviceId, name, phone, availCoins: 0, isPrime: false, password: hashedPassword, freeJoin: true });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
};

// Controller to log in a user
const logInUser = async (req, res) => {
  const { phone, password } = req.body;
 
  try {
    const user = await User.findOne({ where: { phone:phone } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    const passwrdMatch = await bcrypt.compare(password, user.password);
   
    if (passwrdMatch) {
      const token = jwt.sign({ userId: user.userId, isPrime: user.isPrime }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { userId: req.params.userId } });
    console.log(user);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  signUpUser,
  logInUser,
  getUserProfile
};
