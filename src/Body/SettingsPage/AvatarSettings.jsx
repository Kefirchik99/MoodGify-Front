import React, { useState, useEffect } from 'react';
import { Button } from '@blueprintjs/core';
import Avatar from '../Avatar';
import { useAuth } from '../../providers/authContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AvatarSettings = () => {
    const { user } = useAuth();
    const [avatarSeed, setAvatarSeed] = useState(0);

    useEffect(() => {
        const fetchAvatarSeed = async () => {
            const userDocRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setAvatarSeed(userData.avatarSeed || 0);
            } else {
                console.log('User document does not exist');
            }
        };

        fetchAvatarSeed();
    }, [user]);

    const handleGenerateNewAvatar = async () => {
        const newSeed = Math.floor(Math.random() * 100000);
        setAvatarSeed(newSeed);

        try {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, { avatarSeed: newSeed }, { merge: true });
            console.log('Avatar seed updated successfully.');
        } catch (error) {
            console.error('Error updating avatar seed:', error);
        }
    };

    return (
        <div className="settings-avatar">
            <Avatar value={avatarSeed} size={100} />
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
