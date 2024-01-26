const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
const jwtsecret = process.env.JWT_SECRET;
const sendgridApiKey = process.env.SENDGRID_API_KEY;


sgMail.setApiKey(sendgridApiKey);


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ email, name }, jwtsecret, { expiresIn: '1h' });


        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email, name: user.name }, jwtsecret, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error in signin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUserDetails = (req, res) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, jwtsecret);
        const { email, name } = decoded;

        res.json({ email, name });
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
}
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const otp = generateOtp();

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();

        const msg = {
            to: user.email,
            from: process.env.SENDER_EMAIL, // Sender email
            subject: 'Password Reset OTP',
            text: `Your one-time password for resetting your password is: ${otp}`,
        };

        await sgMail.send(msg);

        const otpToken = new Token({
            userId: user._id,
            token: otp.toString(),
            type: 'forgot-password',
        });

        await otpToken.save();

        res.status(200).json({ message: 'OTP sent to your email for password reset' });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const resetPasswordWithOtp = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const storedOtp = await Token.findOne({
            userId: user._id,
            token: otp,
            type: 'forgot-password',
        });

        if (!storedOtp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        await storedOtp.deleteOne();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error in resetPasswordWithOtp:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { signup, signin, getUserDetails, forgotPassword, resetPasswordWithOtp };