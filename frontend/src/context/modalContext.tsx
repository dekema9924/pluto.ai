import React, { useState, createContext, useContext } from "react";

// ontext type
type ModalContextType = {
    isModal: boolean;
    isSignIn: boolean;
    toggleModal: () => void;
    switchForm: () => void;
    isMenu: boolean;
    toggleIsMenu: () => void;
    isProfile: boolean;
    toggleIsProfile: () => void;

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
    const toggleModal = () => { setModal((prev) => !prev) };

    // and toggles between sign in and sign up forms
    const [isSignIn, setIsSignIn] = useState(true);
    const switchForm = () => setIsSignIn((prev) => !prev);


    // handles menu and sidebar toggles
    const [isMenu, setIsMenu] = useState(false);
    const toggleIsMenu = () => setIsMenu((prev) => !prev);


    // handles profile toggles
    const [isProfile, setIsProfile] = useState(false);
    const toggleIsProfile = () => setIsProfile((prev) => !prev);



    return (
        <ModalContext.Provider value={{ isModal, isSignIn, toggleModal, switchForm, isMenu, toggleIsMenu, isProfile, toggleIsProfile }}>
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
