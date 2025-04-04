import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header'; 
import { useAuth } from '../../pages/AuthContext/AuthContext';

const RootLayout = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div>
            {isAuthenticated && (
                <header>
                    <Header /> 
                    <Navbar />
                </header>
            )}
            <main>
                <Outlet />
            </main>
            {isAuthenticated && <Footer />}
        </div>
    );
};

export default RootLayout;