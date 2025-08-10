import React from 'react';

interface BackdropProps {
    onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ onClose }) => {
    return (
        <div
            onClick={onClose}
            className="fixed inset-0 backdrop-blur-xl bg-white/30 z-30 transition-opacity duration-300"
        />
    );
};

export default Backdrop;
