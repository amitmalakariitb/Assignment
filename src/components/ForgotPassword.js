import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/forgot-password', { email });
            setOtpSent(true);
            navigate('/reset-password');
        } catch (error) {
            console.error('Error in forgot password:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">
                    {otpSent
                        ? 'OTP sent to your email for password reset'
                        : 'Forgot Password'}
                </h2>

                {!otpSent && (
                    <form onSubmit={handleForgotPassword}>
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
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                            Send OTP
                        </button>
                    </form>
                )}

                {otpSent && (
                    <p className="text-green-600 font-semibold mb-4">
                        Check your email for the OTP.
                    </p>
                )}

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

export default ForgotPassword;
