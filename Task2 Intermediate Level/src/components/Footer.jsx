import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[var(--color-darker)] border-t border-gray-800 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-bold mb-4 tracking-tighter">MUMBAI <span className="text-[var(--color-secondary)]">INDIANS</span></h2>
                        <p className="text-gray-400 text-sm mb-6">
                            The official hub of the 5-time IPL champions. One Family, One Team.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Squad</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Matches</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">News</a></li>
                        </ul>
                    </div>

                    {/* Matches */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] w-full"
                            />
                            <button className="bg-[var(--color-secondary)] text-[var(--color-darker)] px-4 py-2 rounded-r-md font-bold hover:bg-yellow-500 transition-colors">
                                <Mail size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; 2026 Mumbai Indians. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Terms</a>
                        <a href="#" className="hover:text-white">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
