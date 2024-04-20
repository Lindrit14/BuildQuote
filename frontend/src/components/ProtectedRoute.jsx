// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element: Element }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        console.log("No user found, redirecting to login...");
        
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    console.log("User found, rendering element...");
    return Element;  
};

export default ProtectedRoute;
