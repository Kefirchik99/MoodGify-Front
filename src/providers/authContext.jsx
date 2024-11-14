// authContext.js
import { useContext, createContext, useEffect, useState, useRef } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // NEW: Loading state
    const [autoLogoutMessage, setAutoLogoutMessage] = useState("");
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

    const inactivityTimeout = 15 * 60 * 1000;
    const logoutTimer = useRef(null); // Use useRef to persist between renders

    const resetTimer = () => {
        clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(handleAutoLogout, inactivityTimeout);
    };

    const handleAutoLogout = () => {
        signOut(auth);
        setUser(null);
        setAutoLogoutMessage("You were logged out due to inactivity.");
    };

    const logout = async () => {
        clearTimeout(logoutTimer.current);
        await signOut(auth);
        setUser(null);
        setAutoLogoutMessage("");
        setHasSeenWelcome(false);
    };

    const loginWithEmail = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setHasSeenWelcome(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // NEW: Set loading to false after auth state is determined
            if (currentUser) {
                resetTimer();
                window.addEventListener("mousemove", resetTimer);
                window.addEventListener("keypress", resetTimer);
            } else {
                clearTimeout(logoutTimer.current);
                window.removeEventListener("mousemove", resetTimer);
                window.removeEventListener("keypress", resetTimer);
            }
        });

        return () => {
            unsubscribe();
            clearTimeout(logoutTimer.current);
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keypress", resetTimer);
        };
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading, // NEW: Provide loading state
            loginWithEmail,
            logout,
            autoLogoutMessage,
            hasSeenWelcome,
            setHasSeenWelcome
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
