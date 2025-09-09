// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserFromToken, clearAuth } from '../../utils/user_utils.jsx'; // assume you already have this

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = getUserFromToken();
        setUser(userData);
    }, []);

    const handleLogout = () => {
        clearAuth(); // remove token from localStorage
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.brand}>HabitCoach</Link>

            <div style={styles.rightSection}>
                {user ? (
                    <>
                        <span style={styles.userInfo}>{user.name || user.email}</span>
                        <button style={styles.button} onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <button style={styles.button} onClick={() => navigate('/login')}>Login</button>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #ccc',
    },
    brand: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: '#333',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    userInfo: {
        fontSize: '0.95rem',
        color: '#555',
    },
    button: {
        padding: '0.5rem 1rem',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Navbar;