import React from 'react';
import { Helmet } from 'react-helmet-async';
// import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import error from '../../assets/404.png'

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>

            <Helmet>
                <title>404 Page Not Found | PharmaHub</title>
            </Helmet>

            <img className='w-[350px] h-[350px] -mt-10' src={error} alt="Error..." />
            <Link to={'/'} className='text-xl -mt-10 text-teal-500 font-bold border border-teal-500 rounded-full px-4 py-1 hover:bg-teal-100 transition duration-300'>Go To Home Page</Link>

        </div>
    );
};

export default ErrorPage;