import React from 'react';
import './Error.scss';
import { Link } from "react-router-dom";

// MainPage: Affiche la page d'erreur quand l'utilisateur recherche une page non trouvée
export default function Error() {
    return (
        <main className="error">
            <h1 className="error-title">404</h1>
            <p className="error-text">This page doesn't exist.</p>
            <Link to="/" className="error-link">Return to the home page.</Link>
        </main>
    )
}