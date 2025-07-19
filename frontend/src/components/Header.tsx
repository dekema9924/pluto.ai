// components/Header.tsx
import { useModal } from '../context/modalContext';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import useGetUser from '../hooks/useGetUser';

const Header = () => {
    const { toggleModal, isModal } = useModal();
    const navigate = useNavigate();
    const { loading } = useGetUser();

    // Ensure user is fetched before accessing it
    const user = useSelector((state: RootState) => state.user);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <header className="flex items-center justify-between h-44">
                {/* Logo */}
                <div onClick={() => navigate('/')} className="flex items-center ml-10 cursor-pointer">
                    <div>
                        <span className="w-4 h-4 bg-[wheat] rounded-full block"></span>
                        <span className="w-4 h-4 mx-6 bg-[wheat] rounded-full block"></span>
                        <span className="w-4 h-4 bg-[wheat] rounded-full block"></span>
                    </div>
                    <h1 className="text-[2em] md:text-[3em] font-semibold text-[wheat]">Pluto.ai</h1>
                </div>

                {
                    user.id ? (
                        <p onClick={() => navigate('/dashboard')} className=" size-16 rounded-full flex items-center justify-center capitalize font-bole text-2xl bg-orange-600 mr-10 cursor-pointer">{user.name?.slice(0, 1)}</p>

                    ) : (
                        <button
                            onClick={toggleModal}
                            className="border-2 cursor-pointer mr-10 w-42 h-12 rounded-md bg-[wheat] text-black font-bold"
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
