// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; 

    return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
