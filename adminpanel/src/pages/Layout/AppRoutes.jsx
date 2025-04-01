import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from '../../pages/Layout/RootLayout';
import Spinner from '../../components/Spinner/Spinner'

const Home = lazy(() => import('../Mainpages/Home'));
const Users = lazy(() => import('../Mainpages/Users'));
const Settings = lazy(() => import('../Mainpages/Settings'));
const Reports = lazy(() => import('../Mainpages/Reports'));
const Help = lazy(() => import('../Mainpages/Help'));
const Profile = lazy(() => import('../Mainpages/Profile'));
const NotFound = lazy(() => import('../Mainpages/NotFound'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<div> < Spinner /> </div>}>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path="users" element={<Users />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="help" element={<Help />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;