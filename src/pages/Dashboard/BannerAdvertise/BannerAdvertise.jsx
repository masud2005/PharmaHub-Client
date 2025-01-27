import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../components/Shared/SectionTitle/SectionTitle';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const BannerAdvertise = () => {
    const axiosSecure = useAxiosSecure();

    const { data: bannerAdvertise = [], refetch } = useQuery({
        queryKey: ['bannerAdvertise'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-advertise');
            // console.log(res.data);
            return res.data;
        }
    })

    const handleAddOrRemoveSlide = async (item) => {
        // console.log(item);

        let status;
        if (item.status === 'Pending') {
            status = 'Approved';
        } else {
            status = 'Pending';
        }
        // console.log(status);

        try {
            const res = await axiosSecure.patch(`/all-advertise/${item._id}`, { status });
            if (res.data.modifiedCount > 0) {
                toast.success('Advertise status updated successfully.');
                refetch(); // Fetch the updated data
            }
        } catch (error) {
            toast.error('Failed to update advertise.');
        }
    }


    return (
        <>
            <Helmet>
                <title>Banner Advertise || Dashboard || PharmaHub</title>
            </Helmet>
            {/* Header */}
            <SectionTitle heading={'Banner Management'} subHeading={"Toggle medicines for the homepage slider"} />

            <h1 className="text-2xl font-semibold text-teal-600 mb-6">
                Manage Banner Ads ({bannerAdvertise.length})
            </h1>
            <div className="overflow-x-auto mb-10">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-teal-600 text-white h-16">
                        <tr>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">#</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Advertise Image</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Name</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Description</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Seller Email</th>
                            {/* <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Transaction ID</th> */}
                            {/* <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Amount</th> */}
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Status</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bannerAdvertise.map((item, index) => (
                            <tr
                                key={item._id}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                            >
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt="Image..." />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    {item.description}
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    {item.sellerEmail}
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base">
                                    <span
                                        className={`px-3 py-1 inline-flex leading-tight rounded-full ${item.status === 'Approved'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base">
                                    <button
                                        onClick={() => handleAddOrRemoveSlide(item)}
                                        className={`min-w-40 text-sm md:text-base py-2 px-3 rounded ${item.status === 'Pending' ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-red-500 text-white hover:bg-red-600'}`}
                                    >
                                        {item.status === 'Pending' ? 'Add to Slide' : 'Remove from Slide'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {bannerAdvertise.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No advertise available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BannerAdvertise;