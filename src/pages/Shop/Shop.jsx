import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaEye } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { toast } from 'react-toastify';

const Shop = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [, refetch] = useCart();

    const { data: medicines = [] } = useQuery({
        queryKey: ["medicines"],
        queryFn: async () => {
            const res = await axiosPublic.get("/medicines");
            return res.data;
        },
    });

    const handleSelectMedicine = (medicine) => {
        if (user && user?.email) {
            const cartItem = {
                medicineId: medicine._id,
                email: user?.email,
                name: medicine.name,
                image: medicine.imageURL,
                company: medicine.company,
                pricePerUnit: medicine.pricePerUnit,
                quantity: 1
            }

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        toast.success(`Successfully ${medicine.name} added to cart`);
                        refetch();
                    }
                })
                .catch(error => {
                    toast.error('An error occurred while adding the item to your cart. Please try again later.');
                })

        } else {
            Swal.fire({
                title: "You are not Logged In!",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                customClass: {
                    confirmButton: 'bg-teal-500',
                    cancelButton: 'bg-red-500'
                },
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/sign-in');
                }
            });
        }
    };

    const handleViewDetails = (medicine) => {
        setSelectedMedicine(medicine);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto py-10 px-2">
            <h1 className="text-2xl font-semibold text-teal-600 mb-6">
                All Shop ({medicines.length})
            </h1>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-teal-600 text-white h-16">
                        <tr>
                            <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">#</th>
                            <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">Image & Name</th>
                            <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">Company</th>
                            <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((item, idx) => (
                            <tr
                                key={item._id}
                                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {idx + 1}
                                </td>
                                
                                <td className="px-6 py-4 text-sm md:text-base text-gray-700 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <img src={item.imageURL} alt="Image" className="object-cover w-full h-full" />
                                    </div>
                                    <span className="font-medium">{item.name}</span>
                                </td>
                                <td className="px-6 py-4 text-sm md:text-base text-gray-700">
                                    {item.category}
                                </td>
                                <td className="px-6 py-4 text-sm md:text-base text-gray-700">
                                    {item.company}
                                </td>
                                <td className="px-6 py-4 text-sm md:text-base text-gray-700 flex justify-start gap-2">
                                    <button
                                        className="btn bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm md:text-base"
                                        onClick={() => handleSelectMedicine(item)}
                                    >
                                        <GiCheckMark />
                                    </button>
                                    <button
                                        className="btn bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm md:text-base"
                                        onClick={() => handleViewDetails(item)}
                                    >
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            {isModalOpen && selectedMedicine && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-[576px] lg:max-w-[768px] p-2 relative">
                        <h3 className="font-bold text-lg">{selectedMedicine.name}</h3>
                        <img src={selectedMedicine.imageURL} alt={selectedMedicine.name} className="w-full h-64 object-cover my-4" />
                        <div className="grid grid-cols-4 gap-x-4 gap-y-2 text-sm md:text-base">
                            <p className="font-semibold col-span-1">Category</p>
                            <p className="col-span-3">: {selectedMedicine.category}</p>
                            <p className="font-semibold col-span-1">Company</p>
                            <p className="col-span-3">: {selectedMedicine.company}</p>
                            <p className="font-semibold col-span-1">Description</p>
                            <p className="col-span-3">: {selectedMedicine.description}</p>
                            <p className="font-semibold col-span-1">Available Stock</p>
                            <p className="col-span-3">: {selectedMedicine.availableStock}</p>
                            <p className="font-semibold col-span-1">Discount Percentage</p>
                            <p className="col-span-3">: {selectedMedicine.discountPercentage}%</p>
                            <p className="font-semibold col-span-1">Generic Name</p>
                            <p className="col-span-3">: {selectedMedicine.genericName}</p>
                            <p className="font-semibold col-span-1">Mass Unit</p>
                            <p className="col-span-3">: {selectedMedicine.massUnit}</p>
                            <p className="font-semibold col-span-1">Price Per Unit</p>
                            <p className="col-span-3">: ${selectedMedicine.pricePerUnit}</p>
                            <p className="font-semibold col-span-1">Status</p>
                            <p className="col-span-3">: {selectedMedicine.status}</p>
                        </div>
                        <button
                            className="btn btn-circle btn-outline fixed top-4 right-4 z-50 bg-white border border-gray-300"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Shop;
