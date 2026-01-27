import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamStats } from '../data/stats';
import { Trophy, Star, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);


const RealisticTrophy = ({ size = 90 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.5))", // heavy shadow for depth
    }}
  >
    <defs>
      {/* 1. The "Cylinder" Gradient (gives the cup roundness) */}
      <linearGradient id="gold-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#bf953f" />   {/* Dark Bronze */}
        <stop offset="20%" stopColor="#fcf6ba" />   {/* Bright Highlight */}
        <stop offset="45%" stopColor="#b38728" />   {/* Deep Gold Shadow */}
        <stop offset="75%" stopColor="#fcf6ba" />   {/* Secondary Highlight */}
        <stop offset="100%" stopColor="#aa771c" />  {/* Dark Edge */}
      </linearGradient>

      {/* 2. The "Vertical" Gradient (for the base/neck) */}
      <linearGradient id="gold-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fcf6ba" />
        <stop offset="50%" stopColor="#b38728" />
        <stop offset="100%" stopColor="#bf953f" />
      </linearGradient>
      
      {/* 3. Rim Highlight */}
      <linearGradient id="gold-rim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#fcf6ba" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* --- The Trophy Geometry --- */}

    {/* The Base (Pedestal) */}
    <path
      d="M68 216 h120 l-10 -40 h-100 z"
      fill="url(#gold-cylinder)"
      stroke="#583e06"
      strokeWidth="1"
    />
    <rect x="58" y="216" width="140" height="15" rx="4" fill="#3a2c0f" /> {/* Black marble base bottom */}

    {/* The Stem/Neck */}
    <path
      d="M108 140 h40 l10 40 h-60 z"
      fill="url(#gold-cylinder)"
    />
    <circle cx="128" cy="145" r="15" fill="#583e06" opacity="0.3" /> {/* Shadow under cup */}

    {/* The Cup Body */}
    <path
      d="M64 40 C64 40 64 150 128 150 C192 150 192 40 192 40"
      fill="url(#gold-cylinder)"
      stroke="#b38728"
      strokeWidth="1"
    />
    
    {/* The Inside of the Cup (Darker) */}
    <ellipse cx="128" cy="40" rx="64" ry="12" fill="#583e06" />
    <ellipse cx="128" cy="42" rx="60" ry="10" fill="url(#gold-cylinder)" opacity="0.2" />

    {/* The Handles */}
    <path
      d="M192 55 C 220 55, 220 100, 185 110"
      fill="none"
      stroke="url(#gold-vertical)"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <path
      d="M64 55 C 36 55, 36 100, 71 110"
      fill="none"
      stroke="url(#gold-vertical)"
      strokeWidth="12"
      strokeLinecap="round"
    />

    {/* Specular Shine (The "Bling" reflection) */}
    <path
      d="M100 60 Q 110 120 90 130"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.4"
      filter="blur(2px)"
    />
  </svg>
);


const TrophyCabinet = () => {
    const cabinetRef = useRef(null);
    const trophiesRef = useRef([]);

    useEffect(() => {
        // GSAP animations for trophy cabinet
        const trophies = trophiesRef.current;

        trophies.forEach((trophy, index) => {
            if (trophy) {
                gsap.from(trophy, {
                    scrollTrigger: {
                        trigger: trophy,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 100,
                    opacity: 0,
                    rotationY: -180,
                    duration: 1,
                    delay: index * 0.2,
                    ease: 'back.out(1.7)'
                });

                // Hover animation
                trophy.addEventListener('mouseenter', () => {
                    gsap.to(trophy, {
                        y: -20,
                        rotationY: 15,
                        scale: 1.1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                });

                trophy.addEventListener('mouseleave', () => {
                    gsap.to(trophy, {
                        y: 0,
                        rotationY: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={cabinetRef} className="py-20 bg-gradient-to-b from-[#020617] to-[#0f172a] relative overflow-hidden">
            {/* Cabinet Background Lighting */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#D1AB3E]/5 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#D1AB3E]/5 to-transparent"></div>
            </div>

            {/* Spotlight Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D1AB3E]/10 rounded-full filter blur-[150px] animate-pulse-glow"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#D1AB3E]/20 to-[#FFC439]/20 backdrop-blur-sm border border-[#D1AB3E]/30 rounded-full px-6 py-2 mb-6">
                        <Trophy className="text-[#D1AB3E]" size={20} />
                        <span className="text-sm font-bold uppercase tracking-widest text-white">Hall of Champions</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
                        TROPHY <span className="text-[var(--color-secondary)]">CABINET</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#004BA0] to-[#D1AB3E] mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">
                        5-Time Champions • Most Successful IPL Franchise
                    </p>
                </motion.div>

                {/* Glass Cabinet */}
                <div className="max-w-6xl mx-auto">
                    {/* Cabinet Structure */}
                    <div className="relative bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-2xl border-2 border-[#D1AB3E]/20 rounded-3xl p-8 md:p-12 shadow-[0_0_60px_rgba(209,171,62,0.15)]">
                        {/* Cabinet Top Lighting */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent rounded-t-3xl"></div>

                        {/* Shelves */}
                        <div className="relative">
                            {/* Main Trophy Shelf */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 mb-8">
                                {teamStats.championships.map((championship, index) => (
                                    <div
                                        key={championship.year}
                                        className="relative group cursor-pointer"
                                    >
                                        {/* Trophy Pedestal */}
                                            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-[#D1AB3E]/40 group-hover:border-[#D1AB3E] rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
                                                
                                                {/* Optional: Add a "God Ray" background behind the trophy */}
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(209,171,62,0.15),transparent_70%)] group-hover:opacity-100 transition-opacity"></div>

                                                {/* 3D Trophy Icon - REPLACED */}
                                                <div className="flex items-center justify-center mb-4 z-10 relative">
                                                    <div style={{
                                                        transform: 'perspective(600px) rotateX(5deg)', /* Adds subtle 3D tilt */
                                                        transition: 'transform 0.3s ease'
                                                    }}
                                                    className="group-hover:scale-110 transition-transform duration-300"
                                                    >
                                                        {/* Use the new component here */}
                                                        <RealisticTrophy size={100} />
                                                    </div>
                                                </div>

                                                {/* Year */}
                                                <div className="text-center relative z-10">
                                                    <div className="text-4xl font-black bg-gradient-to-r from-[#D1AB3E] via-[#FFC439] to-[#D1AB3E] bg-clip-text text-transparent mb-2 drop-shadow-sm">
                                                        {championship.year}
                                                    </div>

                                                    {/* Details */}
                                                    <div className="text-xs text-gray-400">
                                                        <p className="font-semibold text-gray-300">vs {championship.finalVs}</p>
                                                        <p>{championship.venue}</p>
                                                    </div>
                                                </div>

                                                {/* Winner Badge - Kept the same */}
                                                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-[#D1AB3E] to-[#FFC439] rounded-full p-2 shadow-lg z-20">
                                                    <Star className="text-black" size={16} fill="currentColor" />
                                                </div>
                                            </div>

                                        {/* Label */}
                                        <div className="text-center mt-2">
                                            <p className="text-xs text-[#D1AB3E] font-bold uppercase tracking-wider">
                                                Champion
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Glass Shelf Separator */}
                            <div className="h-px bg-gradient-to-r from-transparent via-[#D1AB3E]/30 to-transparent mb-8"></div>

                            {/* Achievements Shelf */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1 }}
                                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8"
                            >
                                <div className="flex items-center justify-center mb-6">
                                    <Award className="text-[#D1AB3E] mr-2" size={24} />
                                    <h3 className="text-2xl md:text-3xl font-bold">
                                        Key <span className="text-[var(--color-secondary)]">Achievements</span>
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {teamStats.achievements.map((achievement, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 1.2 + index * 0.1 }}
                                            className="flex items-center space-x-3 bg-gray-800/50 rounded-lg p-4 border border-white/5 hover:border-[#D1AB3E]/50 transition-colors group"
                                        >
                                            <Star className="text-[#D1AB3E] group-hover:text-[#FFC439] transition-colors flex-shrink-0" size={20} fill="currentColor" />
                                            <span className="text-gray-200 font-medium text-sm md:text-base">{achievement}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Cabinet Bottom Shadow */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent rounded-b-3xl"></div>
                    </div>

                    {/* Cabinet Shadow */}
                    <div className="h-8 bg-gradient-to-r from-transparent via-black/30 to-transparent blur-xl -mt-4"></div>
                </div>
            </div>
        </section>
    );
};

export default TrophyCabinet;
