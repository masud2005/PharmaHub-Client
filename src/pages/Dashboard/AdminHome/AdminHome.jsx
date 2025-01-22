import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch revenue stats
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["revenue"],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            console.log(res.data);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-blue-500"></div>
                <span className="ml-4 text-lg text-gray-600">Loading...</span>
            </div>
        );
    }

    return (
        <div className="px-1 mt-10">
            {/* Admin Dashboard Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500">
                    Admin Dashboard
                </h1>
                <p className="mt-2 text-lg text-gray-600">Overview of your platform's performance and statistics</p>
            </div>

            {/* Revenue Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {/* Total Revenue */}
                <div className="relative bg-gradient-to-br from-green-400 to-green-600 shadow-lg rounded-lg p-6 lg:p-4 xl:p-6 2xl:p-8 text-white">
                    <div className="absolute top-4 right-4 bg-white bg-opacity-20 p-2 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-3.333 0-5 2.5-5 5s1.667 5 5 5 5-2.5 5-5-1.667-5-5-5z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold">Total Revenue</h2>
                    <p className="text-4xl font-bold mt-4">
                        ${stats.totalRevenue || 0}
                    </p>
                </div>

                {/* Paid Total */}
                <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg rounded-lg p-6 lg:p-4 xl:p-6 2xl:p-8 text-white">
                    <div className="absolute top-4 right-4 bg-white bg-opacity-20 p-2 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12h.01M12 15v.01M12 9v.01M9 12h.01" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold">Paid Total</h2>
                    <p className="text-4xl font-bold mt-4">
                        ${stats.paidTotal || 0}
                    </p>
                </div>

                {/* Pending Total */}
                <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg rounded-lg p-6 lg:p-4 xl:p-6 2xl:p-8 text-white">
                    <div className="absolute top-4 right-4 bg-white bg-opacity-20 p-2 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M9 8v8M15 8v8" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold">Pending Total</h2>
                    <p className="text-4xl font-bold mt-4">
                        ${stats.pendingTotal || 0}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
