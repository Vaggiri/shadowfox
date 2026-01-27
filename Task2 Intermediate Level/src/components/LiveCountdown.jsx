import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getNextMatch } from '../data/schedule';

const LiveCountdown = () => {
    const nextMatch = getNextMatch();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const matchDate = new Date(nextMatch.date);
            const now = new Date();
            const difference = matchDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [nextMatch]);

    const TimeUnit = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <motion.div
                key={value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
            >
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#004BA0] to-[#D1AB3E] rounded-2xl blur-xl opacity-50"></div>

                {/* Number Display */}
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-white/10 rounded-2xl px-6 py-4 md:px-8 md:py-6 min-w-[80px] md:min-w-[120px]">
                    <span className="text-4xl md:text-6xl font-black font-mono bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {String(value).padStart(2, '0')}
                    </span>
                </div>
            </motion.div>

            {/* Label */}
            <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mt-3 font-bold">
                {label}
            </span>
        </div>
    );

    return (
        <div className="relative">
            {/* Countdown Display */}
            <div className="flex justify-center items-center gap-3 md:gap-6">
                <TimeUnit value={timeLeft.days} label="Days" />
                <div className="text-4xl md:text-6xl text-[#D1AB3E] font-black self-start mt-4">:</div>
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <div className="text-4xl md:text-6xl text-[#D1AB3E] font-black self-start mt-4">:</div>
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <div className="text-4xl md:text-6xl text-[#D1AB3E] font-black self-start mt-4">:</div>
                <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>

            {/* Match Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-6 md:mt-8"
            >
                <p className="text-sm md:text-base text-gray-400 mb-2">Until Next Match</p>
                <p className="text-xl md:text-2xl font-bold">
                    MI <span className="text-gray-500 mx-2">vs</span>
                    <span className="text-[var(--color-secondary)]">{nextMatch.opponent}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    {nextMatch.dateFormatted} • {nextMatch.time} • {nextMatch.venue}, {nextMatch.city}
                </p>
            </motion.div>
        </div>
    );
};

export default LiveCountdown;
