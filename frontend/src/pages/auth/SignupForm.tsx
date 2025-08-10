import React, { useState } from 'react';
import { useModal } from '../../context/modalContext';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import validator from 'validator'
import { createuser } from '../../api/usersApi';
import toast from 'react-hot-toast';
import CheckEmail from '../../components/CheckEmail';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';


const SignupForm: React.FC = () => {
    const { toggleModal, switchForm } = useModal()

    interface UserInput {
        email: string;
        password: string;
        name: string;
    }

    const [userInput, setUserInput] = useState<UserInput>({
        email: '',
        password: '',
        name: ''
    })
    const [ispasswordtext, setpasswordText] = useState('password')
    const [emailerr, setEmailErr] = useState("")
    const [passworderr, setPasswordErr] = useState("")
    const [showCheckEmailModal, setCheckEmailModal] = useState(false);

    const user = useSelector((state: RootState) => state.user)



    const handleClose = () => {
        setCheckEmailModal(false);
        switchForm()

    };

    const HandleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value

        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        const hints = [];
        e.preventDefault();

        //validate inputs
        if (!validator.isEmail(userInput.email)) {
            setEmailErr('invalid email or password format')
        }



        if (userInput.password.length < 8) hints.push('At least 8 characters');
        if (!/[a-z]/.test(userInput.password)) hints.push('At least one lowercase letter');
        if (!/[A-Z]/.test(userInput.password)) hints.push('At least one uppercase letter');
        if (!/[0-9]/.test(userInput.password)) hints.push('At least one number');
        if (!/[^A-Za-z0-9]/.test(userInput.password)) hints.push('At least one special character');

        if (hints.length > 0) {
            setPasswordErr(`Password should include: ${hints.join(', ')}`);
        } else {
            setPasswordErr('');
        }

        //create user
        try {
            const res = await createuser(userInput.email, userInput.password, userInput.name);

            if (res.status === 201 || res.status === 200) {
                if (user && !user.isVerified) {
                    setCheckEmailModal(true);
                }
                toast.success(res.data.message)
            } else {
                // handle other status codes or errors
                console.error('Signup failed:', res.status);
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                console.error(error.response.data.message);
            } else {
                console.error(error.message || 'Something went wrong');
            }
        }
    };



    return (

        <div className="flex absolute inset-0 m-auto  z-50 justify-center items-center min-h-screen ">
            {showCheckEmailModal && (
                <CheckEmail
                    open={showCheckEmailModal}
                    onClose={handleClose}
                    email={userInput.email}
                />
            )}
            <div className="w-full max-w-md rounded-xl shadow-lg p-6 border text-black bg-white relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                    onClick={toggleModal}
                    aria-label="Close"
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold text-center">Create your account</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Welcome! Please fill in the details to get started.
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
                    {/* email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => HandleUserInput(e)}
                            required
                            name='email'
                        />
                        <p className='text-sm text-red-500 pl-2'>{emailerr}</p>

                    </div>

                    {/* //name */}
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-md px-4 pb-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => HandleUserInput(e)}
                        required
                        name='name'
                    />

                    {/* password */}
                    <div className='flex items-center relative'>
                        <div className='relative w-full'>
                            <input
                                type={ispasswordtext}
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={(e) => HandleUserInput(e)}
                                required
                                name='password'
                            />
                            {passworderr && (
                                <p className='text-sm text-red-500 pl-2'>{passworderr}</p>
                            )}

                        </div>

                        <div className="absolute right-3 cursor-pointer top-2">

                            {
                                ispasswordtext == 'text' ?
                                    <RemoveRedEyeIcon onClick={() => setpasswordText('password')} sx={{ fontSize: 18, cursor: 'pointer', }} /> :
                                    <VisibilityOffIcon onClick={() => setpasswordText('text')} sx={{ fontSize: 18, cursor: 'pointer', }} />


                            }
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                    >
                        Continue
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <button onClick={switchForm} className="text-indigo-600 hover:underline">
                        Sign in
                    </button>
                </p>
                {/* 
                <div className="mt-6 text-center text-xs text-gray-400">
                    <p>
                        Secured by <strong>Firebase</strong>
                    </p>
                </div> */}

            </div>
        </div>
    );
};

export default SignupForm;
