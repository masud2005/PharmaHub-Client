import React, { useEffect, useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import AdminMenu from '../Menu/AdminMenu';
import SellerMenu from '../Menu/SellerMenu';
import UserMenu from '../Menu/UserMenu';
import useRole from '../../../hooks/useRole';
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const Sidebar = () => {
    const [isActive, setActive] = useState(true);
    const [role] = useRole();
    const { signOutUser } = useAuth();
    // const userRole = role.role;
    // const [isDarkMode, setIsDarkMode] = useState(false);

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    const handleLogOut = () => {
        // console.log('Logout');
        signOutUser()
            .then(() => {
                toast.success('Logged out successfully. See you soon!')
            })
            .catch(error => {
                toast.error('Something went wrong. Please try again.')
            })
    };

    // // Theme Loaded localStorage 
    // useEffect(() => {
    //     const savedTheme = localStorage.getItem('theme');
    //     if (savedTheme === 'dark') {
    //         setIsDarkMode(true);
    //         document.documentElement.setAttribute('data-theme', 'dark');
    //     } else {
    //         setIsDarkMode(false);
    //         document.documentElement.setAttribute('data-theme', 'light');
    //     }
    // }, []);

    // // Theme Changes
    // const toggleTheme = () => {
    //     const newTheme = !isDarkMode ? 'dark' : 'light';
    //     setIsDarkMode(!isDarkMode);
    //     document.documentElement.setAttribute('data-theme', newTheme);
    //     localStorage.setItem('theme', newTheme);
    // };

    return (
        <div>
            {/* Small Screen Navbar */}
            <div className='bg-teal-200 text-gray-800 flex fixed left-0 right-0 z-10 justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-2 font-bold'>
                        <Link to='/' className='flex items-center'>
                            <img
                                className='w-14'
                                src='https://i.ibb.co.com/SRbh4WY/Pharma-removebg-preview.png'
                                alt='logo'
                            />
                            <h1 className="text-3xl -mt-2 font-bold bg-gradient-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">PharmaHub</h1>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-teal-500'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 flex flex-col justify-between overflow-x-hidden w-64 bg-teal-500 px-2 py-4 absolute inset-y-0 left-0 md:-left-0 transform ${isActive ? '-translate-x-full sm:-left-0' : ''} md:translate-x-0 transition duration-200 ease-in-out`}
            >
                {/* Top Part: Logo + Menus */}
                <div>
                    {/* Logo */}
                    <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto'>
                        <Link to='/' className='flex items-center'>
                            <img
                                className='w-14'
                                src='https://i.ibb.co.com/SRbh4WY/Pharma-removebg-preview.png'
                                alt='logo'
                            />
                            <h1 className="text-2xl -mt-2 font-bold bg-gradient-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">
                                PharmaHub
                            </h1>
                        </Link>
                    </div>

                    {/* Menu Items */}
                    <div className='mt-6'>
                        <nav className='text-black'>
                            {role === 'Admin' && <AdminMenu />}
                            {role === 'Seller' && <SellerMenu />}
                            {role === 'User' && <UserMenu />}
                        </nav>
                    </div>
                </div>

                {/* Bottom Part: Profile + Logout */}
                <div className='pb-4'>
                    <div className="divider"></div>
                    <ul className="space-y-2 text-black px-2">
                        <li>
                            <NavLink to="/dashboard/profile" className='flex items-center gap-2'>
                                <CgProfile /> Profile
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogOut} className='flex items-center gap-2'>
                                <LuLogOut /> Log Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;