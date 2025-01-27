
import React, { useRef, useState } from 'react';
import { FaBars, FaCartPlus } from 'react-icons/fa6';
import { IoIosArrowDown, IoMdClose, IoMdMenu } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const languageDropdownRef = useRef(null);
    const [cart] = useCart()
    // console.log(cart);


    // Toggle profile dropdown
    const toggleProfileDropdown = () => {
        setProfileOpen(!profileOpen);
    };

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

    return (
        <div>
            {/* Navbar */}
            <nav className="h-[90px] place-content-center border-b">
                <div className="container mx-auto flex justify-between items-center  py-4 px-2">
                    {/* Left Section: Logo */}
                    <div className="flex -ml-1 xl:-ml-2">
                        <img className='w-12' src="https://i.ibb.co.com/SRbh4WY/Pharma-removebg-preview.png" alt="Logo..." />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-pink-500 text-transparent bg-clip-text">PharmaHub</h1>
                    </div>

                    <div className='flex  gap-6'>
                        {/* Center Section: Navigation Links */}
                        <div className="hidden lg:flex items-center justify-end gap-6">
                            <NavLink to="/" className={({ isActive }) => isActive ? 'font-semibold border-b-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-100' : 'font-medium hover:text-teal-600'}>Home</NavLink>
                            <NavLink to="/shop" className={({ isActive }) => isActive ? 'font-semibold border-b-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-100' : 'font-medium hover:text-teal-600'}>Shop</NavLink>
                            <NavLink
                                to="/cart"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'font-semibold border-b-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-100 flex '
                                        : 'font-medium hover:text-teal-600 flex relative'
                                }
                            >
                                <FaCartPlus size={24} />
                                <span className="relative -top-4 right-2 bg-teal-100 px-2 rounded-full">{cart.length}</span>
                            </NavLink>

                            <div ref={languageDropdownRef} className="relative">
                                <button onClick={() => setLanguageOpen(!languageOpen)} className=" font-medium hover:text-teal-600 flex items-center">Languages <IoIosArrowDown size={22} /> </button>
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
                        </div>

                        {/* Right Section: Login/Register Buttons */}
                        <div className="hidden lg:flex gap-6 items-center">
                            {user ? (
                                <div className="relative">
                                    {/* Profile Section */}
                                    <div
                                        onClick={toggleProfileDropdown}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <div className="border border-teal-500 rounded-full flex items-center gap-2 pr-2 pl-4 py-[2px]">
                                            <FaBars size={21} />
                                            <img
                                                data-tooltip-id="my-tooltip-1"
                                                className="rounded-full w-10 h-10 border shadow-md "
                                                src={
                                                    user?.photoURL ||
                                                    "https://img.icons8.com/?size=48&id=z-JBA_KtSkxG&format=png"
                                                }
                                                alt="Profile"
                                            />
                                        </div>
                                    </div>

                                    {/* Profile Dropdown */}
                                    {profileOpen && (
                                        <div className="absolute top-12 right-0 bg-white border rounded-lg shadow-lg w-48 z-10">
                                            <ul className="px-4 py-3 text-sm md:text-base space-y-3">
                                                <li>
                                                    <NavLink
                                                        to={"/update-profile"}
                                                        className={({ isActive }) =>
                                                            isActive
                                                                ? "font-semibold border-b-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-100"
                                                                : " hover:text-teal-600"
                                                        }
                                                    >
                                                        Update Profile
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to={"/dashboard"}
                                                        className={({ isActive }) =>
                                                            isActive
                                                                ? "font-semibold border-b-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-100"
                                                                : " hover:text-teal-600"
                                                        }
                                                    >
                                                        Dashboard
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={handleLogOut}
                                                        className="px-3 py-2 w-full bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-md transition-colors duration-300"
                                                    >
                                                        Log Out
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex gap-6 items-center">
                                    {/* Join Us Button */}
                                    <NavLink
                                        to="/sign-up"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "font-semibold border-b-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-100"
                                                : "font-medium hover:text-teal-600"
                                        }
                                    >
                                        Join Us
                                    </NavLink>
                                </div>
                            )}
                        </div>


                    </div>
                    {/* Hamburger Menu for Mobile */}
                    <div onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden bg-teal-600 p-2 text-white rounded text-2xl cursor-pointer">
                        {menuOpen ? <IoMdClose /> : <IoMdMenu />}
                    </div>
                </div>


                {/* Mobile Menu */}
                <div className={`${menuOpen ? 'left-0' : '-left-[100%]'} absolute duration-500 w-full bg-gray-50/95 `}>
                    <div className={`flex-col lg:hidden gap-4 py-4 px-4 space-y-2 font-medium`}>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-teal-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/shop" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-teal-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Shop</NavLink>
                        <NavLink to="/cart" className={({ isActive }) => isActive ? 'flex  text-lg font-semibold border-b-2 border-teal-600 text-teal-600 mt-2' : 'text-base hover:text-teal-600 pt-2 flex'} onClick={() => setMenuOpen(false)}>
                            <FaCartPlus size={24} />
                            <span className="relative -top-2 right-1 bg-teal-100 px-2 rounded-full">{cart.length}</span>
                        </NavLink>

                        <div ref={languageDropdownRef} className="relative pb-3">
                            <button onClick={() => setLanguageOpen(!languageOpen)} className=" font-medium hover:text-teal-600 flex items-center">Languages <IoIosArrowDown size={22} /></button>
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
                                        <div onClick={toggleProfileDropdown} className='flex items-center gap-3 border border-teal-500 rounded-full pr-2 pl-4 py-[2px]'>
                                            <FaBars size={21} />
                                            <img data-tooltip-id="my-tooltip-1" className="rounded-full w-10 h-10 border shadow-md transition-transform transform hover:scale-110" src={user?.photoURL || 'https://img.icons8.com/?size=48&id=z-JBA_KtSkxG&format=png'} alt="" />
                                        </div>
                                        {profileOpen && (
                                            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
                                                <ul className="px-4 py-3 text-nowrap space-y-3">
                                                    <li>
                                                        <NavLink to={'/update-profile'} className={({ isActive }) => isActive ? 'font-semibold border-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-50' : 'font-medium hover:text-teal-600'}>Update Profile</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? 'font-semibold border-2 px-3 py-1 rounded border-teal-600 text-teal-600 bg-teal-50' : 'font-medium hover:text-teal-600'}>Dashboard</NavLink>
                                                    </li>
                                                    <button onClick={handleLogOut} className="px-3 py-2 border-teal-600 bg-teal-600 hover:bg-teal-500 text-white transition-colors duration-500 text-base  font-medium w-full">Log Out</button>
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