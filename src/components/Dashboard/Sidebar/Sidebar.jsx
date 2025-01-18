import React, { useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import AdminMenu from '../Menu/AdminMenu';

const Sidebar = () => {
    const [isActive, setActive] = useState(true);
    const role = 'admin'

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

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

                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            {role === 'admin' && <AdminMenu />}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;