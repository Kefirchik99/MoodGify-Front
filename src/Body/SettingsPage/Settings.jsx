// Settings.jsx

import React, { useState } from 'react';
import { Button, Divider, InputGroup, Collapse } from '@blueprintjs/core';
import AvatarSettings from './AvatarSettings';
import UsernameSettings from './UsernameSettings';
import EmailSettings from './EmailSettings';
import PasswordSettings from './PasswordSettings';
import ChangeHistory from './ChangeHistory';
import { useAuth } from '../../providers/authContext';
import { addChangeHistoryEntry } from '../../services/changeHistoryService';
import { useNotifications } from '../../providers/NotificationsContext';
import { useFetchChangeHistory } from '../../hooks/settingsHooks';
import "../../styles/Settings.scss";

const Settings = () => {
    const {
        user,
        username,
        setUsername,
        avatarSeed,
        setAvatarSeed,
        reauthenticateUser,
        updateUserName,
        updatePassword,
        updateEmail,
        updateAvatarSeed,
    } = useAuth();
    const { add: addNotification } = useNotifications();
    const [currentPassword, setCurrentPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newAvatarSeed, setNewAvatarSeed] = useState(null);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const { changeHistory } = useFetchChangeHistory(user);

    // Toggle change history visibility
    const toggleChangeHistory = () => {
        setIsHistoryOpen(!isHistoryOpen);
    };

    // Separate handlers for each setting change
    const handleUsernameChange = async () => {
        await updateUserName(newUsername, username);

        // Add to change history and notifications
        await addChangeHistoryEntry(user.uid, {
            type: 'Username Change',
            oldValue: username,
            newValue: newUsername,
        });
        await addNotification('Username Changed', `Your username has been changed to ${newUsername}.`);
    };

    const handleEmailChange = async () => {
        await updateEmail(currentPassword, newEmail);

        // Add to change history and notifications
        await addChangeHistoryEntry(user.uid, {
            type: 'Email Change',
            oldValue: user.email,
            newValue: newEmail,
        });
        await addNotification('Email Changed', `Your email has been changed to ${newEmail}.`);
    };

    const handlePasswordChange = async () => {
        await updatePassword(currentPassword, newPassword);

        // Add to change history and notifications
        await addChangeHistoryEntry(user.uid, {
            type: 'Password Change',
        });
        await addNotification('Password Changed', 'Your password has been successfully changed.');
    };

    const handleAvatarChange = async () => {
        await updateAvatarSeed(newAvatarSeed);

        // Add to change history and notifications
        await addChangeHistoryEntry(user.uid, {
            type: 'Avatar Change',
            newValue: newAvatarSeed,
        });
        await addNotification('Avatar Changed', 'Your avatar has been successfully updated.');
    };

    // Main handler for making changes
    const handleMakeChanges = async (e) => {
        e.preventDefault();
        if (!currentPassword.trim()) {
            setErrorMessage('Current password is required to make changes.');
            return;
        }

        try {
            // Reauthenticate the user
            await reauthenticateUser(currentPassword);

            let changesMade = false;

            // Process changes
            const changePromises = [];

            if (newUsername && newUsername !== username) {
                changePromises.push(handleUsernameChange());
                changesMade = true;
            }

            if (newEmail && newEmail !== user.email) {
                changePromises.push(handleEmailChange());
                changesMade = true;
            }

            if (newPassword) {
                changePromises.push(handlePasswordChange());
                changesMade = true;
            }

            if (newAvatarSeed !== null) {
                changePromises.push(handleAvatarChange());
                changesMade = true;
            }

            // Await all change promises
            await Promise.all(changePromises);

            // Reset fields
            setNewPassword('');
            setCurrentPassword('');
            setNewEmail('');
            setNewUsername('');
            setNewAvatarSeed(null);

            if (changesMade) {
                setSuccessMessage('All changes have been successfully saved!');
            } else {
                setSuccessMessage('No changes were made.');
            }
            setErrorMessage('');
        } catch (error) {
            console.error('Error updating settings:', error);
            setErrorMessage(error.message || 'Failed to make changes.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="settings-page">
            <h2>Account Settings</h2>
            <AvatarSettings
                onAvatarChange={setNewAvatarSeed}
                newAvatarSeed={newAvatarSeed}
            />
            <Divider className="settings-divider" />
            <UsernameSettings
                newUsername={newUsername}
                setNewUsername={setNewUsername}
                currentUsername={username}
            />
            <Divider className="settings-divider" />
            <EmailSettings
                newEmail={newEmail}
                setNewEmail={setNewEmail}
                currentEmail={user.email}
            />
            <Divider className="settings-divider" />
            <PasswordSettings
                newPassword={newPassword}
                setNewPassword={setNewPassword}
            />
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

            <Divider className="settings-divider" />
            <Button
                intent="none"
                icon={isHistoryOpen ? 'chevron-up' : 'chevron-down'}
                onClick={toggleChangeHistory}
                className="toggle-history-btn"
            >
                {isHistoryOpen ? 'Hide Change History' : 'Show Change History'}
            </Button>
            <Collapse isOpen={isHistoryOpen} keepChildrenMounted>
                <ChangeHistory changeHistory={changeHistory} />
            </Collapse>
        </div>
    );
};

export default Settings;
