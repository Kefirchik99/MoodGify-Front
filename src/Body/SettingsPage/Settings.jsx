import React, { useState } from 'react';
import { Button, Divider, InputGroup } from '@blueprintjs/core';
import AvatarSettings from './AvatarSettings';
import UsernameSettings from './UsernameSettings';
import EmailSettings from './EmailSettings';
import PasswordSettings from './PasswordSettings';
import { useAuth } from '../../providers/authContext';
import "../../styles/Settings.scss";

const Settings = () => {
    const { reauthenticateUser } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleMakeChanges = async (e) => {
        e.preventDefault(); // Prevent page reload
        if (!currentPassword.trim()) {
            setErrorMessage('Current password is required to make changes.');
            return;
        }

        try {
            await reauthenticateUser(currentPassword); // Reauthenticate the user
            setSuccessMessage('All changes have been successfully saved!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to make changes. Ensure the current password is correct.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="settings-page">
            <h2>Account Settings</h2>
            <AvatarSettings />
            <Divider className="settings-divider" />
            <UsernameSettings />
            <Divider className="settings-divider" />
            <EmailSettings />
            <Divider className="settings-divider" />
            <PasswordSettings />
            <Divider className="settings-divider" />
            <form onSubmit={handleMakeChanges} className="settings-form">
                <div className="current-password-section">
                    <label htmlFor="current-password-input">Enter Current Password</label>
                    <InputGroup
                        id="current-password-input"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        className="current-password-input"
                    />
                </div>
                <Button
                    intent="primary"
                    text="Make Changes"
                    type="submit"
                    className="settings-submit-btn"
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
};

export default Settings;
