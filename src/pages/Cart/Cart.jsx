import { useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa"; // For delete icon
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();

    // Function to handle quantity change
    const handleQuantityChange = (id) => {
        console.log(id);
    };

    // Function to remove medicine from cart
    const handleRemoveMedicine = async (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/carts/${id}`)
                console.log(res.data);
                try {
                    if (res.data.deletedCount > 0) {
                        console.log('Successfully Deleted');
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                            timer: 3000
                        });
                        refetch();
                    }
                }
                catch {
                    console.log('Error');
                    Swal.fire({
                        title: "Error!",
                        text: "Something went rong. Please try again!",
                        icon: "error",
                        timer: 3000
                    });
                }
            }
        });
    };

    // Function to clear the entire cart
    const handleClearCart = () => {
        setCart([]);
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
                                        <p className="text-lg text-teal-600">₹{medicine.pricePerUnit}</p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleQuantityChange(medicine._id)}
                                            className="bg-gray-200 p-1 rounded-full"
                                        >
                                            -
                                        </button>
                                        <span>{medicine.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(medicine._id)}
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
