import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaBell } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import '../../components/Header/Header.css';
import { useSelector } from 'react-redux';

const Header = () => {
    const { logout } = useAuth(); 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };

    const reports = useSelector(state => state.reports.items);
    const unreadCount = reports.filter(r => r.status !== 'handled').length;

    return (
        <div className="header">
            <div className="header-icons">
            <div className="notification-wrapper">
                <Link to="/reports">
                    <FaBell className="notification-icon" />
                </Link>
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                )}
            </div>
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