import React, { useState, createContext, useContext } from "react";

// ontext type
type ModalContextType = {
    isModal: boolean;
    isSignIn: boolean;
    toggleModal: () => void;
    switchForm: () => void;
    isMenu: boolean;
    toggleIsMenu: () => void;
}

// Create the context with an initial empty default
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider props
type ModalProviderProps = {
    children: React.ReactNode;
};

// ModalProvider component
export const ModalProvider = ({ children }: ModalProviderProps) => {
    //handles login form modal
    const [isModal, setModal] = useState(false);
    // and toggles between sign in and sign up forms
    // default to sign in
    const [isSignIn, setIsSignIn] = useState(true);

    // handles menu and sidebar toggles
    const [isMenu, setIsMenu] = useState(false);


    const toggleModal = () => { setModal((prev) => !prev) };
    const switchForm = () => setIsSignIn((prev) => !prev);
    const toggleIsMenu = () => setIsMenu((prev) => !prev);

    return (
        <ModalContext.Provider value={{ isModal, isSignIn, toggleModal, switchForm, isMenu, toggleIsMenu }}>
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
