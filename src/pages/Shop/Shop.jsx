import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaEye } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: medicines = [], refetch } = useQuery({
        queryKey: ["medicines"],
        queryFn: async () => {
            const res = await axiosPublic.get("/medicines");
            return res.data;
        },
    });

    const handleSelectMedicine = (medicine) => {
        // console.log('Selected medicine:', medicine);

        if (user && user?.email) {
            const cartItem = {
                medicineId: medicine._id,
                email: user?.email,
                name: medicine.name,
                company: medicine.company,
                pricePerUnit: medicine.pricePerUnit,
            }

            // console.log(cartItem);
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            title: "Successfully added.",
                            text: `${medicine.name} added to your cart.`,
                            timer: 3000,
                            customClass: {
                                confirmButton: 'bg-teal-500 text-white'
                            }
                        })
                        refetch();
                    }
                })
                .catch(error => {
                    // console.log(error.code);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed add to cart',
                        text: 'An error occurred while adding the item to your cart. Please try again later.',
                        timer: 3000,
                        customClass: {
                            confirmButton: 'bg-red-500 text-white'
                        }
                    })
                })

        }
        else {
            // console.log('Not Login');
            // 
            Swal.fire({
                title: "You are not Logged In!",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Send the user to the login page
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
        <div className="container mx-auto py-10">
            <h2 className="text-4xl font-semibold mb-6 text-center">Shop</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className="text-base bg-teal-200 text-black h-16">
                            <th>#</th>
                            <th>Image & Name</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((item, idx) => (
                            <tr key={item._id} className="md:text-base">
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={item.imageURL} alt="Image..." />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium">{item.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <th className='text-nowrap space-x-1'>
                                    <button
                                        className="btn btn-ghost text-base md:text-lg"
                                        onClick={() => handleSelectMedicine(item)}
                                    >
                                        <GiCheckMark />
                                    </button>
                                    <button
                                        className="btn btn-ghost text-base md:text-lg"
                                        onClick={() => handleViewDetails(item)}
                                    >
                                        <FaEye />
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            {isModalOpen && selectedMedicine && (
                <div className="modal modal-open">
                    <div className="modal-box p-2 relative">
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
