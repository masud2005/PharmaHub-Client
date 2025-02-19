import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../components/Shared/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import State from './State';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch revenue stats
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["revenue"],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            // console.log(res.data);
            return res.data;
        }
    });

    return (
        <div className="mt-10">
            <Helmet>
                <title>Home || Dashboard || PharmaHub</title>
            </Helmet>
            {/* Admin Dashboard Header */}
            <SectionTitle heading={'Admin Dashboard'} subHeading={"Overview of your platform's performance and statistics"} />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                {/* Total Revenue */}
                <div className="relative bg-gradient-to-br from-green-400 to-green-600 shadow-md rounded-lg p-6 md:px-3 xl:p-6 text-white">
                    <div className="absolute top-4 right-4 bg-white bg-opacity-30 p-2 rounded-full">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8c-3.333 0-5 2.5-5 5s1.667 5 5 5 5-2.5 5-5-1.667-5-5-5z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold tracking-wide uppercase">
                        Total Revenue
                    </h2>
                    <p className="text-4xl font-bold mt-4">${stats.totalRevenue || 0}</p>
                    <p className="mt-2 text-sm text-white/80">
                        Total earnings from all sales.
                    </p>
                </div>

                {/* Paid Total */}
                <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 shadow-md rounded-lg p-6 md:px-3 xl:p-6 text-white">
                    <div className="absolute top-4 right-4 bg-white bg-opacity-30 p-2 rounded-full">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12h.01M12 15v.01M12 9v.01M9 12h.01"
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold tracking-wide uppercase">
                        Paid Total
                    </h2>
                    <p className="text-4xl font-bold mt-4">${stats.paidTotal || 0}</p>
                    <p className="mt-2 text-sm text-white/80">
                        Total payments received.
                    </p>
                </div>

                {/* Pending Total */}
                <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-md rounded-lg p-6 md:px-3 xl:p-6 text-white">
                    <div className="absolute top-4 right-4 bg-white bg-opacity-30 p-2 rounded-full">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h18M9 8v8M15 8v8"
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold tracking-wide uppercase">
                        Pending Total
                    </h2>
                    <p className="text-4xl font-bold mt-4">${stats.pendingTotal || 0}</p>
                    <p className="mt-2 text-sm text-white/80">
                        Payments yet to be received.
                    </p>
                </div>
            </div>

            {/* State */}
            <div className='overflow-auto'>
                <State stats={stats} />
            </div>
        </div>
    );
};

export default AdminHome;
