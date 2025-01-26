import React from 'react';
import SectionTitle from '../../components/Shared/SectionTitle/SectionTitle';
import { MdOutlineVerified } from "react-icons/md";

const Testimonials = () => {
    const customersFeedback = [
        {
            "name": "John Doe",
            "feedback": "Great service! The medicines were delivered on time, and the prices are very reasonable.",
            "photo": "https://i.pravatar.cc/150?img=3"
        },
        {
            "name": "Jane Smith",
            "feedback": "I love how easy it is to find and order the medicines I need. Highly recommended!",
            "photo": "https://i.pravatar.cc/150?img=5"
        },
        {
            "name": "Mark Johnson",
            "feedback": "The customer support is excellent. They helped me with my queries instantly!",
            "photo": "https://i.pravatar.cc/150?img=7"
        },
        {
            "name": "Sarah Brown",
            "feedback": "This platform made it so simple to get my prescriptions delivered to my door. I'm very satisfied.",
            "photo": "https://i.pravatar.cc/150?img=8"
        },
        {
            "name": "David Lee",
            "feedback": "Amazing experience! The prices are affordable, and the delivery is quick and reliable.",
            "photo": "https://i.pravatar.cc/150?img=9"
        },
        {
            "name": "Emily Clark",
            "feedback": "I can easily track my orders and get updates. Everything is hassle-free, highly recommend it!",
            "photo": "https://i.pravatar.cc/150?img=10"
        },
        {
            "name": "Chris Evans",
            "feedback": "I've been using this service for months, and it's always been reliable. I trust them with my health.",
            "photo": "https://i.pravatar.cc/150?img=11"
        },
        {
            "name": "Olivia White",
            "feedback": "Fantastic service! Quick delivery and the website is easy to navigate. Very happy with my experience.",
            "photo": "https://i.pravatar.cc/150?img=12"
        }
    ]


    return (
        <div>
            <div className=" py-10 px-5 container mx-auto">
                <SectionTitle heading={'What Customers Say'} subHeading={'Trusted by many, loved by all'} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                    {customersFeedback.map((testimonial, index) => (
                        <div key={index} className="p-6 bg-white rounded-lg shadow-lg  border">
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.photo}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="ml-4">
                                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500 flex items-center gap-1"><MdOutlineVerified size={22} color='green'/> Verified Customer</p>
                                </div>
                            </div>
                            <p className="text-gray-700">{testimonial.feedback}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Testimonials;