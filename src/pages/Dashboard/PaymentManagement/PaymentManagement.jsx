import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import SectionTitle from '../../../components/Shared/SectionTitle/SectionTitle';

const PaymentManagement = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    const handleAcceptPayment = async (id) => {
        try {
            const res = await axiosSecure.patch(`/payments/${id}`, { status: 'Paid' });
            if (res.data.modifiedCount > 0) {
                toast.success('Payment status updated successfully.');
                refetch(); // Fetch the updated data
            }
        } catch (error) {
            toast.error('Failed to update payment.');
        }
    };

    return (
        <>
            {/* Header */}
            <SectionTitle heading={'Payment Management'} subHeading={"View and manage all payments. Approve pending payments with a single click"} />

            <h1 className="text-2xl font-semibold text-teal-600 mb-6">
                Payment Management ({payments.length})
            </h1>
            <div className="overflow-x-auto mb-10">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-teal-600 text-white h-16">
                        <tr>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">#</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Name</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Amount</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Status</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr
                                key={payment._id}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                            >
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    {payment.name}
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    {payment.transactionId}
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    ₹{payment.price}
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base">
                                    <span
                                        className={`px-3 py-1 inline-flex leading-tight rounded-full ${
                                            payment.status === 'Paid'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base">
                                    <button
                                        disabled={payment.status !== 'Pending'}
                                        onClick={() => handleAcceptPayment(payment._id)}
                                        className={`w-36 text-sm md:text-base py-2 px-3 rounded ${
                                            payment.status !== 'Pending'
                                                ? 'bg-gray-300 cursor-not-allowed text-black'
                                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                                        }`}
                                    >
                                        {payment.status === 'Pending' ? 'Accept Payment' : 'Already Paid'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PaymentManagement;
