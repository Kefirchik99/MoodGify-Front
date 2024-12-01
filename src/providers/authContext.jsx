import { useContext, createContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Ensure proper import paths
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { reauthenticate } from '../services/firebaseAuth'; // Ensure correct export from firebaseAuth.jsx

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
    };

    const handleAutoLogout = async () => {
        await logout();
        alert('You have been logged out due to inactivity.');
    };

    useEffect(() => {
        const handleActivity = resetInactivityTimer;

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const userData = (await getDoc(userDocRef)).data() || {};
                    setAvatarSeed(userData.avatarSeed || currentUser.uid);
                    setUsername(userData.username || '');
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
                resetInactivityTimer();
            } else {
                setUser(null);
                setAvatarSeed(null);
                setUsername(null);
            }
            setLoading(false);
        });

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keypress', handleActivity);

        return () => {
            clearTimeout(logoutTimer);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keypress', handleActivity);
            unsubscribe();
        };
    }, []);

    const loginWithEmail = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setHasSeenWelcome(false);
        } catch (error) {
            console.error('Login error:', error.message);
            throw new Error('Failed to log in. Please check your credentials.');
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            clearTimeout(logoutTimer);
        } catch (error) {
            console.error('Logout error:', error.message);
            throw new Error('Failed to log out.');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                avatarSeed,
                setAvatarSeed,
                username,
                loginWithEmail,
                logout,
                reauthenticateUser: reauthenticate, // Pass reauthenticate function
                hasSeenWelcome,
                setHasSeenWelcome,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
