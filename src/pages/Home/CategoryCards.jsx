import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/Shared/SectionTitle/SectionTitle';

const CategoryCards = () => {
    const axiosPublic = useAxiosPublic();

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosPublic.get("/categories");
            // console.log(res.data);
            return res.data;
        },
    });

    return (
        <div className="container mx-auto px-2 pt-8">
            <SectionTitle
                heading={"Medicine Categories"}
                subHeading={"Discover medicines by category with images and counts"}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 ">
                {categories.map((category, index) => (
                    <Link
                        to={`/categories/${category.category}`}
                        key={index}
                        className="relative p-4 shadow-lg rounded bg-gradient-to-br from-white via-teal-50 to-gray-100 hover:shadow-xl transition duration-300 border border-teal-200"
                    >
                        <div className="relative h-28 sm:h-36 md:h-32 xl:h-40 2xl:h-44 overflow-hidden rounded group">
                            <img
                                src={category.imageURL}
                                alt={category.category}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-105"
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-bold text-gray-800">{category.category}</h3>
                            <p className="text-sm md:text-base text-gray-500 mt-1">Medicines: {category.count}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryCards;