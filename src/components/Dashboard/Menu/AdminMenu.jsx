import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <li>
                <NavLink to="/dashboard/admin-home">
                    <FaHome /> Admin Home</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-users">
                    <FaHome /> Manage Users</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-category">
                    <FaHome /> Manage Category</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/payment-management">
                    <FaHome /> Payment Management</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/sales-report">
                    <FaHome /> Sales Report</NavLink>
            </li>
        </>
    );
};

export default AdminMenu;