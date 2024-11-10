// authContext.js
import { useContext, createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(); // Capitalize the context name

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}> {/* Use AuthContext here */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext); // Use AuthContext here
};
