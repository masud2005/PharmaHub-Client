import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";

const ManageCategory = () => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategory, setNewCategory] = useState({
        categoryName: "",
        categoryImage: "",
    });


    const { data: medicines = [], refetch } = useQuery({
        queryKey: ["medicines"],
        queryFn: async () => {
            const res = await axiosSecure.get("/medicines");
            return res.data;
        },
    });

    // console.log(medicines);


    const handleAddCategory = async () => {
        // try {
        //     const res = await axios.post("/api/categories", newCategory);
        //     if (res.data.insertedId) {
        //         toast.success("Category added successfully!");
        //         refetch();
        //         setIsModalOpen(false);
        //         setNewCategory({ categoryName: "", categoryImage: "" });
        //     }
        // } catch (error) {
        //     toast.error("Failed to add category!");
        // }
    };

    const handleUpdateCategory = async (categoryId, updatedData) => {
        // try {
        //     const res = await axios.patch(`/api/categories/${categoryId}`, updatedData);
        //     if (res.data.modifiedCount > 0) {
        //         toast.success("Category updated successfully!");
        //         refetch();
        //         setSelectedCategory(null);
        //     }
        // } catch (error) {
        //     toast.error("Failed to update category!");
        // }
    };

    const handleDeleteCategory = async (categoryId) => {
        // try {
        //     const res = await axios.delete(`/api/categories/${categoryId}`);
        //     if (res.data.deletedCount > 0) {
        //         toast.success("Category deleted successfully!");
        //         refetch();
        //     }
        // } catch (error) {
        //     toast.error("Failed to delete category!");
        // }
    };

    return (    
        <div className="">
            {/* Header */}
            <SectionTitle heading={'Manage Categories'} subHeading={"Add, update, or delete medicine categories easily."} />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-teal-600 ">Medicines ({medicines.length})</h1>
                <button
                    className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition"
                    onClick={() => setShowModal(true)}
                >
                    + Add New Category
                </button>
            </div>  

            {/* <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary mb-6"
            >
                Add New Category
            </button> */}

            <div className="overflow-x-auto mb-10">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    {/* head */}
                    <thead className="bg-teal-600 text-white h-16">
                        <tr className="text-base">
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider"> # </th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Image & Name</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Category</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Company</th>
                            <th className="px-6 border-b text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines.map((item, idx) => (
                                <tr
                                    key={item._id}
                                    className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                                >
                                    <th className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                        {idx + 1}
                                    </th>
                                    <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.imageURL}
                                                        alt="Image..." />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">
                                        <p>{item.category}</p>
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700">{item.company}</td>
                                    <td className="px-6 py-4 border-b text-sm md:text-base text-gray-700 space-x-1">
                                        <button className="btn bg-teal-200   text-lg"><FaEdit /></button>
                                        <button className="btn bg-red-100 text-lg text-red-500"><FaTrashAlt size={18} />   </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* Categories Table */}
            {/* <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>{category.categoryName}</td>
                                <td>
                                    <img
                                        src={category.categoryImage}
                                        alt={category.categoryName}
                                        className="w-16 h-16 object-cover"
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => setSelectedCategory(category)}
                                        className="btn btn-info btn-sm mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCategory(category._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            {selectedCategory ? "Edit Category" : "Add Category"}
                        </h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (selectedCategory) {
                                    handleUpdateCategory(selectedCategory._id, newCategory);
                                } else {
                                    handleAddCategory();
                                }
                            }}
                        >
                            <div className="form-control mb-4">
                                <label className="label">Category Name</label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    value={newCategory.categoryName}
                                    onChange={(e) =>
                                        setNewCategory({
                                            ...newCategory,
                                            categoryName: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">Category Image URL</label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    value={newCategory.categoryImage}
                                    onChange={(e) =>
                                        setNewCategory({
                                            ...newCategory,
                                            categoryImage: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    {selectedCategory ? "Update" : "Add"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCategory;
