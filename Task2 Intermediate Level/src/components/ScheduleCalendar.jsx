import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Ticket, Home, Plane } from 'lucide-react';
import { schedule2026 } from '../data/schedule';

const ScheduleCalendar = () => {
    const [filter, setFilter] = useState('all'); // 'all', 'home', 'away'

    const filteredMatches = filter === 'all'
        ? schedule2026
        : schedule2026.filter(match => match.type === filter);

    // Group matches by month
    const matchesByMonth = filteredMatches.reduce((acc, match) => {
        const month = new Date(match.date).toLocaleString('default', { month: 'long' });
        if (!acc[month]) acc[month] = [];
        acc[month].push(match);
        return acc;
    }, {});

    return (
        <section className="py-20 bg-gradient-to-b from-[#0f172a] to-[#020617] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full"
                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
                        IPL 2026 <span className="text-[var(--color-secondary)]">SCHEDULE</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#004BA0] to-[#D1AB3E] mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">
                        All 14 league stage matches • April - May 2026
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-gray-800/50 p-1.5 rounded-full backdrop-blur-sm border border-white/10 inline-flex">
                        {[
                            { label: 'All Matches', value: 'all', icon: Calendar },
                            { label: 'Home', value: 'home', icon: Home },
                            { label: 'Away', value: 'away', icon: Plane }
                        ].map(({ label, value, icon: Icon }) => (
                            <button
                                key={value}
                                onClick={() => setFilter(value)}
                                className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 ${filter === value
                                    ? 'bg-[var(--color-primary)] text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Icon size={16} />
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Matches by Month */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-12"
                    >
                        {Object.entries(matchesByMonth).map(([month, matches]) => (
                            <div key={month}>
                                {/* Month Header */}
                                <div className="flex items-center mb-6">
                                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)]">
                                        {month} 2026
                                    </h3>
                                    <div className="flex-1 h-px bg-gradient-to-r from-[#D1AB3E]/50 to-transparent ml-4"></div>
                                    <span className="text-sm text-gray-500 ml-4">{matches.length} matches</span>
                                </div>

                                {/* Matches Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {matches.map((match, index) => (
                                        <MatchCard key={match.id} match={match} index={index} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

const MatchCard = ({ match, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 hover:border-[var(--color-secondary)]/50 rounded-2xl p-6 relative overflow-hidden group transition-all duration-300"
    >
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#004BA0]/20 to-transparent rounded-full blur-3xl group-hover:from-[#D1AB3E]/20 transition-colors duration-500"></div>

        {/* Match Number Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#004BA0] to-[#0066CC] text-white text-xs font-bold px-3 py-1 rounded-full">
            Match #{match.matchNumber}
        </div>

        {/* Home/Away Badge */}
        <div className={`absolute top-4 left-4 ${match.type === 'home' ? 'bg-green-600' : 'bg-orange-600'} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1`}>
            {match.type === 'home' ? <Home size={12} /> : <Plane size={12} />}
            <span className="uppercase">{match.type}</span>
        </div>

        <div className="relative z-10 mt-8">
            {/* Teams */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    {/* MI Logo */}
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#D1AB3E] p-2 overflow-hidden">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/800px-Mumbai_Indians_Logo.svg.png"
                            alt="MI"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <p className="text-xl font-black">MI</p>
                        <p className="text-xs text-gray-500">Mumbai Indians</p>
                    </div>
                </div>

                <div className="text-2xl font-black text-gray-600">VS</div>

                <div className="flex items-center space-x-4">
                    <div>
                        <p className="text-xl font-black text-right">{match.opponent}</p>
                        <p className="text-xs text-gray-500 text-right">{match.opponentFull}</p>
                    </div>
                    {/* Opponent Logo */}
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2" style={{ borderColor: match.opponentColor || '#gray' }}>
                        <img
                            src={match.logo}
                            alt={match.opponent}
                            className="w-12 h-12 object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Match Details */}
            <div className="space-y-3 bg-black/20 rounded-xl p-4 border border-white/5">
                <div className="flex items-center text-gray-300">
                    <Calendar size={16} className="mr-2 text-[var(--color-secondary)]" />
                    <span className="text-sm font-semibold">{match.dateFormatted}</span>
                </div>
                <div className="flex items-center text-gray-300">
                    <Clock size={16} className="mr-2 text-[var(--color-secondary)]" />
                    <span className="text-sm font-semibold">{match.time}</span>
                </div>
                <div className="flex items-center text-gray-300">
                    <MapPin size={16} className="mr-2 text-[var(--color-secondary)]" />
                    <span className="text-sm font-semibold">{match.venue}, {match.city}</span>
                </div>
            </div>

            {/* Action Button */}
            <button className="mt-4 w-full bg-gradient-to-r from-[#004BA0] to-[#0066CC] hover:from-[#D1AB3E] hover:to-[#FFC439] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg">
                <Ticket size={18} />
                <span>Get Tickets</span>
            </button>
        </div>
    </motion.div>
);

export default ScheduleCalendar;
