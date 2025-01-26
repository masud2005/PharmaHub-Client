import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        enabled: false,
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleLoginWithGoogle = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    photo: result?.user?.photoURL,
                    role: "User"
                };

                // Check if the user already exists in the database
                const existingUser = users.find(user => user.email === userInfo.email);

                if (existingUser) {
                    // User already exists, just sign in
                    toast.success(`Sign In Successful. Hello, ${existingUser.name || 'User'}!`);
                    navigate(location?.state ? location?.state : '/');
                } else {
                    // New user, add to the database with default role 'User'
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                toast.success(`Sign In Successful. Hello, ${userInfo.name || 'User'}!`);
                                navigate(location?.state ? location?.state : '/');
                            }
                        })
                        .catch(error => {
                            // console.error(error);
                            toast.error(`Error: ${error.code || 'Something went wrong. Please try again.'}`);
                        });
                }
            })
            .catch(error => {
                toast.error(`Error: ${error.code || 'Something went wrong. Please try again.'}`);
            });
    };


    return (
        <div>
            <button onClick={handleLoginWithGoogle} className="btn w-full mt-6 py-2 bg-teal-600 text-base text-white hover:bg-teal-50 hover:text-black border-2 hover:border-teal-600 transition duration-300 flex items-center justify-center"><FaGoogle /> Sign In with Google</button>
        </div>
    );
};

export default SocialLogin;