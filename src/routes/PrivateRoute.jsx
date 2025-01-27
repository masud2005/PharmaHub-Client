import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />
    }

    if (user) {
        return children
    }

    return <Navigate to={'/sign-in'} state={location.pathname} />
};

export default PrivateRoute;