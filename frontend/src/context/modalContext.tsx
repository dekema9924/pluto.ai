import React, { useState, createContext, useContext } from "react";

// ontext type
type ModalContextType = {
    isModal: boolean;
    isSignIn: boolean;
    toggleModal: () => void;
    switchForm: () => void;
};

// Create the context with an initial empty default
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider props
type ModalProviderProps = {
    children: React.ReactNode;
};

// ModalProvider component
export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [isModal, setModal] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true); // default to sign in


    const toggleModal = () => { setModal((prev) => !prev) };
    const switchForm = () => setIsSignIn((prev) => !prev);

    return (
        <ModalContext.Provider value={{ isModal, isSignIn, toggleModal, switchForm }}>
            {children}
        </ModalContext.Provider>
    );
};

// Custom hook to use the context
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
