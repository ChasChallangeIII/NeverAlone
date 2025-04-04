import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaBell } from 'react-icons/fa';
import { useAuth } from '../../pages/AuthContext/AuthContext'; // Importera useAuth
import '../../components/Header/Header.css';

const Header = () => {
    const { logout } = useAuth(); // Hämta logout-funktionen
    const navigate = useNavigate(); // För att navigera efter utloggning

    const handleLogout = () => {
        logout(); // Anropa logout-funktionen
        navigate('/login'); // Omdirigera till inloggningssidan
    };

    return (
        <div className="header">
            <div className="header-icons">
                <FaBell className="notification-icon" />
                <Link to="/profile" className="profile-container"> 
                    <img 
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" 
                        alt="Profile"
                        className="profile-image"
                    />
                </Link>
                <button onClick={handleLogout} className="logout-button">
                    Logga ut
                </button>
            </div>
        </div>
    );
}

export default Header;