// authContext.jsx

import { useContext, createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {
    reauthenticate,
    changePassword,
    changeEmail,
    changeUserName,
} from '../services/firebaseAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [avatarSeed, setAvatarSeed] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

    // Fetch user data when authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // Fetch avatarSeed from Firestore
                try {
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setAvatarSeed(userData.avatarSeed || currentUser.uid);
                    } else {
                        // User document doesn't exist, set default avatarSeed
                        setAvatarSeed(currentUser.uid);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                    // Set default avatarSeed in case of error
                    setAvatarSeed(currentUser.uid);
                }
            } else {
                setUser(null);
                setAvatarSeed(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Log in the user
    const loginWithEmail = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setHasSeenWelcome(false);
            // AvatarSeed will be fetched by onAuthStateChanged
        } catch (error) {
            console.error('Error during login:', error.message);
            throw new Error('Failed to log in. Please check your credentials.');
        }
    };

    // Log out the user
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setHasSeenWelcome(false);
            setAvatarSeed(null);
        } catch (error) {
            console.error('Error during logout:', error.message);
            throw new Error('Failed to log out.');
        }
    };

    // Reauthenticate user
    const reauthenticateUser = async (currentPassword) => {
        try {
            await reauthenticate(currentPassword);
        } catch (error) {
            console.error('Error during reauthentication:', error.message);
            throw new Error(error.message || 'Failed to reauthenticate. Ensure the current password is correct.');
        }
    };

    // Update user password
    const updatePassword = async (currentPassword, newPassword) => {
        try {
            return await changePassword(currentPassword, newPassword);
        } catch (error) {
            console.error('Error updating password:', error.message);
            throw new Error(error.message || 'Failed to update password.');
        }
    };

    // Update user email
    const updateEmail = async (currentPassword, newEmail) => {
        try {
            return await changeEmail(currentPassword, newEmail);
        } catch (error) {
            console.error('Error updating email:', error.message);
            throw new Error(error.message || 'Failed to update email.');
        }
    };

    // Change user username
    const updateUserName = async (newUsername, currentUserName) => {
        try {
            await changeUserName(user.uid, newUsername, currentUserName);
        } catch (error) {
            console.error('Error changing username:', error.message);
            throw new Error(error.message || 'Failed to change username.');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                avatarSeed,
                setAvatarSeed, // Expose setAvatarSeed to update it when needed
                loginWithEmail,
                logout,
                reauthenticateUser,
                updatePassword,
                updateEmail,
                hasSeenWelcome,
                setHasSeenWelcome,
                updateUserName,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
