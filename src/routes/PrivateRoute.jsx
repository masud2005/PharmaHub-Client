import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <h1 className='text-5xl font-bold'>Loading...</h1>
    }

    if (user) {
        return children
    }

    return <Navigate to={'/sign-in'} state={location.pathname} />
};

export default PrivateRoute;