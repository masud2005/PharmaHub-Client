import React, { useState } from 'react';
import SectionTitle from '../../components/Shared/SectionTitle/SectionTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { GiCheckMark } from 'react-icons/gi';
import { FaEye } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useCart from '../../hooks/useCart';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FeaturedMedicines = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [, refetch] = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: featuredMedicines = [], isLoading } = useQuery({
        queryKey: ["featuredMedicines"],
        queryFn: async () => {
            const res = await axiosPublic.get("/featured-medicines");
            // console.log(res.data);
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
                quantity: 1,
                sellerEmail: medicine.sellerEmail,
                sellerName: medicine.sellerName
            };

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        toast.success(`Successfully ${medicine.name} added to cart`);
                        refetch();
                    }
                })
                .catch(() => {
                    toast.error('An error occurred while adding the item to your cart. Please try again later.');
                });

        } else {
            Swal.fire({
                title: "You are not Logged In!",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                customClass: {
                    confirmButton: 'bg-teal-600',
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
        <div className='container mx-auto px-2 pt-10'>
            <SectionTitle heading={'Featured Medicines'} subHeading={'Discover 8 essential medicines for your health.'} />

            {/* All Medicines */}
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
                        {featuredMedicines.map((item, idx) => (
                            <div key={item._id} className="bg-teal-50 rounded-lg shadow-md overflow-hidden border">
                                <div className="p-2 md:p-4">
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <img src={item.imageURL} alt="Image" className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium sm:text-xl text-black">{item.name}</h3>
                                            <p className="text-sm md:text-base text-gray-600">{item.genericName}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm md:text-base text-gray-700"><span className="font-medium">Category:</span> {item.category}</p>
                                        <p className="text-sm md:text-base text-gray-700"><span className="font-medium">Company:</span> {item.company}</p>
                                        <p className="text-sm md:text-base text-gray-700"><span className="font-medium">Price:</span> ${item.pricePerUnit}</p>
                                    </div>
                                </div>
                                <div className="flex justify-center space-x-1 md:space-x-2 p-3 bg-gray-100">
                                    <button
                                        className="px-2 sm:px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-sm md:text-base p-2 flex items-center gap-1"
                                        onClick={() => handleSelectMedicine(item)}
                                    >
                                        <GiCheckMark /> Select
                                    </button>
                                    <button
                                        className="px-2 sm:px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm md:text-base p-2 flex items-center gap-1"
                                        onClick={() => handleViewDetails(item)}
                                    >
                                        <FaEye /> View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
            {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
                {featuredMedicines.map((item, idx) => (
                    <div key={item._id} className="bg-teal-50 rounded-lg shadow-md overflow-hidden border">
                        <div className="p-2 md:p-4">
                            <div className="flex items-center gap-2 md:gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src={item.imageURL} alt="Image" className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <h3 className="font-medium sm:text-xl text-black">{item.name}</h3>
                                    <p className="text-sm md:text-base text-gray-600">{item.genericName}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm md:text-base text-gray-700"><span className="font-medium">Category:</span> {item.category}</p>
                                <p className="text-sm md:text-base text-gray-700"><span className="font-medium">Company:</span> {item.company}</p>
                                <p className="text-sm md:text-base text-gray-700"><span className="font-medium">Price:</span> ${item.pricePerUnit}</p>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-1 md:space-x-2 p-3 bg-gray-100">
                            <button
                                className="px-2 sm:px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-sm md:text-base p-2 flex items-center gap-1"
                                onClick={() => handleSelectMedicine(item)}
                            >
                                <GiCheckMark /> Select
                            </button>
                            <button
                                className="px-2 sm:px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm md:text-base p-2 flex items-center gap-1"
                                onClick={() => handleViewDetails(item)}
                            >
                                <FaEye /> View
                            </button>
                        </div>
                    </div>
                ))}
            </div> */}

            {/* Details Medicine */}
            {
                isModalOpen && selectedMedicine && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-[768px] px-3 py-8 relative">
                            <h3 className="font-bold text-lg">{selectedMedicine.name}</h3>
                            <img src={selectedMedicine.imageURL} alt={selectedMedicine.name} className="w-full h-64 object-cover my-4" />
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2 text-sm md:text-base">
                                <p className="font-semibold col-span-1">Category</p>
                                <p className="col-span-3">: {selectedMedicine.category}</p>
                                <p className="font-semibold col-span-1">Company</p>
                                <p className="col-span-3">: {selectedMedicine.company}</p>
                                <p className="font-semibold col-span-1">Description</p>
                                <p className="col-span-3">: {selectedMedicine.description}</p>
                                {/* <p className="font-semibold col-span-1">Available Stock</p>
                                <p className="col-span-3">: {selectedMedicine.availableStock}</p> */}
                                <p className="font-semibold col-span-1">Discount</p>
                                <p className="col-span-3">: {selectedMedicine.discountPercentage}%</p>
                                <p className="font-semibold col-span-1">Generic Name</p>
                                <p className="col-span-3">: {selectedMedicine.genericName}</p>
                                <p className="font-semibold col-span-1">Mass Unit</p>
                                <p className="col-span-3">: {selectedMedicine.massUnit}</p>
                                <p className="font-semibold col-span-1">Price</p>
                                <p className="col-span-3">: ${selectedMedicine.pricePerUnit}</p>

                            </div>
                            <button
                                className="btn btn-circle btn-outline fixed top-4 right-4 bg-red-300 hover:bg-red-500"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default FeaturedMedicines;