import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/Shared/SocialLogin/SocialLogin';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const SignUp = () => {
    const axiosSecure = useAxiosSecure();
    const { createUser, updateProfileInfo } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // console.log(data);
        // image upload to imgbb and then get an url
        const imageFile = { image: data.photo[0] }
        const res = await axiosSecure.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        // console.log(res.data.data.display_url);
        const photoURL = res.data.data.display_url;

        if (res.data.success) {
            createUser(data.email, data.password)
                .then(result => {
                    // console.log(result);
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: `Welcome, ${data.name}! Your account has been created.`,
                        customClass: {
                            confirmButton: 'bg-teal-500 text-white'
                        }
                    });
                    updateProfileInfo(data.name, photoURL);
                    navigate('/');
                })
                .catch(error => {
                    // console.log(error.code);
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: error.code,
                        customClass: {
                            confirmButton: 'bg-red-500 text-white'
                        }
                    });
                });
        }
    };

    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className="flex items-center justify-center my-10 px-2">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-xl px-5 md:px-8 py-10 border">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 to-teal-500 text-transparent bg-clip-text mb-6 p-1">
                    Register Your Account
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Your Name</label>
                        <input type="text" {...register("name", { required: true })} placeholder="Enter your name" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                        {errors.name && <p className='text-red-600'>Name is required.</p>}
                    </div>

                    {/* Image Upload Field */}
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Upload Photo</label>
                        <div className='flex items-center gap-5'>
                            <div>
                                <input type="file" {...register("photo", { required: true })} accept="image/*" onChange={handleImagePreview} className="input input-bordered w-4/5 px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                                {errors.photo && <p className='text-red-600'>Photo is required.</p>}
                            </div>
                            <div>
                                {imagePreview && <img src={imagePreview} alt="Preview" className=" h-20 sm:w-20  rounded-full object-cover  md:-ml-0" />}
                            </div>
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Email Address</label>
                        <input type="email" {...register("email", { required: true })} placeholder="Enter your email address" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                        {errors.email && <p className='text-red-600'>Email is required.</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="form-control relative">
                            <label className="label text-lg font-medium text-gray-700">Password</label>
                            <input type={`${showPassword ? 'text' : 'password'}`} {...register("password", {
                                required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,18}$/
                            })} name="password" placeholder="Enter your password" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-[10px] text-gray-600 bg-gray-100 rounded-full cursor-pointer p-1"> {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />} </span>

                        </div>
                        <div>
                            {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                            {errors.password?.type === ('minLength' || 'maxLength') && <p className='text-red-600'>Password must be between 6 to 18 characters.</p>}
                            {/* {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be between 6 to 18 characters.</p>} */}
                            {errors.password?.type === "pattern" && (
                                <p className='text-red-600'>Password must have one Uppercase and Lowercase, one Number and one Special character. </p>
                            )}
                        </div>
                    </div>

                    {/* Role Select Field */}
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Select Role</label>
                        <select defaultValue='' {...register("role", { required: true })} className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition">
                            <option disabled value="">Select your role</option>
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                        {errors.role && <p className='text-red-600'>Role is required.</p>}
                    </div>

                    {/* Terms & Conditions */}
                    <label className="flex items-center gap-2 py-4">
                        <input type="checkbox" defaultChecked className="checkbox checkbox-md border-gray-300" />
                        <span className="text-base text-gray-600">Accept Terms & Conditions</span>
                    </label>

                    {/* Register Button */}
                    <div className="form-control -mt-5">
                        <button className="btn w-full py-2 text-base border-2 border-teal-600 bg-teal-50 hover:bg-teal-600 hover:text-white transition duration-300">Register</button>
                    </div>
                </form>

                {/* Redirect to Login */}
                <p className="text-center text-base font-medium text-gray-600 mt-3">Already registered? Go to{' '}<Link to="/sign-in" className="text-teal-600 hover:underline">Sign In</Link></p>

                {/* Divider */}
                <div className="divider">OR</div>

                {/* Login with Google */}
                <SocialLogin />
            </div>
        </div>
    );
};

export default SignUp;