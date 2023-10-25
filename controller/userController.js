// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user_model');

// User Registration
async function register(req, res) {
  try {
    const { name, email, password, type, latitude, longitude } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      type,
      latitude,
      longitude,
    });

    const token = jwt.sign({ user_id: user.user_id, email,type:type }, 'room_server');
    res.status(201).json({ user_id: user.user_id, email, name, type,latitude, longitude, token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}

// User Login
async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ user_id: user.user_id, email }, 'room_server');
  res.json({ user_id: user.user_id, email, type: user.type, latitude: user.latitude, longitude: user.longitude, token });
}

module.exports = { register, login };
