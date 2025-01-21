import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const PaymentManagement = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            // console.log(res.data);
            return res.data
        }
    })

    const handleAcceptPayment = async (id) => {
        try {
            const res = await axiosSecure.patch(`/payments/${id}`, { status: 'Paid' });
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                toast.success('Payment status updated successfully.');
                refetch(); // Fetch the updated data
            }
        } catch (error) {
            console.error('Failed to update payment:', error);
            toast.error('Failed to update payment.');
        }
    };


    return (
        <div>
            <div className="container mx-auto px-2">
                <h1 className="text-2xl font-bold text-center mb-6">Payment Management</h1>
                <table className="table table-zebra text-base">
                    <thead className='text-base'>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, idx) => (
                            <tr key={payment._id} >
                                <td>{idx + 1}</td>
                                <td>{payment.name}</td>
                                <td>{payment.transactionId}</td>
                                <td>₹{payment.price}</td>
                                <td>{payment.status}</td>
                                <td>
                                    <button
                                        disabled={payment.status !== 'Pending'}
                                        onClick={() => handleAcceptPayment(payment._id)}
                                        className={`w-36 text-base py-3 px-3 rounded ${payment.status !== 'Pending' ? 'bg-gray-300 cursor-not-allowed !text-black' : 'bg-teal-600 hover:bg-teal-700 text-white'
                                            }`}
                                    >
                                        {payment.status ==="Pending" ? 'Accept Payment' : 'Already Paid'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentManagement;