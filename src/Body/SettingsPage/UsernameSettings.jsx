// UsernameSettings.jsx

import React from 'react';
import { InputGroup } from '@blueprintjs/core';

const UsernameSettings = ({ newUsername, setNewUsername, currentUsername }) => {
    return (
        <div className="username-settings">
            <label htmlFor="current-username">Current Username</label>
            <InputGroup
                id="current-username"
                value={currentUsername}
                disabled
            />
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
