import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './pages/Layout/AppRoutes';
import { AuthProvider } from './pages/AuthContext/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/store'

const App = () => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    );
};

export default App;
