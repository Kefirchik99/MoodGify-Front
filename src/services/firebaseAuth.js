// Import the initialized auth instance from firebase.js
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";

// Function to register a new user
export const registerWithEmail = async (email, password) => {
    try {
        // Register the user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);
        console.log("Verification email sent!");

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to log in an existing user
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if the email is verified
        if (!user.emailVerified) {
            throw new Error("Please verify your email before logging in.");
        }

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to send a password reset email
export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return "Password reset email sent!";
    } catch (error) {
        throw new Error(error.message);
    }
};
