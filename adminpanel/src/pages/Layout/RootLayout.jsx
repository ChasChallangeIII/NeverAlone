// RootLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'


const RootLayout = () => {
    return (
        <div>
            <header>
                <Navbar /> 
            </header>
            <main>
                <Outlet />
            </main>

        </div>
    );
};

export default RootLayout;