import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';
import dotenv from 'dotenv';
dotenv.config();

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();



export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    console.log(`Generated OTP: ${otp}`); // Log the generated OTP

    const user = await User.create({
      name,
      email,
      password: hashed,
      otp,
      isverified: false
    });

    await sendEmail(email, 'Verify your email', `Your OTP is ${otp}`);

    res.status(201).json({ message: 'Signup successful. OTP sent to email.' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp)
      return res.status(400).json({ message: 'Invalid OTP or email' });

    user.isverified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.isverified) return res.status(403).json({ message: 'Email not verified' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
