import React from 'react';
import Navbar from '../components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <div className='sticky top-0 z-50 bg-teal-900/30 backdrop-blur-sm'>
                <Navbar />
            </div>
            <div className='min-h-[calc(100vh-531px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;