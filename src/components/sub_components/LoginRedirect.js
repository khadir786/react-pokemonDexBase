import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginRedirect = ({ children, isLoggedIn}) => {
    if (isLoggedIn) {
        return <Navigate to="/home" replace />;
      }
      return children;
};

export default LoginRedirect;
