import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from './StatsCard';
import { teamStats } from '../data/stats';
import { Trophy, Award, Zap, BarChart3, Star, Home as HomeIcon } from 'lucide-react';

const StatsGrid = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-[#020617] to-[#0f172a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#004BA0]/20 rounded-full filter blur-[120px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D1AB3E]/10 rounded-full filter blur-[120px]"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
                        TEAM <span className="text-[var(--color-secondary)]">STATISTICS</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#004BA0] to-[#D1AB3E] mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        The numbers behind Mumbai Indians' legacy of excellence
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {teamStats.quickStats.map((stat, index) => (
                        <StatsCard key={stat.id} stat={stat} index={index} />
                    ))}
                </div>

                {/* Additional Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* Win Percentage Circle */}
                    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                        <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="url(#gradient)"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 56}`}
                                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - teamStats.overall.winPercentage / 100)}`}
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#D1AB3E" />
                                        <stop offset="100%" stopColor="#FFC439" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-black text-[#D1AB3E]">
                                    {teamStats.overall.winPercentage}%
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-400 font-semibold">Overall Win Rate</p>
                    </div>

                    {/* Championships */}
                    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                        <Trophy className="w-16 h-16 text-[#D1AB3E] mx-auto mb-3" />
                        <div className="text-5xl font-black text-[#D1AB3E] mb-2">
                            {teamStats.overall.titles}×
                        </div>
                        <p className="text-gray-400 font-semibold">IPL Champions</p>
                        <div className="mt-3 text-xs text-gray-500">
                            2013, 2015, 2017, 2019, 2020
                        </div>
                    </div>

                    {/* Playoff Appearances */}
                    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                        <Star className="w-16 h-16 text-[#004BA0] mx-auto mb-3" fill="#0066CC" />
                        <div className="text-5xl font-black bg-gradient-to-r from-[#004BA0] to-[#0066CC] bg-clip-text text-transparent mb-2">
                            {teamStats.overall.playoffAppearances}
                        </div>
                        <p className="text-gray-400 font-semibold">Playoff Appearances</p>
                        <div className="mt-3 text-xs text-gray-500">
                            Most consistent team
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StatsGrid;
