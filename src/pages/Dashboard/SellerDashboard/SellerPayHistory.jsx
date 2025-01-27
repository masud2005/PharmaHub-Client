import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import SectionTitle from '../../../components/Shared/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

const SellerPayHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`http://localhost:5000/seller-pay-history/${user?.email}`);
            return res.data;
        }
    });

    return (
        <div>
            <Helmet>
                <title>Payment History || Dashboard || PharmaHub</title>
            </Helmet>
            {/* Section Title */}
            <SectionTitle heading={'Payment History'} subHeading={'Review all payments received for your sold medicines.'} />

            {/* Table Section */}
            <div className="mb-10">
                <h1 className="text-2xl font-semibold text-teal-600 mb-6">
                    Payment History ({payments.length})
                </h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                        <thead className="bg-teal-600 text-white h-16">
                            <tr>
                                <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">#</th>
                                <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">User</th>
                                <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Medicines</th>
                                <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Total Amount</th>
                                <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((history, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                                >
                                    <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{history.buyerEmail}</td>
                                    <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                        {history.medicineName.join(", ")}
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">${history.totalPrice}</td>
                                    <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                        <span
                                            className={`px-3 py-1 inline-flex leading-tight rounded-full ${history.paymentStatus === 'Paid'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                        >
                                            {history.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No payment history available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SellerPayHistory;
