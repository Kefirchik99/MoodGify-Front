import { useContext, createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext();
const INACTIVITY_TIMEOUT = 20 * 60 * 1000; // 20 minutes

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [avatarSeed, setAvatarSeed] = useState(null);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
    let logoutTimer;

    const resetInactivityTimer = () => {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(handleAutoLogout, INACTIVITY_TIMEOUT);
        localStorage.setItem('lastActivity', Date.now());
    };

    const handleAutoLogout = async () => {
        await logout();
        alert('You have been logged out due to inactivity.');
    };

    useEffect(() => {
        const handleActivity = () => {
            resetInactivityTimer();
        };

        const handleBeforeUnload = (event) => {
            // Detect if the browser is being refreshed or closed
            sessionStorage.setItem('isRefreshing', 'true');
        };

        const handlePageLoad = () => {
            const isRefreshing = sessionStorage.getItem('isRefreshing');
            if (isRefreshing) {
                sessionStorage.removeItem('isRefreshing');
                // Prevent auto-logout on refresh
                return;
            }
            handleAutoLogout();
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keypress', handleActivity);
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('load', handlePageLoad);

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setAvatarSeed(userData.avatarSeed || currentUser.uid);
                        setUsername(userData.username || '');
                    } else {
                        setAvatarSeed(currentUser.uid);
                        setUsername('');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                    setAvatarSeed(currentUser.uid);
                    setUsername('');
                }
                resetInactivityTimer();
            } else {
                setUser(null);
                setAvatarSeed(null);
                setUsername(null);
            }
            setLoading(false);
        });

        return () => {
            clearTimeout(logoutTimer);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keypress', handleActivity);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('load', handlePageLoad);
            unsubscribe();
        };
    }, []);

    const loginWithEmail = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setHasSeenWelcome(false);
        } catch (error) {
            console.error('Error during login:', error.message);
            throw new Error('Failed to log in. Please check your credentials.');
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setHasSeenWelcome(false);
            setAvatarSeed(null);
            setUsername(null);
            clearTimeout(logoutTimer);
        } catch (error) {
            console.error('Error during logout:', error.message);
            throw new Error('Failed to log out.');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                avatarSeed,
                username,
                loginWithEmail,
                logout,
                hasSeenWelcome,
                setHasSeenWelcome,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
