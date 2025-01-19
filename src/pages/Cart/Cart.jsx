import { useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa"; // For delete icon
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Cart = () => {
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();

    // Function to handle quantity change
    const handleQuantityChange = async (id, newQuantity, pricePerUnit) => {
        if (newQuantity < 1) return;
        try {
            const totalPrice = newQuantity * pricePerUnit;
            const res = await axiosSecure.put(`/carts/${id}`, { quantity: newQuantity, totalPrice });
            // console.log(res.data);
            if (res.data.modifiedCount > 0) {
                // toast.success('Quantity and price updated successfully');
                refetch();
            }
        } catch (error) {
            toast.error('Something went wrong! Please try again.');
        }
    };

    // Function to remove medicine from cart
    const handleRemoveMedicine = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            customClass: {
                confirmButton: 'bg-teal-500',
                cancelButton: 'bg-red-500'
            },
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/carts/${id}`);
                    if (res.data.deletedCount > 0) {
                        toast.success('Successfully Deleted');
                        refetch();
                    }
                } catch {
                    toast.error('Something went wrong. Please try again!');
                }
            }
        });
    };

    // Function to clear the entire cart
    const handleClearCart = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "All medicine in your cart will be removed. You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            customClass: {
                confirmButton: 'bg-teal-500',
                cancelButton: 'bg-red-500'
            },
            confirmButtonText: "Yes, delete all!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/carts?email=${user?.email}`);
                    if (res.data.deletedCount > 0) {
                        toast.success('All medicine in your cart have been deleted.');
                        refetch();
                    }
                } catch {
                    toast.error('Something went wrong. Please try again!');
                }
            }
        });
    };

    return (
        <div className="px-2 container mx-auto py-10">
            <h2 className="text-2xl font-semibold mb-4">Your Cart ({cart.length})</h2>

            {cart.length === 0 ? (
                <p className="text-center text-xl font-medium text-red-500">Your cart is empty. Start adding medicines!</p>
            ) : (
                <div>
                    <div className="space-y-4">
                        {cart.map((medicine) => (
                            <div key={medicine._id} className="flex justify-between items-center border-b pb-4">
                                <div className="flex items-center space-x-4">
                                    <img src={medicine.image} alt={medicine.name} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <p className="font-semibold">{medicine.name}</p>
                                        <p className="text-sm text-gray-600">{medicine.company}</p>
                                        {/* <p className="text-lg text-teal-600">₹{medicine.pricePerUnit}</p> */}
                                        <p className="text-lg text-teal-600">₹{medicine.quantity * medicine.pricePerUnit}</p>
                                        {/* <p className="text-lg text-teal-600">Total: ₹{medicine.quantity * medicine.pricePerUnit}</p> */}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            disabled={medicine.quantity <= 1} // Disable if quantity is 1 or less
                                            onClick={() => handleQuantityChange(medicine._id, medicine.quantity - 1, medicine.pricePerUnit)}
                                            className={`bg-gray-200 p-1 rounded-full ${medicine.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            -
                                        </button>
                                        <span>{medicine.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(medicine._id, medicine.quantity + 1, medicine.pricePerUnit)}
                                            className="bg-gray-200 p-1 rounded-full"
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                                <button
                                    onClick={() => handleRemoveMedicine(medicine._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrashAlt size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={handleClearCart}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Clear Cart
                        </button>
                        <Link to="/checkout">
                            <button className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700">
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
