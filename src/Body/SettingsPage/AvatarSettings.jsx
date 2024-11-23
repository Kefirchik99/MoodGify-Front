// AvatarSettings.jsx

import React from 'react';
import { Button } from '@blueprintjs/core';
import Avatar from '../Avatar';
import { useAuth } from '../../providers/authContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AvatarSettings = () => {
    const { user, setAvatarSeed } = useAuth(); // Only destructuring setAvatarSeed

    const handleGenerateNewAvatar = async () => {
        const newSeed = Math.floor(Math.random() * 100000);
        try {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, { avatarSeed: newSeed }, { merge: true });
            // Update the avatarSeed in AuthContext
            setAvatarSeed(newSeed);
            console.log('Avatar seed updated successfully.');
        } catch (error) {
            console.error('Error updating avatar seed:', error);
        }
    };

    return (
        <div className="settings-avatar">
            <Avatar size={100} />
            <Button
                intent="primary"
                text="Generate New Avatar"
                onClick={handleGenerateNewAvatar}
                className="settings-avatar-btn"
            />
        </div>
    );
};

export default AvatarSettings;
