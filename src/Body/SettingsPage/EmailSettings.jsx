import React, { useState } from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import { useAuth } from '../../providers/authContext';

const EmailSettings = () => {
    const { user, changeUserEmail } = useAuth();
    const [newEmail, setNewEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleEmailChange = async () => {
        if (!newEmail.trim()) {
            setErrorMessage('New email cannot be empty.');
            return;
        }

        try {
            await changeUserEmail(newEmail);
            setSuccessMessage('Email updated successfully!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to update email. Ensure your current password is correct.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="email-settings">
            <label htmlFor="new-email-input">New Email</label>
            <InputGroup
                id="new-email-input"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default EmailSettings;
