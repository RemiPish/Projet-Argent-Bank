import React, { useState, useEffect } from 'react';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/authSlice';
import './SignIn.scss';

//SignIn: Gere le processus d'inscription d'utilisateur
export default function SignIn() {
    //hooks pour naviguer et dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //State pour stocker les info login d'utilisateur et l'option 'se souvenir de moi'
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);

    //redux state selector
    const authUser = useSelector(selectAuthUser);
    const { isLoading, error } = useSelector((state) => state.auth);

    //redirection vers la page profile si l'utilisateur est deja connecté
    useEffect(() => {
        if (authUser) {
            navigate('/profile');
        }
    }, [authUser, navigate]);

    //gere les changements dans les champs de login
    function handleInputChange(e) {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    }

    //gere le changement de l'option 'Se souvenir de moi'
    function handleCheckboxChange(e) {
        setRememberMe(e.target.checked);
    }

    //gere le processus d'inscription d'utilisateur
    const handleLogin = (e) => {
        e.preventDefault();
        const userData = {
            email: credentials.username,
            password: credentials.password,
            rememberMe: rememberMe
        }
        dispatch(login(userData));
    };

    //affiche la page de login
    return <main className="main bg-dark">
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"
                        value={credentials.username}
                        onChange={handleInputChange} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"
                        value={credentials.password}
                        onChange={handleInputChange} />
                </div>
                <div className="input-remember">
                    <input type="checkbox" name="remember-me"
                        checked={rememberMe}
                        onChange={handleCheckboxChange} />
                    <label htmlFor="remember-me">Remember me</label>

                </div>

                <button className="sign-in-button" disabled={isLoading}>
                    {isLoading && (
                        <div className="spinner-border spinner-border-sm"></div>
                    )}
                    <div>
                        Sign In
                    </div>

                </button>
                {error && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    </div>
                )}
            </form>

        </section>
    </main>
}