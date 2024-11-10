// firebaseAuth.js
import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification
} from "firebase/auth";

// Register a new user and send a verification email
export const registerWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await sendEmailVerification(user); // Send email verification
        return user;
    } catch (error) {
        throw new Error(error.message || "Error registering user.");
    }
};

// Log in an existing user and check email verification
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (!user.emailVerified) {
            throw new Error("Please verify your email before logging in.");
        }
        return user;
    } catch (error) {
        throw new Error(error.message || "Error logging in user.");
    }
};

// Send a password reset email
export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return "Password reset email sent!";
    } catch (error) {
        throw new Error(error.message || "Error sending password reset email.");
    }
};
