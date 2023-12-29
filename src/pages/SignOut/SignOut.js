import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

export default function SignOut() {
    const navigate = useNavigate();
    useEffect(() => {

        authService.logout();
        navigate('/');
        window.location.reload();
    }, [navigate]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};
