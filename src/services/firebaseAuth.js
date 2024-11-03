import { auth } from '../firebase'; // Import the initialized auth instance
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


const auth = getAuth();
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Function to log in an existing user and check if their email is verified
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


// Function to send password reset email
export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return "Password reset email sent!";
    } catch (error) {
        throw new Error(error.message);
    }
};

