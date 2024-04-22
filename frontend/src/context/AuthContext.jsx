// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/getCurrentUser', {
                    credentials: 'include',  // cookies are sent
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log("Fetch status:", response.status);
                console.log("Fetch headers:", JSON.stringify(response.headers));
                console.log("Auth Check Response:", data);  
                if (response.ok) {
                    setUser(data);  // Sets the user data if response is OK
                } else {
                    console.log("Setting user to null due to non-OK response");
                    setUser(null);  // Sets user to null if response is not OK
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser(null);
            }
        };

        verifyUser();
    }, []);

    console.log("Here is the user from AuthContext: ",user)
    console.log("here is useAuth():", useAuth())

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {console.log("Here is the user from AuthContext: ",user)}
            {console.log("here is useAuth():", useAuth())}

            {children}
        </AuthContext.Provider>
    );
};
