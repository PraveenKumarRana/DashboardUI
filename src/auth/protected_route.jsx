import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    console.log('ProtectedRoute children: ', children);
    const token = localStorage.getItem('bl_jwt');
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;