// firebaseAuth.js

import { auth, db } from '../firebase';
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    updateEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Filter } from 'bad-words';

const filter = new Filter();

// Check if the username is already taken
export const checkUsernameAvailability = async (username) => {
    const docRef = doc(db, 'usernames', username);
    const docSnap = await getDoc(docRef);
    return !docSnap.exists();
};

// Save the username to Firestore
export const saveUsername = async (uid, username) => {
    await setDoc(doc(db, 'usernames', username), { uid });
    await setDoc(doc(db, 'users', uid), { username }, { merge: true });
};

// Register a new user and save the username
export const registerWithEmail = async (email, password, username) => {
    if (filter.isProfane(username)) {
        throw new Error('Please choose a more appropriate username.');
    }

    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
        throw new Error('Username is already taken. Please choose another.');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);
    await saveUsername(user.uid, username);
    return user;
};

// Send a password reset email
export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return 'Password reset email sent!';
    } catch (error) {
        console.error('Error sending password reset email:', error.message);
        throw new Error('Failed to send password reset email.');
    }
};

// Reauthenticate the user
export const reauthenticate = async (currentPassword) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('No user is currently signed in.');
    }
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    try {
        await reauthenticateWithCredential(user, credential);
    } catch (error) {
        console.error('Reauthentication failed:', error.message);
        throw new Error('Incorrect current password. Please try again.');
    }
};

// Change user password
export const changePassword = async (currentPassword, newPassword) => {
    await reauthenticate(currentPassword);
    try {
        await updatePassword(auth.currentUser, newPassword);
        return 'Password updated successfully!';
    } catch (error) {
        console.error('Failed to update password:', error.message);
        throw new Error('Failed to update password.');
    }
};

// Change user email
export const changeEmail = async (currentPassword, newEmail) => {
    await reauthenticate(currentPassword);
    try {
        await updateEmail(auth.currentUser, newEmail);
        return 'Email updated successfully!';
    } catch (error) {
        console.error('Failed to update email:', error.message);
        throw new Error('Failed to update email.');
    }
};

// **Add the changeUserName function here**
export const changeUserName = async (uid, newUsername, currentUserName) => {
    try {
        // Check for profanity
        if (filter.isProfane(newUsername)) {
            throw new Error('Please choose a more appropriate username.');
        }

        // Check if the new username is available
        const isAvailable = await checkUsernameAvailability(newUsername);
        if (!isAvailable) {
            throw new Error('Username is already taken. Please choose another.');
        }

        // Update the username in the 'users' collection
        await setDoc(doc(db, 'users', uid), { username: newUsername }, { merge: true });

        // Update the 'usernames' collection
        if (currentUserName) {
            const oldUsernameDocRef = doc(db, 'usernames', currentUserName);
            await deleteDoc(oldUsernameDocRef);
        }
        await setDoc(doc(db, 'usernames', newUsername), { uid });
    } catch (error) {
        console.error('Error changing username:', error.message);
        throw new Error(error.message || 'Failed to change username.');
    }
};
