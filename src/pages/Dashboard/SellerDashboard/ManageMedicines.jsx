import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useImageUpload from '../../../hooks/useImageUpload';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const ManageMedicines = () => {
    const [showModal, setShowModal] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const { uploadImage } = useImageUpload();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

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
            pricePerUnit: newMedicine.pricePerUnit,
            discountPercentage: newMedicine.discountPercentage,
            // role: 
            sellerName: user?.displayName,
            sellerEmail: user?.email,
        }

        // console.log(medicineInfo);
        const res = await axiosSecure.post('/medicines', medicineInfo)
        console.log(res.data);
        if (res.data.insertedId) {
            toast.success('Medicine added successfully.')
        }
        
        setShowModal(false);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Manage Medicines Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    Manage Medicines
                </h1>
                <p className="mt-2 text-lg text-gray-600">View and manage your added medicines</p>
            </div>

            {/* Add Medicine Button */}
            <div className="flex justify-end mb-6">
                <button
                    className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition"
                    onClick={() => setShowModal(true)}
                >
                    + Add Medicine
                </button>
            </div>

            {/* Medicines Table */}
            <div className="overflow-x-auto shadow-md rounded-lg bg-white">
                <table className="min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-3 px-4 font-semibold text-gray-700">Item Name</th>
                            <th className="py-3 px-4 font-semibold text-gray-700">Generic Name</th>
                            <th className="py-3 px-4 font-semibold text-gray-700">Category</th>
                            <th className="py-3 px-4 font-semibold text-gray-700">Company</th>
                            <th className="py-3 px-4 font-semibold text-gray-700">Unit Price</th>
                            <th className="py-3 px-4 font-semibold text-gray-700">Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((medicine, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-3 px-4">{medicine.itemName}</td>
                                <td className="py-3 px-4">{medicine.genericName}</td>
                                <td className="py-3 px-4">{medicine.category}</td>
                                <td className="py-3 px-4">{medicine.company}</td>
                                <td className="py-3 px-4">${medicine.price}</td>
                                <td className="py-3 px-4">{medicine.discount}%</td>
                            </tr>
                        ))}
                        {medicines.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-3 text-gray-500">
                                    No medicines added yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Medicine Modal */}
            {showModal && (
                // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                //     <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                //         <h2 className="text-2xl font-semibold mb-4">Add Medicine</h2>
                //         <form onSubmit={handleAddMedicine}>
                //             <div className="mb-4">
                //                 <label className="block text-gray-700 font-medium mb-1">Item Name</label>
                //                 <input name="itemName" type="text" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300" />
                //             </div>
                //             <div className="mb-4">
                //                 <label className="block text-gray-700 font-medium mb-1">Item Generic Name</label>
                //                 <input name="genericName" type="text" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300" />
                //             </div>
                //             <div className="mb-4">
                //                 <label className="block text-gray-700 font-medium mb-1">Short Description</label>
                //                 <textarea name="description" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300"></textarea>
                //             </div>
                //             <div className="mb-4">
                //                 <label className="block text-gray-700 font-medium mb-1">Category</label>
                //                 <select name="category" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300">
                //                     <option value="Pain Reliever">Pain Reliever</option>
                //                     <option value="Antibiotic">Antibiotic</option>
                //                     <option value="Supplement">Supplement</option>
                //                 </select>
                //             </div>
                //             <div className="mb-4">
                //                 <label className="block text-gray-700 font-medium mb-1">Company</label>
                //                 <select name="company" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300">
                //                     <option value="HealthCorp">HealthCorp</option>
                //                     <option value="Wellness Inc">Wellness Inc</option>
                //                     <option value="MediLife">MediLife</option>
                //                 </select>
                //             </div>
                //             <div className="grid grid-cols-2 gap-4 mb-4">
                //                 <div>
                //                     <label className="block text-gray-700 font-medium mb-1">Unit Price</label>
                //                     <input name="price" type="number" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300" />
                //                 </div>
                //                 <div>
                //                     <label className="block text-gray-700 font-medium mb-1">Discount (%)</label>
                //                     <input name="discount" type="number" defaultValue="0" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300" />
                //                 </div>
                //             </div>
                //             <div className="flex justify-end space-x-4">
                //                 <button type="button" className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600" onClick={() => setShowModal(false)}>
                //                     Cancel
                //                 </button>
                //                 <button type="submit" className="py-2 px-4 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600">
                //                     Save
                //                 </button>
                //             </div>
                //         </form>
                //     </div>
                // </div>
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
                        <button
                            className="btn btn-circle btn-outline fixed top-4 right-4 z-50 bg-white border border-gray-300"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMedicines;
