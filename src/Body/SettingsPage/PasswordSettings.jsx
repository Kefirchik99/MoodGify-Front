// PasswordSettings.jsx

import React from 'react';
import { InputGroup } from '@blueprintjs/core';

const PasswordSettings = ({ newPassword, setNewPassword }) => {
    return (
        <div className="password-settings">
            <label htmlFor="new-password-input">New Password</label>
            <InputGroup
                id="new-password-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
            />
        </div>
    );
};

export default PasswordSettings;
