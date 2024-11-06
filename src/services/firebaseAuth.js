// Import Firebase authentication functions
import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    onAuthStateChanged
} from "firebase/auth";
import { useEffect, useState } from 'react';

// Register a new user and send an email verification
export const registerWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        console.log("Verification email sent!");

        return user;
    } catch (error) {
        console.error("Error during registration:", error);
        throw new Error(error.message);
    }
};

// Log in an existing user, checking email verification status
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            throw new Error("Please verify your email before logging in.");
        }

        return user;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error(error.message);
    }
};

// Send a password reset email
export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent!");
        return "Password reset email sent!";
    } catch (error) {
        console.error("Password reset error:", error);
        throw new Error(error.message);
    }
};

// Custom hook to provide the current authenticated user
// Custom hook to provide the current authenticated user
export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return { user };
};
