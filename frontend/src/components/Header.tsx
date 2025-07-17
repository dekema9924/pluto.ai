// components/Header.tsx
import { useModal } from '../context/modalContext';
import AuthModal from './AuthModal';

const Header = () => {
    const { toggleModal, isModal } = useModal();

    return (
        <>
            <header className="flex items-center justify-between h-44">
                {/* Logo */}
                <div className="flex items-center ml-10">
                    <div>
                        <span className="w-4 h-4 bg-[wheat] rounded-full block"></span>
                        <span className="w-4 h-4 mx-6 bg-[wheat] rounded-full block"></span>
                        <span className="w-4 h-4 bg-[wheat] rounded-full block"></span>
                    </div>
                    <h1 className="text-[2em] md:text-[3em] font-semibold text-[wheat]">Pluto.ai</h1>
                </div>

                <button
                    onClick={toggleModal}
                    className="border-2 cursor-pointer mr-10 w-42 h-12 rounded-md bg-[wheat] text-black font-bold"
                >
                    Get Started
                </button>
            </header>

            {/* Auth Modal */}
            {isModal && <AuthModal />}
        </>
    );
};

export default Header;
