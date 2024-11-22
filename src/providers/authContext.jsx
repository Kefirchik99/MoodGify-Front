// authContext.jsx

import React, { useContext, createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateProfile,
    updateEmail as firebaseUpdateEmail,
    updatePassword as firebaseUpdatePassword,
} from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [avatarSeed, setAvatarSeed] = useState(null);
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

    // Fetch user data when user logs in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDocRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUsername(userData.username || '');
                    setAvatarSeed(userData.avatarSeed || currentUser.uid);
                }
                setHasSeenWelcome(false); // Reset hasSeenWelcome upon login
            } else {
                setUser(null);
                setUsername('');
                setAvatarSeed(null);
                setHasSeenWelcome(false); // Reset hasSeenWelcome upon logout
            }
        });

        return () => unsubscribe();
    }, []);

    // **Add the loginWithEmail function**
    const loginWithEmail = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged will handle setting user and fetching data
        } catch (error) {
            console.error('Error during login:', error.message);
            throw new Error('Failed to log in. Please check your credentials.');
        }
    };

    // **Add the logout function**
    const logout = async () => {
        try {
            await signOut(auth);
            // onAuthStateChanged will handle resetting user state
        } catch (error) {
            console.error('Error during logout:', error.message);
            throw new Error('Failed to log out.');
        }
    };

    // Reauthenticate user
    const reauthenticateUser = async (currentPassword) => {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
    };

    // Update username
    const updateUserName = async (newUsername) => {
        await updateProfile(user, { displayName: newUsername });
        // Update username in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { username: newUsername });

        // Update username in context
        setUsername(newUsername);
    };

    // Update email
    const updateEmail = async (currentPassword, newEmail) => {
        await reauthenticateUser(currentPassword);
        await firebaseUpdateEmail(user, newEmail);
    };

    // Update password
    const updatePassword = async (currentPassword, newPassword) => {
        await reauthenticateUser(currentPassword);
        await firebaseUpdatePassword(user, newPassword);
    };

    // Update avatar seed
    const updateAvatarSeed = async (newAvatarSeed) => {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { avatarSeed: newAvatarSeed }, { merge: true });

        // Update avatar seed in context
        setAvatarSeed(newAvatarSeed);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                username,
                avatarSeed,
                hasSeenWelcome,
                setHasSeenWelcome,
                loginWithEmail,
                logout,
                reauthenticateUser,
                updateUserName,
                updateEmail,
                updatePassword,
                updateAvatarSeed,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
