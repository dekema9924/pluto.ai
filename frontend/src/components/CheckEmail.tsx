import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { MdEmail } from 'react-icons/md';

type CheckEmailProps = {
    open: boolean;
    onClose: () => void;
    email: string;
};

const CheckEmail: React.FC<CheckEmailProps> = ({ open, onClose, email }) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="check-email-title" maxWidth="xs" fullWidth>
            <DialogTitle id="check-email-title" className="flex items-center gap-2">
                <MdEmail size={28} className="text-blue-600" />
                Check Your Email
            </DialogTitle>
            <DialogContent dividers>
                <p className="text-gray-700 text-center">
                    We have sent a verification link to <strong>{email}</strong>.
                    Please check your inbox and follow the instructions to verify your account.
                </p>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CheckEmail;
