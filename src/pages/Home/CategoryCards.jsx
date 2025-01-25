import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const CategoryCards = () => {
    const axiosPublic = useAxiosPublic();

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosPublic.get("/categories");
            console.log(res.data);
            return res.data;
        },
    });

    return (
        <div className='container mx-auto px-2'>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <Link to={`/categories/${category.category}`} key={index} className="p-4 shadow-lg rounded-2xl bg-white">
                        <img
                            src={category.imageURL}
                            alt={category.category}
                            className="h-28 sm:h-36 md:h-32 xl:h-36 2xl:h-40 w-full object-cover rounded-md mb-3"
                        />
                        <h3 className="text-lg font-semibold">{category.category}</h3>
                        <p className="text-gray-600">Medicines: {category.count}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryCards;