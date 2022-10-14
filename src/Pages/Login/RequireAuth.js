import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default RequireAuth;