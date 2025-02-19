import { useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const Cart = () => {
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    // console.log(cart);

    // Function to handle quantity change
    const handleQuantityChange = async (id, newQuantity, pricePerUnit) => {
        if (newQuantity < 1) return;
        try {
            const totalPrice = newQuantity * pricePerUnit;
            const res = await axiosSecure.put(`/carts/${id}`, { quantity: newQuantity, totalPrice });
            if (res.data.modifiedCount > 0) {
                refetch();
            }
        } catch (error) {
            toast.error("Something went wrong! Please try again.");
        }
    };

    // Function to remove medicine from cart
    const handleRemoveMedicine = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/carts/${id}`);
                    if (res.data.deletedCount > 0) {
                        toast.success("Successfully deleted.");
                        refetch();
                    }
                } catch {
                    toast.error("Something went wrong. Please try again!");
                }
            }
        });
    };

    // Function to clear the entire cart
    const handleClearCart = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "All items in your cart will be removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, clear it!",
            confirmButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/carts?email=${user?.email}`);
                    if (res.data.deletedCount > 0) {
                        toast.success("Cart cleared successfully.");
                        refetch();
                    }
                } catch {
                    toast.error("Something went wrong. Please try again!");
                }
            }
        });
    };

    return (
        <div className="container mx-auto  px-5 xl:px-0">
            <Helmet>
                <title>My Cart || PharmaHub</title>
            </Helmet>

            {/* Section Header */}
            <SectionTitle heading={'My Cart'} subHeading={'Manage your cart and proceed to checkout'} />

            {cart.length === 0 ? (
                <p className="text-center text-2xl font-medium text-gray-600 ">
                    Your cart is empty. Start adding items!
                </p>
            ) : (
                <div className="space-y-6 pb-10">
                    <h2 className="text-2xl font-semibold text-teal-600 mb-6">Your Cart ({cart.length})</h2>
                    {cart.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between gap-4 p-4 border rounded-lg shadow-sm relative"
                        >
                            {/* Left: Medicine Info and Controls */}
                            <div className="flex items-center gap-4 w-full">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="md:flex space-y-3 md:space-y-0">
                                    <div className="w-full md:w-[150px]">
                                        <p className="font-semibold text-lg">{item.name}</p>
                                        <p className="text-sm text-gray-500">{item.company}</p>
                                        <p className="text-teal-600 font-medium text-base">
                                            Total: ₹{item.quantity * item.pricePerUnit}
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            disabled={item.quantity <= 1}
                                            onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.pricePerUnit)}
                                            className={`px-3 py-1 rounded-full border ${item.quantity <= 1
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                : "bg-teal-100 hover:bg-teal-200 text-teal-600"
                                                }`}
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 bg-gray-100 border rounded-lg">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.pricePerUnit)}
                                            className="px-3 py-1 rounded-full border bg-teal-100 hover:bg-teal-200 text-teal-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Delete Button */}
                            <button
                                onClick={() => handleRemoveMedicine(item._id)}
                                className="absolute -right-4 -top-4 p-3 bg-red-200 rounded-full text-red-500 hover:text-red-600"
                            >
                                <FaTrashAlt size={18} />
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={handleClearCart}
                            className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600"
                        >
                            Clear Cart
                        </button>
                        <Link to="/checkout">
                            <button className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-700">
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
