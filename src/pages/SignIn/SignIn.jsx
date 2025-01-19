import React, { useState } from 'react';
import SocialLogin from '../../components/Shared/SocialLogin/SocialLogin';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const SignIn = () => {
    const { signInUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        signInUser(email, password)
            .then(result => {
                // console.log(result);
                toast.success(`Welcome, ${result.user?.displayName || 'User'}! You are now logged in.`);
                navigate(location?.state ? location?.state : '/');
            })
            .catch(error => {
                console.error(error);
                toast.error(`Error: ${error.code || 'Something went wrong. Please try again.'}`);
            })
    }

    return (
        <div className="flex items-center justify-center my-10 px-2">
            <div className="bg-white shadow-2xl rounded-lg w-full max-w-md px-5 md:px-8 py-10 border mb-1">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 to-teal-500 text-transparent bg-clip-text mb-6 p-1">Welcome Back</h1>
                <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Email address</label>
                        <input type="email" name="email" placeholder="Enter your email" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label text-lg font-medium text-gray-700">Password</label>
                        <input type={`${showPassword ? 'text' : 'password'}`} name="password" placeholder="Enter your password" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-[10px] text-gray-600 bg-gray-100 rounded-full cursor-pointer p-1"> {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />} </span>
                    </div>

                    <button className="btn w-full py-2 text-base border-2 border-teal-600 bg-teal-50 hover:bg-teal-600 hover:text-white transition duration-300"> Login </button>
                </form>

                {/* Redirect to Register */}
                <p className="mt-4 text-center text-base text-gray-600">Don’t have an account?<Link to="/sign-up" className="text-teal-600 font-medium hover:underline"> Sign Up Now</Link></p>

                {/* Divider */}
                <div className="divider">OR</div>
                <div className="mt-6">
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default SignIn;