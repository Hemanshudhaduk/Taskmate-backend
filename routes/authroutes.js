import express from 'express';
import { signupUser, verifyOtp, loginUser } from '../controller/authController.js';


const router = express.Router();

// Signup route
router.post('/signup', signupUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);

export default router;