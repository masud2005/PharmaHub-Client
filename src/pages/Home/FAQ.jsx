
import React, { useState } from "react";
// import LottieFAQ from '../assets/lottie/FAQ.json';
import LottieFAQ from '../../assets/FAQ.json'
import Lottie from "lottie-react";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const FAQ = () => {
    // Set the first question (index 0) as active by default
    const [activeIndex, setActiveIndex] = useState(0);

    const faqs = [
        {
            question: "What types of medicines do you offer?",
            answer:
                "We offer a wide range of prescription and over-the-counter (OTC) medicines, including generic and branded medications, for various health conditions.",
        },
        {
            question: "How can I place an order on your website?",
            answer:
                "To place an order, simply search for the medicine or product you need, add it to your cart, and proceed to checkout. You can pay securely online and choose your preferred delivery option.",
        },
        {
            question: "Do you require a prescription for prescription medicines?",
            answer:
                "Yes, for prescription medicines, you need to upload a valid prescription from a licensed healthcare professional during the checkout process.",
        },
        {
            question: "How long does delivery take?",
            answer:
                "Delivery times vary depending on your location. We offer standard and express delivery options. You can check the estimated delivery time during checkout.",
        },
        {
            question: "Is my personal and payment information secure?",
            answer:
                "Absolutely. We use advanced encryption and security measures to protect your personal and payment information. Your data is safe with us.",
        },
        {
            question: "Can I return or exchange a product?",
            answer:
                "Yes, we have a hassle-free return and exchange policy. If you receive a damaged or incorrect product, please contact our customer support within 7 days of delivery.",
        },
        {
            question: "Do you offer discounts or promotions?",
            answer:
                "Yes, we regularly offer discounts, promotions, and special deals. Check our 'Offers' section or subscribe to our newsletter to stay updated.",
        },
        {
            question: "How can I contact customer support?",
            answer:
                "You can reach our customer support team via phone, email, or live chat. Our support is available 24/7 to assist you with any queries or concerns.",
        },
    ];

    const toggleFAQ = (index) => {
        // Toggle the active state; if clicked, close; otherwise open
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto my-10 px-2 xl:px-0">
            {/* Section Header */}
            <SectionTitle heading={'FAQ'} subHeading={'Find answers to common questions about our services and products'} />
            

            {/* FAQ Items */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
                <div className="col-span-1">
                    <Lottie className="h-[350px] md:h-[400px] lg:h-[600px]" animationData={LottieFAQ} />
                </div>
                <div className="col-span-2 space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border overflow-hidden transition-shadow duration-300 ${activeIndex === index ? "shadow-lg bg-gradient-to-r from-teal-500 to-pink-500 p-[1px]" : "border-gray-300"
                                }`}
                        >
                            <div
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center bg-gray-100 p-5 cursor-pointer"
                            >
                                <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                                <span
                                    className={`text-2xl font-bold text-teal-500 transform transition-transform ${activeIndex === index ? "rotate-180" : "rotate-0"
                                        }`}
                                >
                                    {activeIndex === index ? "−" : "+"}
                                </span>
                            </div>
                            {activeIndex === index && (
                                <div className="bg-white px-5 py-4 text-gray-700">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;