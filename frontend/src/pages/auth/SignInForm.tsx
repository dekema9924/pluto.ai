import React, { useState } from 'react';
import { useModal } from '../../context/modalContext';

const SignInForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { toggleModal, switchForm } = useModal()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sign In:', { email, password });
    };



    return (
        <div className="absolute inset-0 m-auto  z-50 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md rounded-xl shadow-lg p-6 border text-black bg-white relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                    onClick={toggleModal}
                    aria-label="Close"
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold text-center">Sign in to your account</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Welcome back! Please enter your credentials.
                </p>

                <div className="flex gap-4 mb-4">
                    <button className="flex-1 border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                            alt="Facebook"
                            className="w-5 h-5"
                        />
                        Facebook
                    </button>
                    <button className="flex-1 border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Google
                    </button>
                </div>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                    >
                        Continue
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Don’t have an account?{' '}
                    <button onClick={switchForm} className="text-indigo-600 hover:underline">
                        Sign up
                    </button>
                </p>

                {/* <div className="mt-6 text-center text-xs text-gray-400">
                    <p>Secured by <strong>Firebase</strong></p>
                </div> */}
            </div>
        </div>
    );
};

export default SignInForm;
