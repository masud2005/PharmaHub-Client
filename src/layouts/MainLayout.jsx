import React from 'react';
import Navbar from '../components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='min-h-[calc(100vh-483px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;