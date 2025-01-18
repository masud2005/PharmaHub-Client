import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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
        <div>
            <div className='  mx-auto py-10'>
                <h2 className="text-4xl">Total Users: {users.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className='text-base'>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Present Role</th>
                                <th>Update Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <select
                                            className="select select-bordered text-base w-full max-w-xs"
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                            defaultValue={user.role || ''}
                                        >
                                            <option value="" disabled>Select role</option>
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
            </div>
        </div>
    );
};

export default ManageUsers;
