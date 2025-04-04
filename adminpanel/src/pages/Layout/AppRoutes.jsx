import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from '../../pages/Layout/RootLayout';
import Spinner from '../../components/Spinner/Spinner';
import ProtectedRoute from '../../pages/Layout/ProtectedRoute';
import { useAuth } from '../../pages/AuthContext/AuthContext'

const Home = lazy(() => import('../Mainpages/Home'));
const Users = lazy(() => import('../Mainpages/Users'));
const Settings = lazy(() => import('../Mainpages/Settings'));
const Reports = lazy(() => import('../Mainpages/Reports'));
const Help = lazy(() => import('../Mainpages/Help'));
const Profile = lazy(() => import('../Mainpages/Profile'));
const NotFound = lazy(() => import('../Mainpages/NotFound'));
const Login = lazy(() => import('../Mainpages/Login'));

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Suspense fallback={<div><Spinner /></div>}>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                    <Route path="login" element={<Login />} />
                    <Route 
                        path="home" 
                        element={<ProtectedRoute><Home /></ProtectedRoute>} 
                    />
                    <Route 
                        path="users" 
                        element={<ProtectedRoute><Users /></ProtectedRoute>} 
                    />
                    <Route 
                        path="settings" 
                        element={<ProtectedRoute><Settings /></ProtectedRoute>} 
                    />
                    <Route 
                        path="reports" 
                        element={<ProtectedRoute><Reports /></ProtectedRoute>} 
                    />
                    <Route 
                        path="help" 
                        element={<ProtectedRoute><Help /></ProtectedRoute>} 
                    />
                    <Route 
                        path="profile" 
                        element={<ProtectedRoute><Profile /></ProtectedRoute>} 
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;