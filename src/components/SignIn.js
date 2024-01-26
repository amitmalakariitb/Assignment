import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/signup', {
                name,
                email,
                password,
            });

            console.log(response.data);
            setSignUpSuccess(true);

            setTimeout(() => {
                navigate('/signin');
            }, 500);
        } catch (error) {
            console.error('Error in sign up:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">
                    {signUpSuccess
                        ? 'Sign Up Successful! Please Sign In.'
                        : 'Welcome to Galactic Dashboard'}
                </h2>

                {!signUpSuccess && (
                    <form onSubmit={handleSignUp}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>
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
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                            Sign Up
                        </button>
                    </form>
                )}

                {signUpSuccess && (
                    <p className="text-green-600 font-semibold mb-4">
                        Redirecting to Sign In page...
                    </p>
                )}

                <p className="mt-4 text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-blue-500">
                        Sign In
                    </Link>
                </p>

                {/*  link for "Forgot Password" */}
                <p className="mt-2 text-sm text-gray-600">
                    <Link to="/forgot-password" className="text-blue-500">
                        Forgot Password
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
