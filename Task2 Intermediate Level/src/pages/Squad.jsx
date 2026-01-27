import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { players, getBatters, getAllRounders, getBowlers } from '../data/players';
import { TrendingUp, Award, Zap } from 'lucide-react';

const Squad = () => {
    const [filter, setFilter] = useState('All');

    const filteredPlayers = filter === 'All'
        ? players
        : filter === 'Batter'
            ? getBatters()
            : filter === 'All-Rounder'
                ? getAllRounders()
                : getBowlers();

    // Group players by category
    const coreSquad = filteredPlayers.filter(p => p.category === 'core');
    const tradeIns = filteredPlayers.filter(p => p.category === 'trade-in');
    const newAdditions = filteredPlayers.filter(p => p.category === 'new');
    const auctionBuys = filteredPlayers.filter(p => p.category === 'auction');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-24 px-4 bg-gradient-to-b from-[#020617] to-[#0f172a]"
        >
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#004BA0]/30 to-[#D1AB3E]/30 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6"
                    >
                        <Award size={20} className="text-[#D1AB3E]" />
                        <span className="text-sm font-bold uppercase tracking-widest text-white">IPL 2026 Squad</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-4">
                        THE <span className="text-[var(--color-secondary)]">SQUAD</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Meet the champions representing the Blue and Gold. 23 warriors, one family.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-gray-800/50 p-1.5 rounded-full backdrop-blur-sm border border-white/10 inline-flex flex-wrap justify-center gap-2">
                        {['All', 'Batter', 'Bowler', 'All-Rounder'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${filter === type
                                        ? 'bg-[var(--color-primary)] text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Squad Count */}
                <div className="text-center mb-8">
                    <p className="text-gray-400">
                        Showing <span className="text-[var(--color-secondary)] font-bold">{filteredPlayers.length}</span> {filter === 'All' ? 'players' : filter.toLowerCase() + 's'}
                    </p>
                </div>

                {/* Players Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Core Squad */}
                        {coreSquad.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-bold mb-6 flex items-center">
                                    <Zap size={24} className="text-[var(--color-secondary)] mr-2" />
                                    Core Squad
                                    <span className="ml-3 text-sm text-gray-500">({coreSquad.length})</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {coreSquad.map((player, index) => (
                                        <PlayerCard key={player.id} player={player} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trade-Ins */}
                        {tradeIns.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-bold mb-6 flex items-center">
                                    <TrendingUp size={24} className="text-green-500 mr-2" />
                                    Trade-Ins
                                    <span className="ml-3 text-sm text-gray-500">({tradeIns.length})</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {tradeIns.map((player, index) => (
                                        <PlayerCard key={player.id} player={player} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New Additions */}
                        {newAdditions.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-bold mb-6 flex items-center">
                                    <Award size={24} className="text-blue-500 mr-2" />
                                    New Additions
                                    <span className="ml-3 text-sm text-gray-500">({newAdditions.length})</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {newAdditions.map((player, index) => (
                                        <PlayerCard key={player.id} player={player} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Auction Buys */}
                        {auctionBuys.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-bold mb-6 flex items-center">
                                    <Award size={24} className="text-purple-500 mr-2" />
                                    Auction Buys
                                    <span className="ml-3 text-sm text-gray-500">({auctionBuys.length})</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {auctionBuys.map((player, index) => (
                                        <PlayerCard key={player.id} player={player} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const PlayerCard = ({ player, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative h-[420px] w-full perspective-1000 cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                className="w-full h-full relative preserve-3d shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#003066] to-[#001022] rounded-2xl overflow-hidden border border-gray-800 group-hover:border-[var(--color-primary)] transition-colors">
                    {/* Player Image */}
                    <div className="h-72 bg-gradient-to-b from-[#004BA0]/20 to-transparent relative overflow-hidden">
                        <img
                            src={player.image}
                            alt={player.name}
                            className="w-full h-full object-contain object-bottom transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001022] via-transparent to-transparent"></div>

                        {/* Jersey Number Background */}
                        <div className="absolute top-4 right-4 text-7xl font-black text-white/5">
                            {player.number}
                        </div>

                        {/* Role Badge */}
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                            <span className="text-xs font-bold text-[var(--color-secondary)] uppercase">{player.role}</span>
                        </div>
                    </div>

                    {/* Player Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                        <h3 className="text-2xl font-bold italic uppercase leading-tight mb-1">
                            {player.name}
                        </h3>
                        <div className="flex items-center justify-between">
                            <span className="text-[var(--color-secondary)] font-semibold text-sm">
                                #{player.number}
                            </span>
                            <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                                Click for stats
                            </span>
                        </div>
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#004BA0] to-[#003066] rounded-2xl p-6 flex flex-col justify-center items-center text-center rotate-y-180 border-2 border-[var(--color-secondary)] shadow-[0_0_40px_rgba(209,171,62,0.4)]"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                    {/* Jersey Number */}
                    <div className="text-8xl font-black text-white/10 absolute top-4 right-4">
                        {player.number}
                    </div>

                    {/* Player Name */}
                    <h3 className="text-2xl font-bold mb-2 z-10">{player.name}</h3>
                    <p className="text-[var(--color-secondary)] font-semibold mb-6 uppercase text-sm tracking-wider">
                        {player.role}
                    </p>

                    {/* Stats */}
                    <div className="w-full space-y-3 z-10">
                        <StatRow label="Matches" value={player.stats.matches} />
                        <StatRow label="Runs" value={player.stats.runs} />
                        {player.stats.wickets > 0 && <StatRow label="Wickets" value={player.stats.wickets} />}
                        {player.stats.strikeRate > 0 && (
                            <StatRow label="Strike Rate" value={player.stats.strikeRate.toFixed(1)} />
                        )}
                        {player.stats.economy > 0 && (
                            <StatRow label="Economy" value={player.stats.economy.toFixed(1)} />
                        )}
                    </div>

                    {/* Tap to flip back hint */}
                    <p className="text-xs text-white/50 mt-6">Tap to flip back</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const StatRow = ({ label, value }) => (
    <div className="flex justify-between items-center border-b border-white/20 pb-2 px-2">
        <span className="text-blue-100 text-sm">{label}</span>
        <span className="text-xl font-bold text-white">{value}</span>
    </div>
);

export default Squad;
