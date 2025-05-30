import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaCog, FaChartBar, FaQuestionCircle, FaChevronDown, FaUser } from 'react-icons/fa'; 
import '../../components/Navbar/Navbar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={toggleSidebar} className="toggle-button">
                {isOpen ? 'Stäng' : 'Öppna'} Meny
            </button>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={closeSidebar}>✖</button>
                {isOpen && <h2 className="company-name">NeverAlone</h2>}
                <ul>
                    <li><Link to="/" onClick={closeSidebar}><FaHome /> Hem</Link></li>
                    <li><Link to="/users" onClick={closeSidebar}><FaUsers /> Statistik</Link></li>
                    <li><Link to="/reports" onClick={closeSidebar}><FaChartBar /> Rapporter</Link></li>
                    <li><Link to="/profile" onClick={closeSidebar}><FaUser /> Användardata</Link></li> 
                    <li><Link to="/settings" onClick={closeSidebar}><FaCog /> Inställningar</Link></li>
                    <li><Link to="/help" onClick={closeSidebar}><FaQuestionCircle /> Support</Link></li>
                </ul>
                {!isOpen && (
                    <div className="toggle-arrow" onClick={toggleSidebar}>
                        <FaChevronDown />
                    </div>
                )}
            </div>
            <div className={`sidebar-icons ${isOpen ? 'hidden' : ''}`}>
                <Link to="/" onClick={closeSidebar}><FaHome /></Link>
                <Link to="/users" onClick={closeSidebar}><FaUsers /></Link>
                <Link to="/reports" onClick={closeSidebar}><FaChartBar /></Link>
                <Link to="/profile" onClick={closeSidebar}><FaUser /></Link> 
                <Link to="/settings" onClick={closeSidebar}><FaCog /></Link>
                <Link to="/help" onClick={closeSidebar}><FaQuestionCircle /></Link>
            </div>
        </div>
    );
};

export default Sidebar;