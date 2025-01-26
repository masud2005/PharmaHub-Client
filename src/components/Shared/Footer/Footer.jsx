import React from 'react';
import { FaCartPlus, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className="bg-teal-600 text-white py-10 px-2">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info Section */}
                    <div className="flex flex-col">
                        <div className='flex mb-4'>
                            <img className='w-14' src="https://i.ibb.co.com/SRbh4WY/Pharma-removebg-preview.png" alt="Logo..." />
                            <h3 className="text-3xl font-semibold mb-4">PharmaHub</h3>
                        </div>
                        <p>Leading provider of high-quality pharmaceuticals and healthcare products. Trust and quality are at the heart of everything we do.</p>
                        <div className="mt-4">
                            <p><strong>Address:</strong> 123 Pharma Street, Dhaka, Bangladesh</p>
                            <p><strong>Email:</strong> support@pharmahub.com</p>
                            <p><strong>Phone:</strong> +880 1234 567890</p>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="flex md:justify-center">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><NavLink to="/" className="hover:underline">Home</NavLink></li>
                                <li><NavLink to="/shop" className="hover:underline">Shop</NavLink></li>
                                <li><NavLink to="/cart" className="flex gap-1">Cart <FaCartPlus size={24} /></NavLink></li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Media & Newsletter Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="https://www.facebook.com/MasudRana2005" target="_blank" className="text-white hover:text-teal-200"><FaFacebook size={32} /></a>
                            <a href="https://www.linkedin.com/in/masud-rana2005/" target="_blank" className="text-white hover:text-teal-200">
                                <FaLinkedin size={32} />
                            </a>
                            <a href="https://github.com/masud2005" target="_blank" className="text-white hover:text-teal-200"><FaGithub size={32} /></a>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                        <p className="mb-4">Subscribe to our newsletter to stay updated on our latest products and offers.</p>
                        <form>
                            <input type="email" placeholder="Your email" className="w-full p-2 mb-2 rounded" />
                            <button className="bg-teal-800 text-white py-2 px-4 rounded hover:bg-teal-700">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-teal-700 mt-10 pt-4 text-center">
                    <p>&copy; 2025 PharmaHub. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
