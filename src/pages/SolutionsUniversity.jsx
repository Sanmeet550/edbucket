import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ConsultationModal from '../components/ConsultationModal'
import {
    ArrowRight,
    Globe,
    BarChart3,
    ShieldCheck,
    Zap,
    Users,
    Building2,
    Target,
    Award,
    CheckCircle2,
    TrendingUp
} from 'lucide-react'

const SolutionsUniversity = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="pt-20 bg-white dark:bg-slate-950 min-h-screen">
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* 1. Premium Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                {/* Visual Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[100px] rounded-full -z-10" />

                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:w-1/2"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-xl border border-primary/20">
                                <Award size={16} /> Global Institution Partner
                            </div>
                            <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-8 leading-[1.1]">
                                Engineering Your <br />
                                <span className="brand-gradient-text">Global Diversity Hub</span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                                Secure high-quality international intake with EdBucket’s institutional growth infrastructure. We don't just find students—we build your global brand equity.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-indigo-900/20"
                                >
                                    Join Our Network <ArrowRight size={22} />
                                </button>

                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="lg:w-1/2 relative"
                        >
                            {/* Diversity Yield Funnel (Unique Visualization) */}
                            <div className="relative glass p-12 rounded-[3.5rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border-white/20 min-h-[450px] flex flex-col justify-between overflow-hidden">
                                {/* Flow Lines Background */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="h-px w-full bg-primary mb-12" style={{ transform: `rotate(-5deg) translateY(${i * 20}px)` }} />
                                    ))}
                                </div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-end mb-12">
                                        <div>
                                            <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-1">Performance Index</div>
                                            <h3 className="text-2xl font-bold">Diversity Yield Funnel</h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-extrabold text-primary">94.8%</div>
                                            <div className="text-[10px] font-bold opacity-50">Conversion ROI</div>
                                        </div>
                                    </div>

                                    {/* Animated Funnel Stages */}
                                    <div className="space-y-6">
                                        {[
                                            { label: "Market Intelligence", val: 100, color: "bg-blue-500" },
                                            { label: "Verified Applications", val: 85, color: "bg-indigo-500" },
                                            { label: "Compliance Verified", val: 72, color: "bg-purple-500" },
                                            { label: "Successful Enrollments", val: 64, color: "bg-emerald-500" }
                                        ].map((stage, i) => (
                                            <div key={i} className="group">
                                                <div className="flex justify-between items-center mb-2 px-2">
                                                    <span className="text-xs font-bold uppercase tracking-wider opacity-60">{stage.label}</span>
                                                    <span className="text-xs font-extrabold text-primary">{stage.val}%</span>
                                                </div>
                                                <div className="h-3 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden border border-slate-200/30 dark:border-white/5">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${stage.val}%` }}
                                                        transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                                                        className={`h-full ${stage.color} relative box-shadow-xl`}
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                                    </motion.div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-12 p-6 glass bg-white/20 dark:bg-white/5 rounded-3xl border-dashed border-primary/20 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-70 italic">Live Optimization Active</span>
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                                                <div className="w-full h-full bg-gradient-to-br from-primary/40 to-secondary/40" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Unique Growth Infrastructure Section (Bespoke content) */}
            <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-secondary uppercase bg-secondary/10 rounded-xl"
                        >
                            Infrastructure
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8">Institutional <span className="brand-gradient-text">Growth Infrastructure</span></h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                            Beyond recruitment. We provide the structural support needed to scale international operations with surgical precision.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Brand Protection",
                                desc: "Rigorous agent training and vetting. We ensure your university's reputation is handled by verified professionals only.",
                                icon: ShieldCheck,
                                color: "from-blue-500/20 to-blue-500/5",
                                iconColor: "text-blue-500"
                            },
                            {
                                title: "Diverse Hotspot Access",
                                desc: "Direct entry into 20+ emerging source markets without the cost of setting up local regional offices.",
                                icon: Globe,
                                color: "from-purple-500/20 to-purple-500/5",
                                iconColor: "text-purple-500"
                            },
                            {
                                title: "Quality Preservation",
                                desc: "Proprietary AI pre-screening ensures only candidates that meet your document and academic standards reach you.",
                                icon: CheckCircle2,
                                color: "from-emerald-500/20 to-emerald-500/5",
                                iconColor: "text-emerald-500"
                            },
                            {
                                title: "Data Transparency",
                                desc: "Real-time visibility into your recruitment pipeline. Every lead, every status, and every source at your fingertips.",
                                icon: BarChart3,
                                color: "from-indigo-500/20 to-indigo-500/5",
                                iconColor: "text-indigo-500"
                            },
                            {
                                title: "Yield Optimization",
                                desc: "Focused lead nurturing and conversion strategies designed to improve the ratio of applicants to enrollments.",
                                icon: TrendingUp,
                                color: "from-amber-500/20 to-amber-500/5",
                                iconColor: "text-amber-500"
                            },
                            {
                                title: "Resource Efficiency",
                                desc: "Reduce institutional overhead by 40% with automated document management and unified status tracking.",
                                icon: Zap,
                                color: "from-secondary/20 to-secondary/5",
                                iconColor: "text-secondary"
                            }
                        ].map((solution, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:border-primary/30 backdrop-blur-xl transition-all duration-500 shadow-sm hover:shadow-xl"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                    <div className={solution.iconColor}>
                                        <solution.icon size={32} />
                                    </div>
                                </div>
                                <h4 className="text-2xl font-bold mb-4">{solution.title}</h4>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{solution.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Global Strategy Section */}
            <section className="py-24 px-6 bg-white dark:bg-slate-950">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:order-2 lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8">Strategic <span className="brand-gradient-text">Expansion</span></h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                                We help universities move beyond traditional markets. Reach untapped talent pools in South Asia, MENA, and LATAM with vetted local expertise.
                            </p>
                            <div className="space-y-6">
                                {[
                                    "Dedicated country market insights",
                                    "Verified local agency partnerships",
                                    "High-touch applicant support services",
                                    "Institutional brand awareness campaigns"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 glass rounded-2xl border-slate-100 dark:border-white/5 border border-dashed">
                                        <CheckCircle2 className="text-primary" size={20} />
                                        <span className="font-bold text-slate-700 dark:text-slate-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:order-1 lg:w-1/2 relative h-[500px] flex items-center justify-center">
                            {/* Unique Visualization for Universities */}
                            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-75" />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="relative w-[400px] h-[400px] border-2 border-primary/20 border-dashed rounded-full flex items-center justify-center"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 glass rounded-xl flex items-center justify-center text-primary shadow-lg">
                                    <Globe size={24} />
                                </div>
                            </motion.div>
                            <div className="absolute glass p-10 rounded-full w-48 h-48 flex items-center justify-center text-center backdrop-blur-3xl border-2 border-primary/30">
                                <div>
                                    <div className="text-3xl font-extrabold text-primary">800+</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 text-slate-900 dark:text-white">Active Partners</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Outreach CTA */}
            <section className="py-24 px-6 relative">
                <div className="container mx-auto">
                    <div className="glass p-12 md:p-20 rounded-[4rem] bg-brand-gradient text-white relative overflow-hidden">
                        <div className="relative z-10 max-w-3xl">
                            <h2 className="text-4xl md:text-6xl font-heading font-extrabold mb-8 leading-tight">Scale Your <br /> Institutional Footprint</h2>
                            <p className="text-lg text-indigo-100/80 mb-10 leading-relaxed font-medium">
                                Ready to diversify your student body with pre-screened, quality talent? Let's build your custom recruitment engine.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl"
                            >
                                Partner With EdBucket Today
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                            <Globe size={400} className="translate-x-1/4 -translate-y-1/4" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SolutionsUniversity
