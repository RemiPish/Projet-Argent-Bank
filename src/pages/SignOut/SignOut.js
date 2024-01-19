import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

export default function SignOut() {
    //gere le log out de l'utilisateur et redirige vers la page d'accueil
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
