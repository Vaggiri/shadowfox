import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Trophy } from 'lucide-react';

const matchesData = {
    upcoming: [
        { id: 1, opponent: 'CSK', date: 'Apr 14, 2026', time: '7:30 PM', venue: 'Wankhede Stadium, Mumbai', logo: '🦁' },
        { id: 2, opponent: 'RCB', date: 'Apr 18, 2026', time: '7:30 PM', venue: 'M. Chinnaswamy Stadium, Bengaluru', logo: '🦅' },
        { id: 3, opponent: 'KKR', date: 'Apr 22, 2026', time: '3:30 PM', venue: 'Eden Gardens, Kolkata', logo: '⚔️' },
    ],
    results: [
        { id: 101, opponent: 'DC', date: 'Apr 10, 2026', result: 'Won by 6 wickets', score: 'MI 180/4 - DC 176/9', logo: '🐯' },
        { id: 102, opponent: 'SRH', date: 'Apr 05, 2026', result: 'Lost by 15 runs', score: 'MI 200/5 - SRH 215/3', logo: '🦅' },
    ]
};

const Matches = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-24 px-4 container mx-auto"
        >
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-4">MATCH <span className="text-[var(--color-secondary)]">CENTER</span></h1>
                <p className="text-gray-400 text-lg">Follow the journey of the champions.</p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
                <div className="bg-gray-800/50 p-1 rounded-full backdrop-blur-sm border border-white/10 flex">
                    {['upcoming', 'results'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                                    ? 'bg-[var(--color-primary)] text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeTab}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {matchesData[activeTab].map((match, index) => (
                            <MatchCard key={match.id} match={match} type={activeTab} index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const MatchCard = ({ match, type, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="bg-glass rounded-2xl p-6 md:p-8 border border-white/5 hover:border-[var(--color-secondary)]/50 transition-colors group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/20 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:bg-[var(--color-secondary)]/20 transition-colors"></div>

        <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-6">
            {/* Teams */}
            <div className="flex items-center space-x-8">
                <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-900 rounded-full flex items-center justify-center text-3xl shadow-lg border-2 border-[var(--color-secondary)]">
                        🌀
                    </div>
                    <span className="font-bold mt-2 block">MI</span>
                </div>

                <div className="text-2xl font-black text-gray-500">VS</div>

                <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full flex items-center justify-center text-3xl shadow-lg border-2 border-gray-600">
                        {match.logo}
                    </div>
                    <span className="font-bold mt-2 block">{match.opponent}</span>
                </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-center md:text-right space-y-2">
                {type === 'upcoming' ? (
                    <>
                        <div className="flex items-center justify-center md:justify-end text-[var(--color-secondary)] font-bold">
                            <Calendar size={16} className="mr-2" /> {match.date}
                        </div>
                        <div className="flex items-center justify-center md:justify-end text-white text-2xl font-bold">
                            <Clock size={20} className="mr-2 text-gray-400" /> {match.time}
                        </div>
                        <div className="flex items-center justify-center md:justify-end text-gray-400 text-sm">
                            <MapPin size={14} className="mr-1" /> {match.venue}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-[var(--color-secondary)] font-black text-xl uppercase tracking-wider">
                            {match.result}
                        </div>
                        <div className="text-white text-lg font-mono">
                            {match.score}
                        </div>
                        <div className="flex items-center justify-center md:justify-end text-gray-500 text-xs">
                            <Calendar size={12} className="mr-1" /> {match.date}
                        </div>
                    </>
                )}
            </div>

            {/* Action */}
            <div className="md:border-l md:border-white/10 md:pl-8 flex items-center">
                <button className="px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all text-sm font-bold whitespace-nowrap">
                    {type === 'upcoming' ? 'Buy Tickets' : 'Highlights'}
                </button>
            </div>
        </div>
    </motion.div>
);

export default Matches;
