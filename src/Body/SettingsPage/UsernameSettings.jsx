import React, { useState } from 'react';
import { InputGroup } from '@blueprintjs/core';
import { useAuth } from '../../providers/authContext';

const UsernameSettings = () => {
    const { user, changeUserName } = useAuth();
    const [newUsername, setNewUsername] = useState(user?.username || '');

    const handleUsernameChange = async () => {
        try {
            await changeUserName(newUsername);
            alert('Username updated successfully!');
        } catch (error) {
            alert('Failed to update username.');
        }
    };

    return (
        <div className="username-settings">
            <label htmlFor="new-username-input">New Username</label>
            <InputGroup
                id="new-username-input"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new username"
            />
        </div>
    );
};

export default UsernameSettings;
