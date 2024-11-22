// WelcomePage.jsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers/authContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, Navigate } from 'react-router-dom';

const WelcomePage = () => {
    const { user, setHasSeenWelcome } = useAuth();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchUsername = async () => {
            const userDoc = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userDoc);
            if (docSnap.exists()) {
                setUsername(docSnap.data().username || 'User');
            }
            setLoading(false);
            setHasSeenWelcome(true); // Mark welcome as seen after fetching data
        };

        fetchUsername();
    }, [user, setHasSeenWelcome]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="welcome-page">
            <h1>Welcome, {username}!</h1>
            <p>We’re glad to have you back.</p>
            <Link to="/profile">
                Go to Profile
            </Link>
        </div>
    );
};

export default WelcomePage;
