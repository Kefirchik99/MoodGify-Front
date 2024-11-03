import { auth } from '../firebase'; // Import the initialized auth instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

// Function to register a new user
export const registerWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to log in an existing user
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to send password reset email
export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return "Password reset email sent!";
    } catch (error) {
        throw new Error(error.message);
    }
};
