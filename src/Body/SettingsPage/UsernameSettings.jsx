// UsernameSettings.jsx

import React, { useEffect } from 'react';
import { InputGroup } from '@blueprintjs/core';
import { useAuth } from '../../providers/authContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const UsernameSettings = ({ newUsername, setNewUsername, currentUsername, setCurrentUsername }) => {
    const { user } = useAuth();

    useEffect(() => {
        const fetchCurrentUsername = async () => {
            const userDocRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setCurrentUsername(userData.username || '');
            } else {
                console.log('User document does not exist');
            }
        };

        fetchCurrentUsername();
    }, [user, setCurrentUsername]);

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
            {/* Note: No need to add password input here since it's handled in Settings */}
        </div>
    );
};

export default UsernameSettings;
