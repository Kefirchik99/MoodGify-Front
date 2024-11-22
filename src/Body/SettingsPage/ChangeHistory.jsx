// ChangeHistory.jsx

import React from 'react';
import { Card } from '@blueprintjs/core';

const ChangeHistory = ({ changeHistory }) => {
    return (
        <Card className="change-history-card">
            {changeHistory.length > 0 ? (
                <ul className="change-history-list">
                    {changeHistory.map((change) => (
                        <li key={change.id} className="change-history-item">
                            <p><strong>Type:</strong> {change.type}</p>
                            {change.oldValue && <p><strong>Old Value:</strong> {change.oldValue}</p>}
                            {change.newValue && <p><strong>New Value:</strong> {change.newValue}</p>}
                            <p><strong>Date:</strong> {change.timestamp.toDate().toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No changes have been made to your profile yet.</p>
            )}
        </Card>
    );
};

export default ChangeHistory;
