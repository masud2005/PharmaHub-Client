
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';
import SectionTitle from '../../../components/Shared/SectionTitle/SectionTitle';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })

    return (
        <>
            {/* Header */}
            <SectionTitle heading={'Payment History'} subHeading={'View payment details with Email, transaction ID and status.'} />

            <h1 className="text-2xl font-semibold text-teal-600 mb-6">Payment History ({payments.length})</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-teal-600 text-white h-16">
                        <tr>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">#</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Email</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{index + 1}</td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{payment.email}</td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{payment.transactionId}</td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    <span className={`px-3 py-1 inline-flex leading-tight rounded-full ${payment.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {payment.status}
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
        </>
    );
};

export default PaymentHistory;
