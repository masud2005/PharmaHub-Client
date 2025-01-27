import React from 'react';
import { useLocation } from 'react-router-dom';
import './invoice.css'
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Invoice = () => {

    // const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    console.log(location);

    const { email, name, price, status, transactionId } = location?.state?.paymentInfo;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            {/* Invoice Content */}
            <div id="invoice" className="max-w-4xl h-[96%] mx-auto p-10 bg-white shadow-lg my-10">
                {/* Invoice Header */}
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center">
                        {/* <img
                            src="https://i.ibb.co/SRbh4WY/Pharma-removebg-preview.png"
                            alt="Website Logo"
                            className="h-16"
                        />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text -mt-3">
                            PharmaHub
                        </h1> */}
                        <img className='-ml-3' src="https://i.ibb.co.com/3k6MjsC/P-Logo.png" alt="Logo..." />
                    </div>
                    <h2 className="text-2xl font-bold">Invoice</h2>
                </div>

                {/* User Information */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold">User Information</h3>
                    <p>
                        <strong>Name:</strong> {name || "Not Available"}
                    </p>
                    <p>
                        <strong>Email:</strong> {email || "Not Available"}
                    </p>
                </div>

                {/* Purchase Information */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold">Purchase Information</h3>
                    <p>
                        <strong>Transaction ID:</strong> {transactionId || "Not Available"}
                    </p>
                    <p>
                        <strong>Total Price:</strong> ₹{price || "0"}
                    </p>
                    {/* <p>
                        <strong>Status:</strong> {"Pending"}
                    </p> */}
                </div>

                {/* Print Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handlePrint}
                        className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
                    >
                        Print Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
