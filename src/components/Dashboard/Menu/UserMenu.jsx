import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
        <div>
            <li>
                <NavLink to="/dashboard/pay-history">
                    <FaHome /> Payment History</NavLink>
            </li>
        </div>
    );
};

export default UserMenu;