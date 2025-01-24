import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useImageUpload from '../../../hooks/useImageUpload';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../components/Shared/SectionTitle/SectionTitle';

const ManageMedicines = () => {
    const [showModal, setShowModal] = useState(false);
    // const [medicines, setMedicines] = useState([]);
    const { uploadImage } = useImageUpload();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: sellerMedicines = [], refetch } = useQuery({
        queryKey: ['sellerMedicines', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicines/${user?.email}`)
            // console.log(res.data);
            return res.data;
        }
    })

    const handleAddMedicine = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newMedicine = Object.fromEntries(formData.entries());
        // console.log(newMedicine);


        // Upload Image ImageBB
        const imageFile = formData.get("imageURL");
        const uploadImageURL = await uploadImage(imageFile);
        // console.log(uploadImageURL);
        const medicineInfo = {
            name: newMedicine.name,
            genericName: newMedicine.genericName,
            description: newMedicine.description,
            imageURL: uploadImageURL,
            category: newMedicine.category,
            company: newMedicine.company,
            massUnit: newMedicine.massUnit,
            pricePerUnit: parseFloat(newMedicine.pricePerUnit),
            discountPercentage: newMedicine.discountPercentage,
            // role: 
            sellerName: user?.displayName,
            sellerEmail: user?.email,
        }

        // console.log(medicineInfo);
        const res = await axiosSecure.post('/medicines', medicineInfo)
        // console.log(res.data);
        if (res.data.insertedId) {
            toast.success('Medicine added successfully.')
            refetch();
        }

        setShowModal(false);
    };

    return (
        <>
            {/* Manage Medicines Header */}
            <SectionTitle heading={'medicine'} subHeading={"View and manage your added medicines"} />

            {/*All Medicine & Add Medicine Button*/}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-teal-600 ">Medicines ({sellerMedicines.length})</h1>
                <button
                    className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition"
                    onClick={() => setShowModal(true)}
                >
                    + Add Medicine
                </button>
            </div>

            {/* Medicines Table */}
            <div className='mb-10'>
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
                            {sellerMedicines.map((medicine, index) => (
                                <tr
                                    key={medicine.id || index}
                                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                                >
                                    <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{index + 1}</td>
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
            </div>

            {/* Add Medicine Modal */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-[576px] lg:max-w-[768px] p-2 relative">
                        <div className=" w-full p-6 relative">
                            <h2 className="text-2xl font-semibold mb-4">Add Medicine</h2>
                            <form onSubmit={handleAddMedicine} className="space-y-4">
                                {/* Item Name */}
                                <div className="form-control">
                                    <label className="label text-lg font-medium text-gray-700">Item Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Enter item name"
                                        className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                    />
                                </div>

                                {/* Item Generic Name */}
                                <div className="form-control">
                                    <label className="label text-lg font-medium text-gray-700">Item Generic Name</label>
                                    <input
                                        name="genericName"
                                        type="text"
                                        required
                                        placeholder="Enter generic name"
                                        className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                    />
                                </div>

                                {/* Short Description */}
                                <div className="form-control">
                                    <label className="label text-lg font-medium text-gray-700">Short Description</label>
                                    <textarea
                                        name="description"
                                        required
                                        placeholder="Enter description"
                                        className="textarea textarea-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                    ></textarea>
                                </div>

                                {/* Image Upload */}
                                <div className="form-control">
                                    <label className="label text-lg font-medium text-gray-700">Upload Photo</label>
                                    <div className='flex items-center gap-5'>
                                        <div className='w-full'>
                                            <input type="file" name='imageURL' className="file-input file-input-bordered w-full focus:outline-none focus:ring-1 focus:ring-teal-300 transition" required />
                                        </div>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="form-control">
                                    <label className="label text-lg font-medium text-gray-700">Category</label>
                                    <select
                                        name="category"
                                        defaultValue=''
                                        required
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
                                </div>

                                {/* Company */}
                                <div className="form-control">
                                    <label className="label text-lg font-medium text-gray-700">Company</label>
                                    <select
                                        name="company"
                                        required
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
                                </div>

                                {/* Item Mass Unit */}
                                <div className="form-control">
                                    <label className="label text-lg font-medium text-gray-700">Item Mass Unit</label>
                                    <input
                                        name="massUnit"
                                        type="text"
                                        required
                                        placeholder="Enter mass unit (e.g., 200mg or 200ml)"
                                        className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                    />
                                </div>

                                {/* Unit Price and Discount */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label text-lg font-medium text-gray-700">Unit Price</label>
                                        <input
                                            name="pricePerUnit"
                                            type="number"
                                            required
                                            placeholder="Enter unit price"
                                            className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-lg font-medium text-gray-700">Discount (%)</label>
                                        <input
                                            name="discountPercentage"
                                            type="number"
                                            defaultValue="0"
                                            placeholder="Enter discount"
                                            className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                        />
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
