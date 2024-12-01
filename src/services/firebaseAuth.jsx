import { auth, db } from '../firebase'; // Import Firestore and Auth instances
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Filter } from 'bad-words';

// Initialize bad-words filter
const filter = new Filter();

/**
 * Check if a username is available.
 * @param {string} username
 * @returns {Promise<boolean>} True if username is available, otherwise false.
 */
export const checkUsernameAvailability = async (username) => {
    const docRef = doc(db, 'usernames', username);
    const docSnap = await getDoc(docRef);
    return !docSnap.exists();
};

/**
 * Save a username to Firestore.
 * @param {string} uid - User ID.
 * @param {string} username - Chosen username.
 */
export const saveUsername = async (uid, username) => {
    // Save the username and link it to the user's UID
    await setDoc(doc(db, 'usernames', username), { uid });
    // Merge the username into the user's Firestore document
    await setDoc(doc(db, 'users', uid), { username }, { merge: true });
};

/**
 * Register a user with email, password, and username.
 * @param {string} email
 * @param {string} password
 * @param {string} username
 * @returns {Promise<object>} The created user object.
 */
export const registerWithEmail = async (email, password, username) => {
    try {
        if (filter.isProfane(username)) {
            throw new Error('Please choose a more appropriate username.');
        }

        const isAvailable = await checkUsernameAvailability(username);
        if (!isAvailable) {
            throw new Error('Username is already taken. Please choose another.');
        }

        // Create the user and send email verification
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        // Save the username to Firestore
        await saveUsername(user.uid, username);

        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * Reauthenticate a user with their current password.
 * @param {string} currentPassword
 */
export const reauthenticate = async (currentPassword) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('No user is currently signed in.');
    }
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    try {
        await reauthenticateWithCredential(user, credential);
    } catch (error) {
        throw new Error('Incorrect current password. Please try again.');
    }
};

/**
 * Send a password reset email.
 * @param {string} email
 * @returns {Promise<string>} Confirmation message.
 */
export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return 'Password reset email sent!';
    } catch (error) {
        throw new Error('Failed to send password reset email.');
    }
};
