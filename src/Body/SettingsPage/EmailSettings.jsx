// EmailSettings.jsx

import React from 'react';
import { InputGroup } from '@blueprintjs/core';

const EmailSettings = ({ newEmail, setNewEmail, currentEmail }) => {
    return (
        <div className="email-settings">
            <label htmlFor="current-email">Current Email</label>
            <InputGroup
                id="current-email"
                value={currentEmail}
                disabled
            />
            <label htmlFor="new-email-input">New Email</label>
            <InputGroup
                id="new-email-input"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
            />
        </div>
    );
};

export default EmailSettings;
