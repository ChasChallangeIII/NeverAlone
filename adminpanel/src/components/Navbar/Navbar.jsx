import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Hem</Link></li>
                <li><Link to="/users">Användare</Link></li>
                <li><Link to="/settings">Inställningar</Link></li>
                <li><Link to="/reports">Rapporter</Link></li>
                <li><Link to="/help">Hjälp</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;