import React from 'react';
import { FaHome, FaMoneyCheckAlt, FaRegImages, FaUsers } from 'react-icons/fa';
import { RiFileList2Line } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <li>
                <NavLink to="/dashboard/admin-home">
                    <FaHome /> Admin Overview</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-users">
                    <FaUsers /> Manage Users</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-category">
                    <MdCategory /> Manage Category</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/payment-management">
                    <FaMoneyCheckAlt /> Payment Management</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/sales-report">
                    <RiFileList2Line /> Sales Report</NavLink>
            </li><li>
                <NavLink to="/dashboard/banner-advertise">
                    <FaRegImages /> Banner Advertise</NavLink>
            </li>
        </>
    );
};

export default AdminMenu;