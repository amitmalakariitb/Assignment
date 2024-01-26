const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/userdetails', authController.getUserDetails);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password-otp', authController.resetPasswordWithOtp);
module.exports = router;
