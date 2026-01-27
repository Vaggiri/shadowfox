import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';

const newsItems = [
    {
        id: 1,
        title: "Rohit Sharma hits record-breaking century in practice match",
        category: "Team Update",
        date: "2 Hours ago",
        image: "https://images.unsplash.com/photo-1531415074968-055db64351a6?auto=format&fit=crop&q=80&w=800",
        size: "large"
    },
    {
        id: 2,
        title: "Mumbai Indians launch new jersey for IPL 2026",
        category: "Announcement",
        date: "1 Day ago",
        image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=800",
        size: "small"
    },
    {
        id: 3,
        title: "Scouting Report: New young talent joins the camp",
        category: "Scouting",
        date: "2 Days ago",
        image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=800",
        size: "small"
    },
    {
        id: 4,
        title: "Fan Fest 2026: Everything you need to know",
        category: "Events",
        date: "3 Days ago",
        image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800",
        size: "wide"
    }
];

const News = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-24 px-4 container mx-auto"
        >
            <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
                <div>
                    <h1 className="text-5xl font-black italic tracking-tighter mb-2">LATEST <span className="text-[var(--color-secondary)]">NEWS</span></h1>
                    <p className="text-gray-400">Stay updated with the latest from the MI camp.</p>
                </div>
                <div className="hidden md:flex space-x-2">
                    {['All', 'Interviews', 'Reports', 'Announcements'].map(cat => (
                        <button key={cat} className="px-4 py-2 rounded-full border border-gray-700 text-sm hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] transition-colors">
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
                {newsItems.map((item, index) => (
                    <NewsCard key={item.id} item={item} index={index} />
                ))}
            </div>
        </motion.div>
    );
};

const NewsCard = ({ item, index }) => {
    const colSpan = item.size === 'large' ? 'md:col-span-2 md:row-span-2' : item.size === 'wide' ? 'md:col-span-2' : 'md:col-span-1';

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative group overflow-hidden rounded-2xl bg-gray-900 ${colSpan}`}
        >
            <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-[var(--color-primary)] text-white text-xs font-bold px-2 py-1 rounded uppercase">{item.category}</span>
                        <span className="text-gray-400 text-xs flex items-center"><Clock size={12} className="mr-1" /> {item.date}</span>
                    </div>

                    <h3 className={`font-bold leading-tight mb-4 text-white group-hover:text-[var(--color-secondary)] transition-colors ${item.size === 'large' ? 'text-3xl' : 'text-xl'}`}>
                        {item.title}
                    </h3>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-sm font-bold text-white">
                        Read Article <ArrowUpRight size={16} className="ml-2" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default News;
