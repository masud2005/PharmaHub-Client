
import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown, IoMdClose, IoMdMenu } from 'react-icons/io';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { FaCartPlus } from 'react-icons/fa6';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const languageDropdownRef = useRef(null);

    // Theme Loaded localStorage 
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    // Theme Changes
    const toggleTheme = () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Toggle profile dropdown
    const toggleProfileDropdown = () => {
        setProfileOpen(!profileOpen);
    };

    const handleLogOut = () => {
        // console.log('Logout');
        signOutUser()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out Successfully!',
                    text: 'You have been logged out. See you soon!',
                    customClass: {
                        confirmButton: 'bg-teal-500 text-white'
                    }
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Failed',
                    text: `Something went wrong: ${error.code}. Please try again.`,
                    customClass: {
                        confirmButton: 'bg-red-500 text-white'
                    }
                });
            })
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="h-[90px] place-content-center border-b">
                <div className="container mx-auto flex justify-between items-center  py-4 px-2">
                    {/* Left Section: Logo */}
                    <div className="flex -ml-1 xl:-ml-2">
                        <img className='w-12' src="https://i.ibb.co.com/SRbh4WY/Pharma-removebg-preview.png" alt="Logo..." />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">PharmaHub</h1>
                    </div>

                    <div className='flex  gap-6'>
                        {/* Center Section: Navigation Links */}
                        <div className="hidden lg:flex items-center justify-end gap-6 uppercase">
                            <NavLink to="/" className={({ isActive }) => isActive ? 'font-semibold border-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-50' : 'font-medium hover:text-teal-600'}>Home</NavLink>
                            <NavLink to="/shop" className={({ isActive }) => isActive ? 'font-semibold border-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-50' : 'font-medium hover:text-teal-600'}>Shop</NavLink>
                            <NavLink to="/cart" className={({ isActive }) => isActive ? 'font-semibold border-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-50' : 'font-medium hover:text-teal-600'}><FaCartPlus size={24} /></NavLink>

                            <div ref={languageDropdownRef} className="relative">
                                <button onClick={() => setLanguageOpen(!languageOpen)} className="uppercase font-medium hover:text-teal-600 flex items-center">Languages <IoIosArrowDown size={22} /> </button>
                                {languageOpen && (
                                    <div className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg">
                                        <ul className="py-2">
                                            <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">English</li>
                                            <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">Spanish</li>
                                            <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">French</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Section: Login/Register Buttons */}
                        <div className="hidden lg:flex gap-3 items-center uppercase">
                            {
                                user ? <div className="flex items-center gap-3">
                                    <div className='relative'>
                                        <img onClick={toggleProfileDropdown} data-tooltip-id="my-tooltip-1" className="rounded-full w-12 h-12 border border-teal-600 shadow-md transition-transform transform hover:scale-110" src={user?.photoURL || 'https://img.icons8.com/?size=48&id=z-JBA_KtSkxG&format=png'} alt="" />
                                        {profileOpen && (
                                            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
                                                <ul className="p-3 text-nowrap space-y-3 text-center">
                                                    <li>
                                                        <NavLink to={'/update-profile'} className={({ isActive }) => isActive ? 'font-semibold border-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-50' : 'font-medium hover:text-teal-600'}>Update Profile</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? 'font-semibold border-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-50' : 'font-medium hover:text-teal-600'}>Dashboard</NavLink>
                                                    </li>
                                                    <button onClick={handleLogOut} className="px-3 py-2 border-teal-600 bg-teal-600 hover:bg-teal-500 text-white transition-colors duration-500 text-base uppercase font-medium w-full">Log Out</button>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div> :
                                    <div className='flex gap-6 items-center'>
                                        <NavLink to="/sign-up" className={({ isActive }) => isActive ? 'font-semibold border-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-50' : 'font-medium hover:text-teal-600'}>Join Us</NavLink>
                                        {/* <NavLink to="/register" className={({ isActive }) => isActive ? 'font-semibold border-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-50' : 'font-medium hover:text-teal-600'}>Register</NavLink> */}
                                    </div>
                            }
                            <button
                                onClick={toggleTheme}
                                className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 shadow-md transition-transform transform hover:scale-110`}
                            >
                                {isDarkMode ? (
                                    <MdOutlineLightMode size={24} />
                                ) : (
                                    <MdOutlineDarkMode size={24} />
                                )}
                            </button>
                        </div>

                    </div>
                    {/* Hamburger Menu for Mobile */}
                    <div onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden bg-teal-600 p-2 text-white rounded text-2xl cursor-pointer">
                        {menuOpen ? <IoMdClose /> : <IoMdMenu />}
                    </div>
                </div>


                {/* Mobile Menu */}
                <button
                    onClick={toggleTheme}
                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 shadow-md transition-transform transform hover:scale-110 absolute top-6 right-14 lg:hidden`}
                >
                    {isDarkMode ? (
                        <MdOutlineLightMode size={24} />
                    ) : (
                        <MdOutlineDarkMode size={24} />
                    )}
                </button>
                <div className={`${menuOpen ? 'left-0' : '-left-[100%]'} absolute duration-500 w-full bg-gray-50/95 uppercase`}>
                    <div className={`flex-col lg:hidden gap-4 py-4 px-4 space-y-1 font-medium`}>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-teal-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/shop" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-teal-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Shop</NavLink>
                        <NavLink to="/cart" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-teal-600 text-teal-600 mt-2 pb-1' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}><FaCartPlus size={24} /></NavLink>

                        <div ref={languageDropdownRef} className="relative pb-3">
                            <button onClick={() => setLanguageOpen(!languageOpen)} className="uppercase font-medium hover:text-teal-600 flex items-center">Languages <IoIosArrowDown size={22} /></button>
                            {languageOpen && (
                                <div className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg">
                                    <ul className="py-2">
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">English</li>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">Bengali</li>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">French</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className='flex gap-10 justify-around pt-5 mt-4 border-t-2'>
                            {
                                user ? <div className="flex items-center gap-3">
                                    <div className='relative'>
                                        <img onClick={toggleProfileDropdown} data-tooltip-id="my-tooltip-1" className="rounded-full w-12 h-12 border border-teal-600 shadow-md transition-transform transform hover:scale-110" src={user?.photoURL || 'https://img.icons8.com/?size=48&id=z-JBA_KtSkxG&format=png'} alt="" />
                                        {profileOpen && (
                                            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
                                                <ul className="p-3 text-nowrap space-y-3 text-center">
                                                    <li>
                                                        <NavLink to={'/update-profile'} className={({ isActive }) => isActive ? 'font-semibold border-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-50' : 'font-medium hover:text-teal-600'}>Update Profile</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? 'font-semibold border-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-50' : 'font-medium hover:text-teal-600'}>Dashboard</NavLink>
                                                    </li>
                                                    <button onClick={handleLogOut} className="px-3 py-2 border-teal-600 bg-teal-600 hover:bg-teal-500 text-white transition-colors duration-500 text-base uppercase font-medium w-full">Log Out</button>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div> :
                                    <div className='flex gap-10'>
                                        <NavLink to="/sign-up" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-2 rounded border-teal-600 text-teal-600 px-3 py-1' : 'block text-base hover:text-teal-600'} onClick={() => setMenuOpen(false)}>Join Us</NavLink>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;