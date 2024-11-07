import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { useEffect, useState, useContext, createContext } from 'react';

// Create Auth context
const AuthContext = createContext();

// Custom hook to access Auth context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to manage global user state and provide auth functions
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Subscribe to auth state changes and set loading state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Logout function
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {!loading && children} {/* Only render children when not loading */}
        </AuthContext.Provider>
    );
};

// Registration function with email verification
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

// Login function with email verification check
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

// Password reset function
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
