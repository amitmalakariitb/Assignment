import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/reset-password-otp', {
                email,
                otp,
                newPassword,
            });
            navigate('/signin');
        } catch (error) {
            console.error('Error in reset password:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-sm font-semibold text-gray-600">
                            OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-600">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Reset Password
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-600">
                    Remember your password?{' '}
                    <Link to="/signin" className="text-blue-500">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
