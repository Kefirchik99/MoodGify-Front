// Settings.jsx

import React, { useState, useEffect } from 'react';
import { Button, Divider, InputGroup } from '@blueprintjs/core';
import AvatarSettings from './AvatarSettings';
import UsernameSettings from './UsernameSettings';
import EmailSettings from './EmailSettings';
import PasswordSettings from './PasswordSettings';
import { useAuth } from '../../providers/authContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import "../../styles/Settings.scss";

const Settings = () => {
    const { user, reauthenticateUser, updateUserName } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [currentUsername, setCurrentUsername] = useState('');
    const [newAvatarSeed, setNewAvatarSeed] = useState(null);

    const handleMakeChanges = async (e) => {
        e.preventDefault();
        if (!currentPassword.trim()) {
            setErrorMessage('Current password is required to make changes.');
            return;
        }

        try {
            // Reauthenticate the user
            await reauthenticateUser(currentPassword);

            // Update Username if changed
            if (newUsername && newUsername !== currentUsername) {
                await updateUserName(newUsername, currentUsername);
                setCurrentUsername(newUsername); // Update local state
            }

            // Update Avatar if changed
            if (newAvatarSeed !== null) {
                const userDocRef = doc(db, 'users', user.uid);
                await setDoc(userDocRef, { avatarSeed: newAvatarSeed }, { merge: true });
            }

            // Add other update functions here (e.g., email, password)

            setSuccessMessage('All changes have been successfully saved!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error updating settings:', error.message);
            setErrorMessage(error.message || 'Failed to make changes.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="settings-page">
            <h2>Account Settings</h2>
            <AvatarSettings onAvatarChange={setNewAvatarSeed} />
            <Divider className="settings-divider" />
            <UsernameSettings
                newUsername={newUsername}
                setNewUsername={setNewUsername}
                currentUsername={currentUsername}
                setCurrentUsername={setCurrentUsername}
            />
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
