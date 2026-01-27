import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const StatsCard = ({ stat, index = 0 }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    // Get the icon component dynamically
    const IconComponent = Icons[stat.icon] || Icons.Activity;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const targetValue = typeof stat.value === 'string'
            ? parseFloat(stat.value)
            : stat.value;

        if (isNaN(targetValue)) {
            setCount(stat.value);
            return;
        }

        const duration = 2000;
        const steps = 60;
        const stepValue = targetValue / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            if (currentStep >= steps) {
                setCount(targetValue);
                clearInterval(timer);
            } else {
                setCount(Math.floor(stepValue * currentStep));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isVisible, stat.value]);

    const getColorClass = () => {
        switch (stat.color) {
            case 'gold':
                return 'from-[#D1AB3E] to-[#FFC439]';
            case 'green':
                return 'from-green-500 to-emerald-600';
            case 'blue':
            default:
                return 'from-[#004BA0] to-[#0066CC]';
        }
    };

    const displayValue = typeof stat.value === 'string' && stat.value.includes('%')
        ? stat.value
        : typeof count === 'number'
            ? count.toLocaleString()
            : count;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="stat-card group relative"
        >
            {/* Glow Effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${getColorClass()} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`}></div>

            {/* Card Content */}
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>

                {/* Icon */}
                <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10" style={{ color: stat.color === 'gold' ? '#D1AB3E' : stat.color === 'green' ? '#10b981' : '#004BA0' }} />
                </div>

                {/* Value */}
                <div className={`text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r ${getColorClass()} bg-clip-text text-transparent`}>
                    {displayValue}
                </div>

                {/* Label */}
                <div className="text-sm md:text-base text-gray-400 font-semibold uppercase tracking-wider">
                    {stat.label}
                </div>

                {/* Decorative Line */}
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${getColorClass()} opacity-50`}></div>
            </div>
        </motion.div>
    );
};

export default StatsCard;
