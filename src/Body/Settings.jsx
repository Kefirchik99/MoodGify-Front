import React, { useState, useEffect } from 'react';
import { Button, Divider, FormGroup, InputGroup } from '@blueprintjs/core';
import { useAuth } from '../providers/authContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Avatar from './Avatar';
import "../styles/Settings.scss";

const Settings = () => {
    const { user, reauthenticate, changePassword } = useAuth(); // Ensure `reauthenticate` and `changePassword` are implemented
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [avatarKey, setAvatarKey] = useState(0); // Key to force Avatar refresh

    useEffect(() => {
        const fetchUserSettings = async () => {
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUsername(userData.username || '');
                    setEmail(user.email || '');
                }
            }
            setLoading(false);
        };
        fetchUserSettings();
    }, [user]);

    const handleUpdate = async (field, value) => {
        if (!value.trim()) {
            setErrorMessage(`${field} cannot be empty.`);
            return;
        }
        if (!currentPassword.trim()) {
            setErrorMessage("Current password is required.");
            return;
        }
        try {
            await reauthenticate(currentPassword); // Confirm password
            const userDoc = doc(db, 'users', user.uid);
            await updateDoc(userDoc, { [field]: value }); // Update specific field
            setSuccessMessage(`${field} updated successfully!`);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(`Failed to update ${field}. Ensure the password is correct.`);
        }
    };

    const handlePasswordChange = async () => {
        if (!currentPassword.trim() || !newPassword.trim()) {
            setErrorMessage("Both current and new passwords are required.");
            return;
        }
        try {
            await reauthenticate(currentPassword); // Confirm password
            await changePassword(newPassword);
            setSuccessMessage("Password changed successfully!");
            setErrorMessage('');
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            setErrorMessage("Failed to change password. Ensure the current password is correct.");
        }
    };

    const handleGenerateNewAvatar = () => {
        setAvatarKey((prevKey) => prevKey + 1); // Increment key to force Avatar refresh
        setSuccessMessage("Avatar updated!");
    };

    if (!user) {
        return <p>You must be logged in to view this page.</p>;
    }

    if (loading) {
        return <p>Loading settings...</p>;
    }

    return (
        <div className="settings-page">
            <h2>Account Settings</h2>

            {/* Avatar Section */}
            <div className="settings-avatar">
                <Avatar className="avatar" value={avatarKey} size={100} />
                <Button
                    intent="primary"
                    text="Generate New Avatar"
                    onClick={handleGenerateNewAvatar}
                    className="settings-avatar-btn"
                />
            </div>

            {/* Username Section */}
            <Divider className="settings-divider" />
            <h3>Change Username</h3>
            <FormGroup label="New Username" labelFor="username-input">
                <InputGroup
                    id="username-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter new username"
                />
            </FormGroup>
            <FormGroup label="Current Password" labelFor="username-password-input">
                <InputGroup
                    id="username-password-input"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                />
            </FormGroup>
            <Button
                intent="success"
                text="Update Username"
                onClick={() => handleUpdate("username", username)}
                className="settings-username-btn"
            />

            {/* Email Section */}
            <Divider className="settings-divider" />
            <h3>Change Email</h3>
            <FormGroup label="New Email" labelFor="email-input">
                <InputGroup
                    id="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter new email"
                />
            </FormGroup>
            <FormGroup label="Current Password" labelFor="email-password-input">
                <InputGroup
                    id="email-password-input"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                />
            </FormGroup>
            <Button
                intent="primary"
                text="Update Email"
                onClick={() => handleUpdate("email", email)}
                className="settings-email-btn"
            />

            {/* Password Section */}
            <Divider className="settings-divider" />
            <h3>Change Password</h3>
            <FormGroup label="Current Password" labelFor="current-password-input">
                <InputGroup
                    id="current-password-input"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                />
            </FormGroup>
            <FormGroup label="New Password" labelFor="new-password-input">
                <InputGroup
                    id="new-password-input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                />
            </FormGroup>
            <Button
                intent="warning"
                text="Change Password"
                onClick={handlePasswordChange}
                className="settings-password-btn"
            />

            {/* Messages */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default Settings;
