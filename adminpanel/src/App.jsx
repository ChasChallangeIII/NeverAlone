import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './pages/Layout/AppRoutes'
import { AuthProvider } from './pages/AuthContext/AuthContext'

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;