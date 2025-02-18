import React from "react";
import { FaShippingFast, FaUserShield, FaHeadset, FaThumbsUp } from "react-icons/fa";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaShippingFast size={40} className="text-teal-600" />,
            title: "Fast & Reliable Delivery",
            description: "Get your medicines delivered quickly and securely to your doorstep."
        },
        {
            icon: <FaUserShield size={40} className="text-teal-600" />,
            title: "100% Genuine Products",
            description: "We ensure all medicines are authentic and sourced from trusted suppliers."
        },
        {
            icon: <FaHeadset size={40} className="text-teal-600" />,
            title: "24/7 Customer Support",
            description: "Our dedicated support team is available round the clock to assist you."
        },
        {
            icon: <FaThumbsUp size={40} className="text-teal-600" />,
            title: "Best Price Guaranteed",
            description: "We offer competitive prices with amazing discounts and deals."
        }
    ];

    return (
        <section className="pb-10">
            <div className="container mx-auto px-2 text-center">
                <SectionTitle heading={'Why Choose Us?'} subHeading={'We are committed to providing you with the best online pharmacy experience.'} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border">
                            {feature.icon}
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 mt-2">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
