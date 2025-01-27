import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const handleLoginWithGoogle = async () => {
        try {
            // Initiating Google Sign In
            const result = await googleSignIn();
            const userInfo = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                photo: result?.user?.photoURL,
                role: "User"
            };

            // Fetch existing users
            const { data: existingUsers } = await axiosPublic.get('/check-users'); // Fetch all users from the database

            // Check if the user already exists
            const existingUser = existingUsers.find(user => user.email === userInfo.email);

            if (existingUser) {
                // User already exists, only log them in
                toast.success(`Welcome back, ${existingUser.name || 'User'}!`);
                navigate(location?.state?.from || '/'); // Navigate to the intended route or home
            } else {
                // New user: Add user to the database
                const res = await axiosPublic.post('/users', userInfo);
                if (res.data.insertedId) {
                    toast.success(`Welcome, ${userInfo.name || 'User'}! Your account has been created.`);
                    navigate(location?.state?.from || '/'); // Navigate to the intended route or home
                }
            }
        } catch (error) {
            // Handle errors
            toast.error(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
        }
    };

    return (
        <div>
            <button
                onClick={handleLoginWithGoogle}
                className="btn w-full mt-6 py-2 bg-teal-600 text-base text-white hover:bg-teal-50 hover:text-black border-2 hover:border-teal-600 transition duration-300 flex items-center justify-center"
            >
                <FaGoogle className="mr-2" /> Sign In with Google
            </button>
        </div>
    );
};

export default SocialLogin;
