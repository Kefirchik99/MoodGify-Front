// WelcomePage.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers/authContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure db is imported correctly
import { Link } from 'react-router-dom';

const WelcomePage = ({ onSeen }) => {
    const { user } = useAuth();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsername = async () => {
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDoc);
                if (docSnap.exists()) {
                    setUsername(docSnap.data().username || 'User');
                }
            }
            setLoading(false); // Stop loading after username is fetched
        };

        fetchUsername();
        onSeen();
    }, [user, onSeen]);

    if (loading) {
        return <p>Loading...</p>; // Optionally show a loading indicator
    }

    return (
        <div className="welcome-page">
            <h1>Welcome, {username}!</h1>
            <p>We’re glad to have you back.</p>
            <Link to="/profile">Go to Profile</Link>
        </div>
    );
};

export default WelcomePage;
