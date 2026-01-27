import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Trophy, TrendingUp } from 'lucide-react';
import StatsGrid from '../components/StatsGrid';
import TrophyCabinet from '../components/TrophyCabinet';
import LiveCountdown from '../components/LiveCountdown';
import ScheduleCalendar from '../components/ScheduleCalendar';
import { players } from '../data/players';
import { getNextMatch } from '../data/schedule';

const homeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
};

const Home = () => {
    const nextMatch = getNextMatch();

    return (
        <motion.div
            variants={homeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* Enhanced Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#001022]/95 via-[#004BA0]/30 to-[#020617]"></div>

                    {/* Animated Particles */}
                    <div className="absolute inset-0">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-[#D1AB3E] rounded-full"
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: Math.random() * window.innerHeight,
                                    opacity: 0.2
                                }}
                                animate={{
                                    y: [null, -100, window.innerHeight + 100],
                                    opacity: [0.2, 0.5, 0.2]
                                }}
                                transition={{
                                    duration: Math.random() * 10 + 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="container relative z-10 text-center px-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#004BA0]/30 to-[#D1AB3E]/30 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
                            <Trophy size={20} className="text-[#D1AB3E]" />
                            <span className="text-sm font-bold uppercase tracking-widest text-white">5-Time Champions</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter mb-6"
                    >
                        ONE <span className="text-[var(--color-secondary)]">FAMILY</span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                        Welcome to the official hub of the Mumbai Indians.<br />
                        <span className="text-[#D1AB3E] font-semibold">Experience the Legacy. Witness Greatness.</span>
                    </motion.p>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(209, 171, 62, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary px-8 py-4 text-lg"
                        >
                            Meet the Squad
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 text-lg rounded-full border-2 border-white/30 hover:border-[#D1AB3E] hover:bg-white/10 transition-all font-bold backdrop-blur-sm"
                        >
                            View Schedule
                        </motion.button>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    >
                        <div className="text-gray-400 text-sm mb-2">Scroll to explore</div>
                        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-[#D1AB3E] rounded-full mt-2"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Dashboard Section */}
            <StatsGrid />

            {/* Next Match Countdown Section */}
            <section className="py-20 bg-[var(--color-darker)] relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0"
                        style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
                            NEXT <span className="text-[var(--color-secondary)]">MATCH</span>
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-[#004BA0] to-[#D1AB3E] mx-auto mb-4"></div>
                    </motion.div>

                    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden max-w-5xl mx-auto">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/20 rounded-full filter blur-[120px]"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full filter blur-[120px]"></div>

                        <div className="relative z-10">
                            {/* Match Info Header */}
                            <div className="text-center mb-8">
                                <span className="inline-block bg-gradient-to-r from-[#004BA0] to-[#0066CC] text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                                    IPL 2026 • LEAGUE STAGE
                                </span>
                                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                                    MI <span className="text-gray-500 text-2xl mx-3">VS</span>
                                    <span className="text-[var(--color-secondary)]">{nextMatch.opponent}</span>
                                </h3>
                            </div>

                            {/* Countdown */}
                            <LiveCountdown />

                            {/* Action Button */}
                            <motion.div
                                className="text-center mt-8"
                                whileHover={{ scale: 1.05 }}
                            >
                                <button className="bg-gradient-to-r from-[#D1AB3E] to-[#FFC439] hover:from-[#FFC439] hover:to-[#D1AB3E] text-black px-12 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl">
                                    Get Tickets Now
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trophy Cabinet */}
            <TrophyCabinet />

            {/* Full 2026 Schedule */}
            <ScheduleCalendar />

            {/* Key Players Spotlight */}
            <section className="py-20 bg-[#020617] relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#004BA0]/10 rounded-full filter blur-[120px]"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
                            KEY <span className="text-[var(--color-secondary)]">PLAYERS</span>
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-[#004BA0] to-[#D1AB3E] mx-auto mb-4"></div>
                        <p className="text-gray-400 text-lg">
                            Meet the stars powering MI's success
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {players.slice(0, 3).map((player, index) => (
                            <motion.div
                                key={player.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 hover:border-[var(--color-secondary)]/50 rounded-2xl overflow-hidden group transition-all duration-300"
                            >
                                {/* Player Image */}
                                <div className="h-64 bg-gradient-to-b from-[#004BA0]/20 to-transparent relative overflow-hidden">
                                    <img
                                        src={player.image}
                                        alt={player.name}
                                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-[#D1AB3E] text-black font-black text-2xl w-12 h-12 rounded-full flex items-center justify-center">
                                        {player.number}
                                    </div>
                                </div>

                                {/* Player Info */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--color-secondary)] transition-colors">
                                        {player.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
                                        {player.role}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#D1AB3E]">{player.stats.matches}</div>
                                            <div className="text-xs text-gray-500 uppercase">Matches</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#D1AB3E]">{player.stats.runs}</div>
                                            <div className="text-xs text-gray-500 uppercase">Runs</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#D1AB3E]">{player.stats.wickets}</div>
                                            <div className="text-xs text-gray-500 uppercase">Wickets</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <a href="/squad" className="inline-flex items-center text-[var(--color-secondary)] hover:text-white transition-colors font-bold text-lg group">
                            View Full Squad
                            <ChevronRight size={24} className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Latest News */}
            <section className="py-20 bg-gradient-to-b from-[#020617] to-[#0f172a]">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-2">
                                LATEST <span className="text-[var(--color-primary)]">NEWS</span>
                            </h2>
                            <div className="h-1 w-20 bg-[var(--color-secondary)]"></div>
                        </div>
                        <a href="/news" className="flex items-center text-[var(--color-secondary)] hover:text-white transition-colors font-bold group">
                            View All <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { id: 1, title: 'Squad Training Camp Begins', date: '2 Hours Ago', img: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=800", category: 'TRAINING' },
                            { id: 2, title: 'New Jersey Launch 2026', date: '1 Day Ago', img: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=800", category: 'ANNOUNCEMENT' },
                            { id: 3, title: 'Players Ready for IPL 2026', date: '2 Days Ago', img: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=800", category: 'TEAM UPDATE' }
                        ].map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-[var(--color-secondary)]/50 transition-all"
                            >
                                <div className="h-48 relative overflow-hidden">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                                    <span className="absolute top-4 left-4 bg-[var(--color-primary)] text-xs font-bold px-3 py-1 rounded-full">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-secondary)] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        Exclusive updates coming straight from the Mumbai Indians camp as preparations begin for the 2026 season...
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">{item.date}</span>
                                        <TrendingUp size={16} className="text-[var(--color-secondary)]" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
