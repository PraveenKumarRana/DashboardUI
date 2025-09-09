import React, {Fragment, useEffect, useState} from 'react';
import {getUserFromToken, userLoggedIn} from '../../utils/user_utils.jsx'
import {JWT_TOKEN_KEY} from "../../config.js";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/navbar.jsx";

const Home = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;

        setUser(getUserFromToken());
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem(JWT_TOKEN_KEY);
        window.location.href = '/';
    };

    useEffect(() => {
        console.log("isLoggedIn: ", userLoggedIn());
        if (!userLoggedIn()) {
            navigate('/login');
        }
    }, [userLoggedIn()]);

    return (
        <Fragment>
            <Navbar />
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>👋 Welcome to HabitCoach</h1>

                {user ? (
                    <>
                        <p>Logged in as: <strong>{user.name || user.email}</strong></p>
                        <p>User ID: {user.id}</p>
                    </>
                ) : (
                    <p>Loading user info...</p>
                )}

                <button onClick={handleLogout} style={{ marginTop: '20px' }}>
                    Logout
                </button>
            </div>
        </Fragment>
    );
};

export default Home;