import React from "react";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const ContactUs = () => {
    return (
        <div className="">
            <div className="container mx-auto p2-4">
                <SectionTitle heading={'Contact Us'} subHeading={"We're here to help! Reach out to us for any questions, feedback, or support."} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
                    {/* Contact Information */}
                    <div className="bg-white p-8 rounded-lg shadow-md border">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            Get in Touch
                        </h3>
                        <div className="space-y-4">
                            {/* Phone Number */}
                            <div className="flex items-center gap-4">
                                <span className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                                    📞
                                </span>
                                <div>
                                    <p className="text-gray-600">Phone</p>
                                    <p className="text-gray-800 font-medium">
                                        +880 1234 567890
                                    </p>
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="flex items-center gap-4">
                                <span className="bg-green-100 text-green-600 p-3 rounded-full">
                                    ✉️
                                </span>
                                <div>
                                    <p className="text-gray-600">Email</p>
                                    <p className="text-gray-800 font-medium">
                                        support@pharmahub.com
                                    </p>
                                </div>
                            </div>

                            {/* Office Address */}
                            <div className="flex items-center gap-4">
                                <span className="bg-purple-100 text-purple-600 p-3 rounded-full">
                                    🏢
                                </span>
                                <div>
                                    <p className="text-gray-600">Office Address</p>
                                    <p className="text-gray-800 font-medium">
                                        123 Pharmacy Road, Dhaka, Bangladesh
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-md border">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            Send Us a Message
                        </h3>
                        <form className="space-y-4">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;