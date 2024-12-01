import React from 'react';
import { InputGroup } from '@blueprintjs/core';

const PasswordSettings = ({ passwordDetails, setPasswordDetails }) => {
    const handlePasswordChange = (e) => {
        setPasswordDetails((prev) => ({
            ...prev,
            newPassword: e.target.value,
        }));
    };

    return (
        <div className="password-settings">
            <label htmlFor="new-password-input">New Password</label>
            <InputGroup
                id="new-password-input"
                type="password"
                value={passwordDetails.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
            />
        </div>
    );
};

export default PasswordSettings;
