import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaEye } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { toast } from 'react-toastify';
import SectionTitle from '../../components/Shared/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

const Shop = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
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

    const filteredMedicines = medicines.filter((medicine) => {
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
        <div className="container mx-auto pb-10 px-2">
            <Helmet>
                <title>Shop || PharmaHub</title>
            </Helmet>

            <SectionTitle heading={'Medicine Store'} subHeading={'View medicines and add to cart or see details'} />
            <div >
                <div className="lg:flex justify-between items-center my-5">
                    <h1 className="text-2xl font-semibold text-teal-600 pb-3 lg:pb-0">Medicines Shop ({medicines.length})</h1>
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
                                        <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">#</th>
                                        <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">Image & Name</th>
                                        <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">Generic Name</th>
                                        <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">Company</th>
                                        <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-4 border-b text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedMedicines.map((item, idx) => (
                                        <tr
                                            key={item._id}
                                            className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {idx + 1 + (currentPage - 1) * itemsPerPage}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700 flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                                    <img src={item.imageURL} alt="Image" className="object-cover w-full h-full" />
                                                </div>
                                                <span className="font-medium">{item.name}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {item.genericName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {item.category}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {item.company}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                ${item.pricePerUnit}
                                            </td>
                                            <td className='space-x-2'>
                                                <button
                                                    className="btn bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm"
                                                    onClick={() => handleSelectMedicine(item)}
                                                >
                                                    <GiCheckMark />
                                                </button>
                                                <button
                                                    className="btn bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm"
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

                {isModalOpen && selectedMedicine && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-[768px] px-3 py-8 relative">
                            <h3 className="font-bold text-lg">{selectedMedicine.name}</h3>
                            <img src={selectedMedicine.imageURL} alt={selectedMedicine.name} className="w-full h-64 object-cover my-4" />
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2 text-sm">
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
                )}
            </div>
        </div>
    );
};

export default Shop;
