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
    changeUserName, // Import changeUserName
} from '../services/firebaseAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

    // Log out the user
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setHasSeenWelcome(false);
        } catch (error) {
            console.error('Error during logout:', error.message);
            throw new Error('Failed to log out.');
        }
    };

    // Log in the user
    const loginWithEmail = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setHasSeenWelcome(false);
        } catch (error) {
            console.error('Error during login:', error.message);
            throw new Error('Failed to log in. Please check your credentials.');
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

    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginWithEmail,
                logout,
                reauthenticateUser,
                updatePassword,
                updateEmail,
                hasSeenWelcome,
                setHasSeenWelcome,
                updateUserName, // Provide updateUserName in context
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
