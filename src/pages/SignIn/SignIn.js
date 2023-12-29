import React, { useState, useEffect } from 'react';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/authSlice';
import './SignIn.scss';

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const authUser = useSelector(selectAuthUser);
    const { isLoading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (authUser) {
            navigate('/profile');
        }
    }, [authUser, navigate]);

    function handleInputChange(e) {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    }

    function handleCheckboxChange(e) {
        setRememberMe(e.target.checked);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const userData = {
            email: credentials.username,
            password: credentials.password,
            rememberMe: rememberMe
        }
        dispatch(login(userData));
    };

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