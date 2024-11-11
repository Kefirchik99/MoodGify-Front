// firebaseAuth.js
import { auth, db } from '../firebase'; // Use the imported db from firebase.js
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification
} from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Filter } from 'bad-words';// Import Filter correctly

const filter = new Filter(); // Instantiate the profanity filter

// Check if the username is already taken
export const checkUsernameAvailability = async (username) => {
    const docRef = doc(db, "usernames", username);
    const docSnap = await getDoc(docRef);
    return !docSnap.exists(); // Returns true if the username is available
};

// Save the username to Firestore
export const saveUsername = async (uid, username) => {
    // Store the username in a collection for easy look-up and in the user's profile
    await setDoc(doc(db, "usernames", username), { uid });
    await setDoc(doc(db, "users", uid), { username }, { merge: true });
};

// Register a new user and save the username
export const registerWithEmail = async (email, password, username) => {
    if (filter.isProfane(username)) {
        throw new Error("Please choose a more appropriate username.");
    }

    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
        throw new Error("Username is already taken. Please choose another.");
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await sendEmailVerification(user);
        await saveUsername(user.uid, username); // Save the username
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
