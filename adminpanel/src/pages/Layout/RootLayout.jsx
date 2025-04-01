import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header'; 

const RootLayout = () => {
    return (
        <div>
            <header>
                <Header /> 
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;