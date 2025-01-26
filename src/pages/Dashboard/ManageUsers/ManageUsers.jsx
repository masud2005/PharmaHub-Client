import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import SectionTitle from '../../../components/Shared/SectionTitle/SectionTitle';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleRoleChange = async (user, newRole) => {
        try {
            const res = await axiosSecure.patch(`/users/${user._id}/role`, { role: newRole });
            refetch();
            toast.success(`${user.name} has been successfully updated to ${newRole}!`);
        } catch (error) {
            toast.error(`Failed to update ${user.name} to ${newRole}. Please try again.`);
        }
    };

    return (
        <>
            {/* Heading */}
            <SectionTitle heading={'Manage Users'} subHeading={'Upgrade or downgrade user roles with ease'} />

            <h1 className="text-2xl font-semibold text-teal-600 mb-6">Manage Users ({users.length})</h1>
            <div className="overflow-x-auto mb-10">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-teal-600 text-white h-16">
                        <tr>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">#</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Name</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Email</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Present Role</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Update Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                            >
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                    <span
                                        className={`px-3 py-1 inline-flex leading-tight rounded-full ${user.role === 'Admin'
                                            ? 'bg-green-100 text-green-700'
                                            : user.role === 'Seller'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 border-b text-sm md:text-base">
                                    <select
                                        className="w-full min-w-[120px] text-sm border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        onChange={(e) => handleRoleChange(user, e.target.value)}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select role
                                        </option>
                                        <option value="Admin">Admin</option>
                                        <option value="Seller">Seller</option>
                                        <option value="User">User</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManageUsers;
