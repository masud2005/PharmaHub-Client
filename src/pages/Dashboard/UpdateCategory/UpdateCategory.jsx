import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';

const UpdateCategory = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { data: medicines = [], refetch } = useQuery({
        queryKey: ["medicines"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicines/${id}`);
            // console.log(res.data);
            return res.data;
        },
    });

    const onSubmit = async (data) => {
        // console.log(data);
    }

    return (
        // <h1>dfkdj</h1>
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Item Name */}
                <div className="form-control">
                    <label className="label text-lg font-medium text-gray-700">Item Name</label>
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        defaultValue={medicines.name}
                        placeholder="Enter item name"
                        className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                    />
                    {errors.name && <p className='text-red-600'>Item name is required.</p>}
                </div>

                {/* Item Generic Name */}
                <div className="form-control">
                    <label className="label text-lg font-medium text-gray-700">Item Generic Name</label>
                    <input
                        {...register("genericName", { required: true })}
                        type="text"
                        defaultValue={medicines.genericName}
                        placeholder="Enter generic name"
                        className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                    />
                    {errors.genericName && <p className='text-red-600'>Item generic name is required.</p>}
                </div>

                {/* Short Description */}
                <div className="form-control">
                    <label className="label text-lg font-medium text-gray-700">Short Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Enter description"
                        defaultValue={medicines.description}
                        className="textarea textarea-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                    ></textarea>
                    {errors.description && <p className='text-red-600'>Description is required.</p>}
                </div>

                {/* Image Upload */}
                <div className="form-control">
                    <label className="label text-lg font-medium text-gray-700">Upload Photo</label>
                    <div className='flex items-center gap-5'>
                        <div className='w-full'>
                            <input type="file" {...register("imageURL", { required: true })} defaultValue={medicines.imageURL} className="file-input file-input-bordered w-full focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                            {errors.imageURL && <p className='text-red-600'>Image is required.</p>}
                        </div>
                    </div>
                </div>

                {/* Category */}
                <div className="form-control">
                    <label className="label text-lg font-medium text-gray-700">Category</label>
                    <select
                        defaultValue={medicines.category}
                        {...register("category", { required: true })}
                        className="select select-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                    >
                        <option disabled value="">Select Category</option>
                        <option value="Pain Reliever">Pain Reliever</option>
                        <option value="Antibiotic">Antibiotic</option>
                        <option value="Supplement">Supplement</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Syrup">Syrup</option>
                        <option value="Injection">Injection</option>
                    </select>
                    {errors.category && <p className='text-red-600'>Category is required.</p>}
                </div>

                {/* Company */}
                <div className="form-control">
                    <label className="label text-lg font-medium text-gray-700">Company</label>
                    <select
                        defaultValue={medicines.company}
                        {...register("company", { required: true })}
                        className="select select-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                    >
                        <option disabled value="">Select Company</option>
                        <option value="HealthCorp">HealthCorp</option>
                        <option value="Wellness Inc">Wellness Inc</option>
                        <option value="MediLife">MediLife</option>
                        <option value="NutrientPlus">NutrientPlus</option>
                        <option value="HeartCare">HeartCare</option>
                    </select>
                    {errors.company && <p className='text-red-600'>Company is required.</p>}
                </div>

                {/* Item Mass Unit */}
                <div className="form-control">
                    <label className="label text-lg font-medium text-gray-700">Item Mass Unit</label>
                    <input
                        {...register("massUnit", { required: true })}
                        type="text"
                        defaultValue={medicines.massUnit}
                        placeholder="Enter mass unit (e.g., 200mg or 200ml)"
                        className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                    />
                    {errors.massUnit && <p className='text-red-600'>Mass Unit is required.</p>}
                </div>

                {/* Unit Price and Discount */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Unit Price</label>
                        <input
                            {...register("pricePerUnit", { required: true })}
                            defaultValue={medicines.pricePerUnit}
                            type="number"
                            placeholder="Enter unit price"
                            className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                        />
                        {errors.pricePerUnit && <p className='text-red-600'>Price is required.</p>}
                    </div>
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Discount (%)</label>
                        <input
                            {...register("discountPercentage", { required: true })}
                            type="number"
                            defaultValue='0'
                            placeholder="Enter discount"
                            className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                        />
                        {errors.discountPercentage && <p className='text-red-600'>Discount is required.</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="py-2 px-4 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="py-2 px-4 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCategory;