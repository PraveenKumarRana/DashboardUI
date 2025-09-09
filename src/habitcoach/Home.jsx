import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        if (!token) return;
        axios.get('http://localhost:8080/api/me', {
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-App-Id": "HABIT_COACH"
            }
        }).then(res => {
            setUser(res.data);
        }).catch(err => {
            console.error('Failed to fetch user:', err);
        });
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        window.location.href = '/';
    };

    return (
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
            <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
        </div>
    );
};

export default Home;