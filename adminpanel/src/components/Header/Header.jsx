import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaBell } from 'react-icons/fa';
import '../../components/Header/Header.css';

const Header = () => {
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
            </div>
        </div>
    );
}

export default Header;