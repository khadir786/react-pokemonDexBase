import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn, setIsLoggedIn }) => {
    return isLoggedIn ? React.cloneElement(children, { isLoggedIn, setIsLoggedIn }) : <Navigate to="/login" />;
};

export default ProtectedRoute;
