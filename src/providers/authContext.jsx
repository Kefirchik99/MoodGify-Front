// authContext.js
import { useContext, createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [autoLogoutMessage, setAutoLogoutMessage] = useState("");
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

    const inactivityTimeout = 15 * 60 * 1000;
    let logoutTimer;

    const resetTimer = () => {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(handleAutoLogout, inactivityTimeout);
    };

    const handleAutoLogout = () => {
        signOut(auth);
        setUser(null);
        setAutoLogoutMessage("You were logged out due to inactivity.");
    };

    const logout = async () => {
        clearTimeout(logoutTimer);
        await signOut(auth);
        setUser(null);
        setAutoLogoutMessage("");
        setHasSeenWelcome(false);
    };

    const loginWithEmail = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setHasSeenWelcome(false);
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                resetTimer();
                window.addEventListener("mousemove", resetTimer);
                window.addEventListener("keypress", resetTimer);
            } else {
                clearTimeout(logoutTimer);
                window.removeEventListener("mousemove", resetTimer);
                window.removeEventListener("keypress", resetTimer);
            }
        });

        return () => {
            unsubscribe();
            clearTimeout(logoutTimer);
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keypress", resetTimer);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, loginWithEmail, logout, autoLogoutMessage, hasSeenWelcome, setHasSeenWelcome }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
