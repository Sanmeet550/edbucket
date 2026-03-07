import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ArrowRight, ShieldCheck, Users, LineChart, Cpu, Sparkles, Search, MapPin, Building2, ChevronDown, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import herosection4 from '../assets/herosection4.png'

const Hero = () => {
    return (
        <section className="relative pt-24 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-background">
            {/* 1. Subtle World Map Grid (Base Layer) */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="world-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#world-dots)" />
                </svg>
            </div>

            {/* 2. Soft Depth Glows (Atmosphere) */}
            <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.15, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] right-[-5%] w-[60%] h-[70%] bg-indigo-500/10 blur-[130px] rounded-full"
                />
                <motion.div
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                        scale: [0.9, 1.05, 0.9]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-accent/5 blur-[110px] rounded-full"
                />
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-20 items-center min-h-[70vh]">

                    {/* Left Column: B2B Focused Content */}
                    <div className="relative text-left py-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm font-bold text-primary dark:text-accent/80 border border-white/10 shadow-sm backdrop-blur-md"
                        >
                            <Sparkles size={16} className="text-secondary" />
                            <span className="tracking-wide uppercase">Global Education Enablement Platform</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-2xl md:text-6xl lg:text-5xl font-heading font-extrabold mb-6 tracking-tight leading-[1.1] text-primary xl:max-w-3xl"
                        >
                            A Centralized Platform for Global Education Partnerships  <br />
                            <span className="brand-gradient-text">Study Abroad Sucess</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed font-medium"
                        >
                            A unified platform for education consultancies and institutions to manage admissions, documentation, and partner workflows.
                        </motion.p>

                        {/* CTA Actions */}
                        <div className="flex flex-wrap gap-4 mb-12">
                            <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-900/20">
                                Become a Partner <ArrowRight size={20} />
                            </button>
                        </div>

                        {/* Partnership Trust Bar */}
                        <div className="flex flex-wrap gap-8 pt-8 border-t border-slate-200 dark:border-slate-800/50">
                            {[
                                { icon: ShieldCheck, text: "99% Compliance Success" },
                                { icon: LineChart, text: "35% Growth YoY for Partners" },
                                { icon: Globe, text: "800+ Direct University Links" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 + (i * 0.1) }}
                                    className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-sm"
                                >
                                    <item.icon size={18} className="text-secondary opacity-70" />
                                    {item.text}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Visual Atmosphere System (B2B SaaS Theme) */}
                    <div className="relative h-full flex items-center justify-center min-h-[500px] lg:min-h-[600px]">

                        {/* Success Indicators System (Floating Dashboard Elements) */}
                        <div className="absolute inset-x-[-10%] inset-y-[-10%] z-30 pointer-events-none">






                            {/* Center Visual: The B2B Hub Illustration */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute inset-0 flex items-center justify-center -z-10"
                            >
                                <div className="relative w-full aspect-square max-w-[600px] lg:max-w-[850px] flex items-center justify-center">
                                    {/* Glass Glow Behind */}
                                    <div className="absolute inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-[120px] animate-pulse" />

                                    <div className="relative w-full h-full flex items-center justify-center group">
                                        <img
                                            src={herosection4}
                                            alt="EdBucket Platform"
                                            className="w-full h-full object-contain transform scale-100 group-hover:scale-110 transition-transform duration-1000 drop-shadow-2xl"
                                        />
                                    </div>

                                    {/* Global Connection Rings */}
                                    <svg className="absolute inset-[-10%] w-[120%] h-[120%] pointer-events-none opacity-30">
                                        <motion.circle
                                            cx="50%" cy="50%" r="40%"
                                            stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" fill="none"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                                        />
                                        <motion.circle
                                            cx="50%" cy="50%" r="30%"
                                            stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" fill="none"
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                        />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
