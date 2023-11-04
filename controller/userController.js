// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user_model');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');


// User Registration
async function register(req, res) {
  try {
    const { name, email, password,mobile, type, latitude, longitude,address,city,pincode } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      type,
      latitude,
      longitude,
      address,
      city,
      pincode
    });

    const token = jwt.sign({ user_id: user.user_id, email,type:type,address }, 'room_server');
    res.status(201).json({ user_id: user.user_id, email, name,mobile, type,latitude, longitude,address,city,pincode, token });
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
  res.json({ user_id: user.user_id, email,mobile:user.mobile, type: user.type, latitude: user.latitude, longitude: user.longitude,address:user.address,city:user.city,pincode:user.pincode, token });
}

// user update 
async function user_update(req, res) {
    const {user_id, name,mobile, latitude, longitude , address,city,pincode} = req.body;
  
    try {
      // Find the user by user_id
      const user = await User.findByPk(user_id);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user details
      user.name = name || user.name;
      user.mobile = mobile || user.mobile;
      user.latitude = latitude || user.latitude;
      user.longitude = longitude || user.longitude;
      user.address = address || user.address;
      user.city = city || user.city;
      user.pincode = pincode || user.pincode;
  
      await user.save();
  
      res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Update failed' });
    }
  }

  // get user data

  async function getUserData(req, res) {
    const { user_id } = req.body;
  
    try {
      // Find the user by user_id
      const user = await User.findOne({ where: { user_id } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send all user data
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'User data retrieval failed' });
    }
  }

  // OTP

  const emailTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'roomserver32@gmail.com',
      pass: 'psswsrpjhqrkowyb',
    },
  });
  
  const otps = {}; // Example: In-memory storage for OTPs
  
  async function generateAndSendOTP(email) {
    const otp = generateNumericOTP(6); // Generate a 6-digit numeric OTP
    otps[email] = { otp, expiresAt: Date.now() + 180 * 1000 }; // OTP expires in 3 minutes
  
    const mailOptions = {
      from: 'roomserver32@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <p>Your Absolute Stay Account: ${email} is Requested for Forgot password!</p>
        <p>Your OTP for password reset is: <strong style="font-size: 20px;">${otp}</strong></p>
        <p>The OTP is only valid for 3 minutes</p>
      `,
    };
  
    emailTransporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Failed to send email:', error);
      }
    });
  }
  
  function generateNumericOTP(length) {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += randomDigit(); // Append a random digit to the OTP
    }
    return otp;
  }
  
  function randomDigit() {
    return String.fromCharCode(48 + Math.floor(Math.random() * 10)); // Generate a random digit (0-9)
  }
  
  async function verifyOTP(email, otp) {
    const storedOTP = otps[email];
  
    if (!storedOTP || storedOTP.otp !== otp || Date.now() > storedOTP.expiresAt) {
      return false;
    }
  
    // Clear the stored OTP
    delete otps[email];
    return true;
  }
  
    
    async function resetPassword(email, newPassword) {
      // Hash the new password before storing it
      const saltRounds = 10; // The higher, the more secure but slower
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
      try {
        // Update the user's password in the database
        const user = await User.findOne({ where: { email } });
    
        if (!user) {
          throw new Error('User not found');
        }
    
        user.password = hashedPassword;
        await user.save();
      } catch (error) {
        console.error('Failed to reset password:', error);
        throw new Error('Password reset failed');
      }
    }

module.exports = { register, login , user_update,getUserData,generateAndSendOTP, verifyOTP, resetPassword};
