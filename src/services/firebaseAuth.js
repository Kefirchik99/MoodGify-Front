import { auth } from './/../firebase';  // Import the auth instance from firebase.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

/**
 * Register a new user with email and password
 */
export const registerWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error.message;
    }
};

/**
 * Login user with email and password
 */
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error.message;
    }
};

/**
 * Log out the current user
 */
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error.message;
    }
};
