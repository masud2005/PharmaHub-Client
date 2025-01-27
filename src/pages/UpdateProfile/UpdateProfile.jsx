import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import useImageUpload from '../../hooks/useImageUpload';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateProfile = () => {
    const { user, updateProfileInfo } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit } = useForm();
    const { uploadImage } = useImageUpload()
    const [isUpdating, setIsUpdating] = useState(false);
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        // setIsUpdating(true);
        console.log(data);

        const imageFile = data.photo[0];
        const photoURL = await uploadImage(imageFile);

        updateProfileInfo(data.name, photoURL);
        // Update user profile
        const profileInfo = {
            name: data.name,
            photo: photoURL,
        }


        // console.log(updateProfileInfo);

        try {
            const res = await axiosSecure.patch(`/users/${user?.email}`, profileInfo)
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                // console.log('Profile Updated Successfully');
                toast.success('Profile Updated Successfully');
                window.location.reload();
            }
        }
        catch (error) {
            toast.error(`Error: ${error.code || 'Something went wrong. Please try again.'}`);
        }

    };

    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10 p-6 mt-10 bg-gray-50 rounded-lg shadow-lg">
            {/* Left Section: Current Profile Info */}
            <div className="bg-white p-6 rounded-lg shadow-md place-content-center">
                <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">Your Profile</h2>
                <div className="space-y-4">
                    <div className='flex justify-center'>
                        <img
                            src={user?.photoURL || 'https://img.icons8.com/?size=48&id=z-JBA_KtSkxG&format=png'}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border border-gray-300 shadow-md"
                        />
                    </div>
                    <div className='flex items-center space-x-2 justify-center'>
                        <h3 className="text-lg font-semibold text-gray-700">Name:</h3>
                        <p className="text-gray-600">{user?.displayName || 'Not Available'}</p>
                    </div>
                    <div className='flex items-center space-x-2  justify-center'>
                        <h3 className="text-lg font-semibold text-gray-700">Email:</h3>
                        <p className="text-gray-600">{user?.email || 'Not Available'}</p>
                    </div>
                </div>
            </div>

            {/* Right Section: Update Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-teal-600 mb-4">Update Your Profile</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            {...register('name', { required: true })}
                            id="name"
                            type="text"
                            className="w-full px-4 py-2 border rounded focus:outline-teal-600"
                            placeholder="Your Name"
                        />
                    </div>

                    {/* Image Upload Field */}
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Photo</label>
                        <div className='flex items-center gap-5'>
                            <div className='w-full'>
                                <input type="file" {...register("photo", { required: true })} className="file-input file-input-bordered w-full h-[45px]  focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-right mt-5">
                        <button
                            type="submit"
                            className="bg-teal-600 text-white py-2 px-6 rounded hover:bg-teal-700"
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
