import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

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
        <div className="mx-auto py-10">
            <h2 className="text-4xl font-semibold mb-6 text-center">Manage Categories</h2>

            <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary mb-6"
            >
                Add New Category
            </button>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="text-base">
                            <th>
                                #
                            </th>
                            <th>Image & Name</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines.map((item, idx) => (
                                <tr key={item._id} className="text-base">
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
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
                                    <td>
                                        <p>{item.category}</p>
                                    </td>
                                    <td>{item.company}</td>
                                    <th>
                                        <button className="btn btn-ghost text-lg"><FaEdit /></button>
                                        <button className="btn btn-ghost text-lg"><FaTrash />    </button>
                                    </th>
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
