// components/AuthModal.tsx
import { useModal } from '../context/modalContext';
import SignInForm from '../pages/auth/SignInForm';
import SignupForm from '../pages/auth/SignupForm';

const AuthModal = () => {
    const { isModal, isSignIn } = useModal();

    if (!isModal) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            {isSignIn ? <SignInForm /> : <SignupForm />}
        </div>
    );
};

export default AuthModal;
