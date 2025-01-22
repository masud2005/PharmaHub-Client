import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const SellerMenu = () => {
    return (
        <div>
            <li>
                <NavLink to="/dashboard/seller-home">
                    <FaHome /> Seller Home</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-medicines">
                    <FaHome /> Manage Medicines</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/payment-history">
                    <FaHome /> Payment History</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/advertisement">
                    <FaHome /> Ask For Advertisement</NavLink>
            </li>
        </div>
    );
};

export default SellerMenu;