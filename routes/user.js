// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controller/userController');

// Registration
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// update
router.put('/updateUser', authController.user_update);


// get user

router.post('/getUserData', authController.getUserData);


// Request OTP for "Forgot Password"
router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    await authController.generateAndSendOTP(email);
  
    return res.status(200).json({ message: 'OTP sent successfully' });
  });
  
  // Verify OTP
  router.post('/verify_otp', async (req, res) => {
    const { email, otp } = req.body;
  
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }
  
    const isVerified = await authController.verifyOTP(email, otp);
  
    if (!isVerified) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
  
    return res.status(200).json({ message: 'OTP verified successfully' });
  });
  
  // Reset Password
  router.post('/reset_password', async (req, res) => {
    const { email, newPassword } = req.body;
  
    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Email and new password are required' });
    }
  
    await authController.resetPassword(email, newPassword);
  
    return res.status(200).json({ message: 'Password reset successfully' });
  });

module.exports = router;
