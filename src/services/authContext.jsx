// authContext.js
import { useContext, createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [autoLogoutMessage, setAutoLogoutMessage] = useState("");

    const inactivityTimeout = 15 * 60 * 1000;
    let logoutTimer;

    const resetTimer = () => {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(() => {
            handleAutoLogout();
        }, inactivityTimeout);
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
    };

    const loginWithEmail = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user); // Update user state on successful login
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
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
        <AuthContext.Provider value={{ user, loginWithEmail, logout, autoLogoutMessage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
