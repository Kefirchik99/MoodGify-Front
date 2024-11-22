import React, { useState } from 'react';
import { InputGroup } from '@blueprintjs/core';
import { useAuth } from '../../providers/authContext';

const PasswordSettings = () => {
    const { changeUserPassword } = useAuth();
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = async () => {
        try {
            await changeUserPassword(newPassword);
            alert('Password updated successfully!');
        } catch (error) {
            alert('Failed to update password.');
        }
    };

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
