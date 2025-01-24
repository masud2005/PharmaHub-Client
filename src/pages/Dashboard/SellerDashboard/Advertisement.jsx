import React, { useState } from 'react';
import useImageUpload from '../../../hooks/useImageUpload';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../components/Shared/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';

const Advertisement = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { uploadImage } = useImageUpload();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();

    const { data: advertisement = [], refetch, isLoading } = useQuery({
        queryKey: ['advertisement', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/seller-advertise?sellerEmail=${user?.email}`);
            // console.log(res.data);
            return res.data;
        }
    })


    const onSubmit = async (data) => {
        const imageFile = data.image[0];
        const uploadImageURL = await uploadImage(imageFile);
        // console.log(uploadImageURL);

        const advertise = {
            image: uploadImageURL,
            description: data.description,
            sellerEmail: user?.email
        }
        // console.log(advertise);
        const res = await axiosSecure.post('/seller-advertise', advertise)
        // console.log(res.data);
        if (res.data.insertedId) {
            toast.success('Added Successfully.');
            refetch();
        }

        setIsModalOpen(false)
    };

    return (
        <>
            <SectionTitle heading={'Advertisement'} subHeading={"Manage and add medicine advertisements easily"} />

            {/*All Advertise & Add Advertise Button*/}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-teal-600 ">Advertise ({advertisement.length})</h1>
                <button
                    className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Add Advertise
                </button>
            </div>

            {/* Table */}
            <div className='mb-10'>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                        <thead className="bg-teal-600 text-white h-16">
                            <tr className="">
                                <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">#</th>
                                <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Image</th>
                                <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {advertisement.map((item, index) => (
                                <tr key={item._id}
                                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    <td className="px-6 py-2 border-b text-sm md:text-base text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-2 border-b text-sm md:text-base text-gray-700">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <img src={item.image} alt="Image" className="object-cover w-full h-full" />
                                        </div>
                                        {/* <span className="font-medium">{item.description}</span> */}
                                    </td>
                                    <td className="px-6 py-2 border-b text-sm md:text-base text-gray-700">{item.description}</td>
                                </tr>
                            ))}
                            {advertisement.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-gray-500">
                                        No advertise medicines added yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-[576px] lg:max-w-[768px] px-3 md:px-5 py-8 relative">
                        <h3 className="text-2xl font-semibold mb-4">Add Advertisement</h3>
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base">Medicine Image</span>
                                </label>
                                <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                                {errors.image && <p className='text-red-600'>Image is required.</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base">Description</span>
                                </label>
                                <textarea
                                    {...register("description", { required: true })}
                                    className="textarea textarea-bordered focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                    placeholder="Enter description"
                                ></textarea>
                                {errors.description && <p className='text-red-600'>Name is required.</p>}
                            </div>
                            <div className="modal-action">
                                <button
                                    type="button"
                                    className="btn bg-red-500 hover:bg-red-600 text-white "
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn bg-teal-500 hover:bg-teal-600">
                                    Add Advertise
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Advertisement;