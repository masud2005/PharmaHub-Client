import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useImageUpload from '../../../hooks/useImageUpload';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../components/Shared/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';

const ManageMedicines = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const { uploadImage } = useImageUpload();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: sellerMedicines = [], refetch } = useQuery({
        queryKey: ['sellerMedicines', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicines/${user?.email}`)
            console.log(res.data);
            return res.data;
        }
    })

    const onSubmit = async (data) => {

        // Upload Image ImageBB
        const imageFile = data.imageURL[0];
        // const photoURL = await uploadImage(imageFile);
        // const imageFile = formData.get("imageURL");
        const uploadImageURL = await uploadImage(imageFile);
        // console.log(uploadImageURL);

        const medicineInfo = {
            name: data.name,
            genericName: data.genericName,
            description: data.description,
            imageURL: uploadImageURL,
            category: data.category,
            company: data.company,
            massUnit: data.massUnit,
            pricePerUnit: parseFloat(data.pricePerUnit),
            discountPercentage: parseFloat(data.discountPercentage),
            sellerName: user?.displayName,
            sellerEmail: user?.email,
        }
        console.log(medicineInfo);

        const res = await axiosSecure.post('/medicines', medicineInfo)
        // console.log(res.data);
        if (res.data.insertedId) {
            toast.success('Medicine added successfully.')
            refetch();
        }

        setShowModal(false);
        reset();
    };

    const filteredMedicines = sellerMedicines.filter((medicine) => {
        const query = searchQuery.toLowerCase();
        return (
            medicine.name.toLowerCase().includes(query) ||
            medicine.genericName?.toLowerCase().includes(query) ||
            medicine.category.toLowerCase().includes(query) ||
            medicine.company.toLowerCase().includes(query)
        );
    });

    const sortedMedicines = filteredMedicines.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.pricePerUnit - b.pricePerUnit;
        } else {
            return b.pricePerUnit - a.pricePerUnit;
        }
    });

    const paginatedMedicines = sortedMedicines.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

    return (
        <>
            {/* Manage Medicines Header */}
            <SectionTitle heading={'medicine'} subHeading={"View and manage your added medicines"} />

            {/*All Medicine & Add Medicine Button*/}
            <button
                className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition"
                onClick={() => setShowModal(true)}
            >
                + Add Medicine
            </button>
            {/* <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-teal-600 ">Medicines ({sellerMedicines.length})</h1>
                
            </div> */}
            <div className="lg:flex justify-between items-center my-5">
                <h1 className="text-2xl font-semibold text-teal-600 pb-3 lg:pb-0">Medicines ({sellerMedicines.length})</h1>
                <div className="flex gap-1 lg:gap-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="input input-bordered border-gray-300 w-full rounded-md max-w-xs focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="btn bg-teal-600 px-2 md:px-3 md:text-base hover:bg-teal-500 transition duration-300 text-white"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        Sort by Price ({sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
                    </button>
                </div>
            </div>

            {/* Medicines Table */}
            <div className='mb-10'>
                {filteredMedicines.length === 0 ? (
                    <div className="text-center py-10">
                        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                            No medicines match your search. Try searching with different keywords!
                        </h2>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse border border-gray-200">
                                <thead className="bg-teal-600 text-white h-16">
                                    <tr>
                                        <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">#</th>
                                        <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Item Name</th>
                                        <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Generic Name</th>
                                        <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Category</th>
                                        <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Company</th>
                                        <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Unit Price</th>
                                        <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Discount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedMedicines.map((medicine, idx) => (
                                        <tr
                                            key={medicine.id || idx}
                                            className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {idx + 1 + (currentPage - 1) * itemsPerPage}
                                            </td>
                                            <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{medicine.name}</td>
                                            <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{medicine.genericName}</td>
                                            <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{medicine.category}</td>
                                            <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{medicine.company}</td>
                                            <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">${medicine.pricePerUnit}</td>
                                            <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{medicine.discountPercentage}%</td>
                                        </tr>
                                    ))}
                                    {sellerMedicines.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4 text-gray-500">
                                                No medicines added yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center items-center mt-4 space-x-2">
                            <button
                                className="btn btn-sm bg-gray-200"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                <HiArrowNarrowLeft />
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`btn btn-sm ${currentPage === index + 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                className="btn btn-sm bg-gray-200"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                <HiArrowNarrowRight />
                            </button>
                        </div>
                    </>
                )}

            </div>

            {/* Add Medicine Modal */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-[576px] lg:max-w-[768px] p-2 relative">
                        <div className=" w-full p-6 relative">
                            <h2 className="text-2xl font-semibold mb-4">Add Medicine</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Item Name */}
                                <div className="form-control">
                                    <label className="label text-lg font-medium text-gray-700">Item Name</label>
                                    <input
                                        {...register("name", { required: true })}
                                        type="text"

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
                                        className="textarea textarea-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                    ></textarea>
                                    {errors.description && <p className='text-red-600'>Description is required.</p>}
                                </div>

                                {/* Image Upload */}
                                <div className="form-control">
                                    <label className="label text-lg font-medium text-gray-700">Upload Photo</label>
                                    <div className='flex items-center gap-5'>
                                        <div className='w-full'>
                                            <input type="file" {...register("imageURL", { required: true })} className="file-input file-input-bordered w-full focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                                            {errors.imageURL && <p className='text-red-600'>Image is required.</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="form-control">
                                    <label className="label text-lg font-medium text-gray-700">Category</label>
                                    <select
                                        {...register("category", { required: true })}
                                        defaultValue=''
                                        className="select select-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                    >
                                        <option disabled value="">Select Category</option>
                                        <option value="Pain Reliever">Pain Reliever</option>
                                        <option value="Antibiotic">Antibiotic</option>
                                        <option value="Supplement">Supplement</option>
                                        <option value="Tablet">Tablet</option>
                                        <option value="Syrup">Syrup</option>
                                        <option value="Injection">Injection</option>
                                        <option value="Inhaler">Inhaler</option>
                                        <option value="Capsule">Capsule</option>
                                    </select>
                                    {errors.category && <p className='text-red-600'>Category is required.</p>}
                                </div>

                                {/* Company */}
                                <div className="form-control">
                                    <label className="label text-lg font-medium text-gray-700">Company</label>
                                    <select
                                        {...register("company", { required: true })}
                                        defaultValue=''
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
                                            defaultValue="0"
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
                    </div>
                </div>
            )}
        </>
    );
};

export default ManageMedicines;
