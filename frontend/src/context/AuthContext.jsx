// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/getCurrentUser', {
                    credentials: 'include'  // This is equivalent to axios's { withCredentials: true }
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Authentication error:', error);
            }
            setLoading(false);
        };

        verifyUser();
    }, []);

    // Logout function
    const logout = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/logout', {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Logout failed');
            setUser(null);  // Clear user state
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
