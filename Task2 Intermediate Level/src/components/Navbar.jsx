import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'The Squad', path: '/squad' },
        { name: 'Matches', path: '/matches' }, // Future
        { name: 'News', path: '/news' }, // Future
    ];

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-glass">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
                    MUMBAI <span className="text-[var(--color-secondary)]">INDIANS</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8">
                    {links.map((link) => (
                        <Link key={link.name} to={link.path} className="relative group text-sm font-medium uppercase tracking-widest text-gray-300 hover:text-white transition-colors">
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-secondary)]"
                                />
                            )}
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-secondary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[var(--color-darker)] border-b border-gray-800"
                    >
                        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-gray-300 hover:text-[var(--color-secondary)]"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
