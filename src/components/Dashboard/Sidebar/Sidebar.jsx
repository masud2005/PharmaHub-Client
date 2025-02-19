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
                className={`z-10  flex flex-col justify-between overflow-x-hidden w-64 bg-teal-500 space-y-6 px-2 py-4 absolute inset-y-0 left-0  md:-left-0 transform ${isActive && '-translate-x-full sm:-left-0'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto'>
                            <Link to='/' className='flex items-center'>
                                <img
                                    className='w-14'
                                    src='https://i.ibb.co.com/SRbh4WY/Pharma-removebg-preview.png'
                                    alt='logo'
                                />
                                <h1 className="text-2xl -mt-2 font-bold bg-gradient-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">PharmaHub</h1>
                            </Link>
                        </div>
                    </div>

                    <div className='flex flex-col justify-between  flex-1 mt-6'>
                        <nav className='text-black'>
                            {role === 'Admin' && <AdminMenu />}
                            {role === 'Seller' && <SellerMenu />}
                            {role === 'User' && <UserMenu />}
                        </nav>
                        {/* <div>
                            <label onClick={toggleTheme} className="flex cursor-pointer gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5" />
                                    <path
                                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                </svg>
                                <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            </label>
                        </div> */}
                        <div>
                            <div className="divider"></div>
                            <div>
                                <li>
                                    <NavLink to="/dashboard/profile" className='text-black'> <CgProfile /> Profile</NavLink>
                                </li>
                                <li>
                                    <button onClick={handleLogOut} to="/" className='text-black'> <LuLogOut /> Log Out</button>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;