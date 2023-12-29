import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { selectAuthUser } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, selectUser, updateProfile } from '../../redux/userSlice';
import authService from "./../../services/auth.service"

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUser = useSelector(selectAuthUser);
    const user = useSelector(selectUser);

    const [editInfo, setEditInfo] = useState(false);
    const [firstName, setFirstName] = useState(user ? user.firstName : '');
    const [lastName, setLastName] = useState(user ? user.lastName : '');
    const [error, setError] = useState('');

    const [accounts, setAccounts] = useState([]);



    useEffect(() => {

        if (!authUser) {
            navigate('/');
            return;
        }
        const fetchData = async () => {
            try {
                const accountsData = await authService.fetchAccounts();
                setAccounts(accountsData);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };
        if (authUser && !user) {
            const token = authUser.body.token;
            dispatch(fetchUserProfile(token)).then((actionResult) => {
                if (fetchUserProfile.fulfilled.match(actionResult)) {
                    const fetchedUser = actionResult.payload;
                    setFirstName(fetchedUser.firstName);
                    setLastName(fetchedUser.lastName);
                }
            });
        }

        fetchData();
    }, [authUser, user, dispatch, navigate]);

    const handleEditSave = async (e) => {
        e.preventDefault();

        if (firstName.length < 2 || lastName.length < 2) {
            setError('First name and last name must have at least 2 characters');
            return;
        }

        if (firstName === user.firstName && lastName === user.lastName) {
            setError('Please change at least one of the names');
            return;
        }

        try {
            const token = authUser.body.token;
            const updatedUser = {
                token,
                firstName,
                lastName
            };

            const updatedResponse = await dispatch(updateProfile(updatedUser)).unwrap();
            
            setFirstName(updatedResponse.body.firstName);
            setLastName(updatedResponse.body.lastName);

            if (localStorage.getItem("authUser")) {
                localStorage.setItem("userDetails", JSON.stringify(updatedResponse.body));
            } else {
                sessionStorage.setItem("userDetails", JSON.stringify(updatedResponse.body));
            }

            setEditInfo(false);
            setError('');
        } catch (error) {
            setError('Failed to update profile. Please try again.');
        }
    };

    const handleCancel = (e) => {
        e.preventDefault()
        setError("");
        setEditInfo(false);
    }
    return (
        <main className="main bg-dark">
            <div className="header">
                {user && editInfo && (
                    <div>
                        <h1 className="title">Welcome back</h1>
                        <div className="edit-container">
                            <form id="edit">
                                <div className="input-container">
                                    <input type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <input type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <p className="error">{error}</p>
                                <div className="btn-container">
                                    <button className="btn" onClick={handleEditSave}>
                                        Save</button>
                                    <button className="btn" onClick={handleCancel}>
                                        Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>


                )}
                {user && !editInfo && (
                    <div><h1>
                        Welcome back
                        <br />
                        {user.firstName} {user.lastName}!
                    </h1>
                        <button className="edit-button" onClick={() => setEditInfo(true)}>Edit Name</button></div>

                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            {accounts.map((account, index) => (
                <section key={index} className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{account.title} ({account.accountNumber})</h3>
                        <p className="account-amount">{account.balance}</p>
                        <p className="account-amount-description">{account.type}</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            ))}
        </main >
    );
}
