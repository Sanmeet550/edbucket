import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ConsultationModal from '../components/ConsultationModal'
import {
    ArrowRight,
    TrendingUp,
    Globe,
    Eye,
    ShieldCheck,
    Zap,
    BarChart3,
    Target,
    Users,
    CheckCircle2,
    XCircle,
    Building2,
    Briefcase
} from 'lucide-react'

const SolutionsPartner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="pt-20">
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            {/* 1. Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-50 dark:bg-slate-900/20 -z-20" />
                <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />

                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-3/5"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-xl">
                                <Users size={16} /> Partner Success Ecosystem
                            </div>
                            <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-8 leading-tight">
                                Elevate Your Agency's <br />
                                <span className="brand-gradient-text">Growth Beyond Commissions</span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium max-w-2xl">
                                Unlock predictable, performance-driven revenue with smarter student placements. We provide the infrastructure and support to scale your consultancy globally.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-indigo-900/20"
                                >
                                    Start Your Journey <ArrowRight size={22} />
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="glass px-10 py-5 rounded-2xl font-bold text-lg border border-slate-200 dark:border-white/10 hover:bg-white/50 transition-all flex items-center gap-2"
                                >
                                    Speak to a Specialist
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:w-2/5 relative"
                        >
                            <div className="glass p-10 rounded-[3.5rem] relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border-white/20">
                                <div className="space-y-8 relative z-10">
                                    <div className="p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
                                        <div className="text-3xl font-bold text-emerald-600 mb-1">98%</div>
                                        <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Visa Success Rate</div>
                                    </div>
                                    <div className="p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20">
                                        <div className="text-3xl font-bold text-indigo-600 mb-1">800+</div>
                                        <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Direct University Access</div>
                                    </div>
                                    <div className="p-6 bg-secondary/10 rounded-3xl border border-secondary/20">
                                        <div className="text-3xl font-bold text-secondary mb-1">3.5x</div>
                                        <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Average Revenue Growth</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Challenges We Solve */}
            <section className="py-24 px-6 bg-white dark:bg-slate-900">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6">Friction Points We <span className="text-red-500">Eliminate</span></h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">Traditional recruitment models are plagued by manual processes and limited reach. We solve the core issues holding your agency back.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Revenue Stagnation", desc: "Heavy reliance on a few institutions with inconsistent commission cycles and no performance upside.", icon: TrendingUp },
                            { title: "Manual Compliance", desc: "Endless paperwork and fragmented requirements leading to lower visa success and high overheads.", icon: ShieldCheck },
                            { title: "Limited Portfolio", desc: "Losing students to competitors who have broader access to global university networks and niche programs.", icon: Globe }
                        ].map((challenge, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
                                    <challenge.icon size={28} />
                                </div>
                                <h4 className="text-xl font-bold mb-4">{challenge.title}</h4>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{challenge.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Partner Solutions (6 Blocks) */}
            <section className="py-24 px-6 relative overflow-hidden bg-white dark:bg-slate-950">
                {/* Mesh Gradient Background */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full" />
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-secondary uppercase bg-secondary/10 rounded-xl"
                        >
                            The Solution Suite
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6">End-to-End <span className="brand-gradient-text">Partner Enablement</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Revenue Growth",
                                desc: "Move beyond basic margins. Access performance-led incentives and transparent, accelerated commission lifecycles.",
                                icon: TrendingUp,
                                color: "from-emerald-500/20 to-emerald-500/5",
                                iconColor: "text-emerald-500"
                            },
                            {
                                title: "Global University Access",
                                desc: "Direct representation of 800+ institutions across 20+ global study destinations—all from a single dashboard.",
                                icon: Building2,
                                color: "from-blue-500/20 to-blue-500/5",
                                iconColor: "text-blue-500"
                            },
                            {
                                title: "Application Visibility",
                                desc: "Full real-time transparency into the application lifecycle. No more guessing statuses or waiting for emails.",
                                icon: Eye,
                                color: "from-indigo-500/20 to-indigo-500/5",
                                iconColor: "text-indigo-500"
                            },
                            {
                                title: "Visa Readiness",
                                desc: "In-house expert pre-screening and mock visa sessions to ensure your students have the best success rates.",
                                icon: ShieldCheck,
                                color: "from-amber-500/20 to-amber-500/5",
                                iconColor: "text-amber-500"
                            },
                            {
                                title: "Operational Efficiency",
                                desc: "Automated compliance checks, smart document management, and 24/7 dedicated support execution.",
                                icon: Zap,
                                color: "from-secondary/20 to-secondary/5",
                                iconColor: "text-secondary"
                            },
                            {
                                title: "Market Expansion",
                                desc: "Scale into new demographics and destinations with data-driven market insights and verified local support.",
                                icon: Globe,
                                color: "from-rose-500/20 to-rose-500/5",
                                iconColor: "text-rose-500"
                            }
                        ].map((solution, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative p-10 rounded-[3rem] bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:border-primary/30 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
                            >
                                {/* Decorative Background Pattern */}
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity">
                                    <solution.icon size={120} />
                                </div>

                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                    <div className={solution.iconColor}>
                                        <solution.icon size={32} />
                                    </div>
                                </div>
                                <h4 className="text-2xl font-bold mb-4 group-hover:brand-gradient-text transition-all">{solution.title}</h4>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium relative z-10">{solution.desc}</p>

                                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                    Learn More <ArrowRight size={16} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Business Impact & 5. Outcomes */}
            <section className="py-24 px-6 bg-white dark:bg-slate-900">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8">Measurable <span className="brand-gradient-text">Impact</span></h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                                We help recruitment partners achieve more than just quantity. We focus on qualitative growth that build long-term business value.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { label: "Operational Overhead Reduction", value: "40%" },
                                    { label: "Increase in Lead-to-Admission Conversion", value: "25%" },
                                    { label: "Faster Commission Payout Cycle", value: "3x" }
                                ].map((stat, i) => (
                                    <div key={i} className="relative pt-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs">{stat.label}</span>
                                            <span className="font-extrabold text-primary">{stat.value}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                transition={{ duration: 1, delay: i * 0.2 }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative h-[600px] flex items-center justify-center">
                            {/* Growth Hub Visualization (Something Unique) */}
                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                {/* Blurred Background Glows */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full" />
                                <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-secondary/20 blur-[80px] rounded-full" />

                                {/* Interactive Constellation */}
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {/* Central Node */}
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="relative z-20 w-36 h-36 rounded-full glass border-2 border-primary/30 flex items-center justify-center shadow-2xl shadow-primary/20 backdrop-blur-3xl"
                                    >
                                        {/* Rotating Ring */}
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full scale-125"
                                        />

                                        <div className="text-center px-4">
                                            <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-1 opacity-70">Strategic</div>
                                            <div className="text-xl font-heading font-extrabold brand-gradient-text leading-tight uppercase tracking-tighter">Growth Engine</div>
                                        </div>
                                        {/* Multiple Pulse Effects */}
                                        <div className="absolute inset-x-0 inset-y-0 rounded-full border-2 border-primary animate-ping opacity-10" />
                                        <div className="absolute inset-x-0 inset-y-0 rounded-full border border-secondary animate-pulse opacity-20 scale-110" />
                                    </motion.div>

                                    {/* Satellites */}
                                    {[
                                        { label: "800+ Universities", pos: "top-10 left-10", icon: Building2, color: "text-blue-500", delay: 0 },
                                        { label: "Visa Success", pos: "top-20 right-10", icon: ShieldCheck, color: "text-emerald-500", delay: 0.5 },
                                        { label: "Global Reach", pos: "bottom-20 left-10", icon: Globe, color: "text-secondary", delay: 1 },
                                        { label: "3x Revenue", pos: "bottom-10 right-20", icon: TrendingUp, color: "text-amber-500", delay: 1.5 },
                                    ].map((node, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            animate={{
                                                y: [0, -10, 0],
                                                x: [0, 5, 0]
                                            }}
                                            transition={{
                                                duration: 3 + i,
                                                repeat: Infinity,
                                                delay: node.delay
                                            }}
                                            className={`absolute ${node.pos} z-10 p-5 glass rounded-3xl border border-white/20 shadow-xl flex items-center gap-3 group hover:border-primary/50 transition-colors`}
                                        >
                                            <div className={`p-2 rounded-xl bg-slate-100 dark:bg-white/5 ${node.color}`}>
                                                <node.icon size={20} />
                                            </div>
                                            <span className="text-sm font-bold whitespace-nowrap">{node.label}</span>
                                        </motion.div>
                                    ))}

                                    {/* Connecting SVG Lines (Static but themed) */}
                                    <svg className="absolute inset-0 w-full h-full -z-10 opacity-20" viewBox="0 0 400 400">
                                        <path d="M200,200 L50,50" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" className="text-primary" />
                                        <path d="M200,200 L350,80" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" className="text-primary" />
                                        <path d="M200,200 L60,320" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" className="text-primary" />
                                        <path d="M200,200 L320,350" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" className="text-primary" />
                                    </svg>
                                </div>
                            </div>

                            {/* Floating Outcome Overlay */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="absolute bottom-10 left-10 right-10 p-8 glass bg-slate-900/80 rounded-[2.5rem] border-t border-white/10 z-30"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Predictable Growth</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Zero Compliance Risk</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Final CTA */}
            <section className="py-24 px-6 bg-primary relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px]" />

                <div className="container mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-8">
                            Join the Network Shaping Global Education
                        </h2>
                        <p className="text-xl text-white/80 mb-12 font-medium max-w-2xl mx-auto">
                            Scale your agency with the infrastructure, network, and support you deserve. Let's grow your business together.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-primary px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:bg-slate-100 transition-all flex items-center gap-3"
                            >
                                Get Started Today <ArrowRight size={22} />
                            </motion.button>
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                whileHover={{ bg: "rgba(255,255,255,0.15)" }}
                                className="bg-transparent text-white border-2 border-white/20 px-12 py-[18px] rounded-2xl font-bold text-xl backdrop-blur-xl transition-all"
                            >
                                Book a Consultation
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default SolutionsPartner
