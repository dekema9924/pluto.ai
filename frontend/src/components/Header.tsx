// components/Header.tsx
import { useModal } from '../context/modalContext';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import useGetUser from '../hooks/useGetUser';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { signoutUser } from '../api/usersApi';
import { useDispatch } from 'react-redux';
import { logoffUser } from '../features/userSlice';
import { useState } from 'react';

const Header = () => {
    const { toggleModal, isModal, toggleIsProfile } = useModal();
    const navigate = useNavigate();
    const { loading } = useGetUser();
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);


    // Ensure user is fetched before accessing it
    const user = useSelector((state: RootState) => state.user);

    if (loading) return <p>Loading...</p>;

    // Handle user sign out
    const handleSignOut = async () => {
        try {
            const res = await signoutUser();
            if (res.status !== 200) {
                throw new Error('Failed to sign out');
            }
            dispatch(logoffUser());
            navigate('/'); // Redirect to home after sign out
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    }

    //handle dropdown toggle
    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };


    // Handle profile modal toggle
    const handleprofilemodal = () => {
        toggleIsProfile();
        setDropdownOpen(false);
    }

    return (
        <>
            <header className="flex items-center gap-10  justify-between h-44">
                {/* Logo */}
                <div onClick={() => navigate('/')} className="flex items-center md:ml-10 ml-5 cursor-pointer">
                    <div>
                        <span className="w-4 h-4  bg-[wheat] rounded-full block"></span>
                        <span className="w-4 h-4 mx-6 bg-[wheat] rounded-full block"></span>
                        <span className="w-4 h-4 bg-[wheat] rounded-full block"></span>
                    </div>
                    <h1 className="text-[2em] md:text-[3em] font-semibold text-[wheat]">Pluto.ai</h1>
                </div>

                {
                    user.id ? (
                        <>
                            <div className=' relative '>
                                {
                                    user.profileImage ?
                                        <img onClick={handleDropdownToggle} src={user.profileImage} alt="Profile" className='w-13 cursor-pointer mr-10  h-13 rounded-full object-cover' />
                                        :
                                        <button onClick={handleDropdownToggle} className="flex uppercase items-center gap-2  cursor-pointer mr-10 border w-12 h-12 text-xl rounded-full justify-center bg-[wheat] text-black font-bold">
                                            {user.name?.slice(0, 1)}
                                        </button>
                                }
                                {/* dropdown */}
                                <div className={`absolute md:right-14 right-8 transition-all ease-out duration-100 rounded-lg bg-white text-black z-50 top-12  md:w-96 w-80 flex flex-col gap-3  ${dropdownOpen ? 'block py-7 p-4' : 'h-0 overflow-hidden p-0'}`}>
                                    <div className='flex items-center gap-3'>
                                        {
                                            user.profileImage ?
                                                <img onClick={handleDropdownToggle} src={user.profileImage} alt="Profile" className='w-13 cursor-pointer  h-13 rounded-full object-cover' />
                                                :
                                                <button onClick={handleDropdownToggle} className="flex items-center gap-2  cursor-pointer uppercase w-12 h-12 text-xl rounded-full justify-center bg-[wheat] text-black font-bold">
                                                    {user.name?.slice(0, 1)}
                                                </button>
                                        }                                        <div >
                                            <p>{user.name}</p>
                                            <p>{user.email}</p>
                                        </div>


                                    </div>
                                    <hr className='bordert-t my-2 border-gray-400 w-full' />

                                    {/* settings */}
                                    <div onClick={handleprofilemodal} className='flex text-gray-600 items-center gap-3 h-10 hover:rounded-lg cursor-pointer hover:bg-gray-200'>
                                        <SettingsIcon />
                                        <p>Manage Account</p>
                                    </div>

                                    <hr className='bordert-t my-2 border-gray-400 w-full' />

                                    {/* logout */}

                                    <div className='flex text-gray-600 items-center gap-3 cursor-pointer hover:bg-gray-200 h-10 hover:rounded-lg '>
                                        <LogoutIcon />
                                        <button onClick={() => handleSignOut()}>Sign out</button>
                                    </div>

                                </div>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={toggleModal}
                            className="border-2 text-sm cursor-pointer mr-10 w-42 h-12 rounded-md bg-[wheat] text-black font-bold"
                        >
                            Get Started
                        </button>
                    )
                }
            </header>

            {/* Auth Modal */}
            {isModal && <AuthModal />}

        </>
    );
};

export default Header;
