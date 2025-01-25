import React from 'react';
import { FaBullhorn, FaHistory, FaHome } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';
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
                    <MdMedicalServices /> Manage Medicines</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/payment-history">
                    <FaHistory /> Payment History</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/advertisement">
                    <FaBullhorn /> Ask For Advertisement</NavLink>
            </li>
        </div>
    );
};

export default SellerMenu;