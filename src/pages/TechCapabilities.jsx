import React from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, Cpu, ShieldCheck, Zap, BarChart3, Cloud } from 'lucide-react'

const techFeatures = [
    {
        icon: LayoutDashboard,
        title: 'White-Label Portal',
        desc: 'Offer your own branded student portal. Complete with your logo, colors, and unique domain to maintain brand loyalty.',
    },
    {
        icon: Cpu,
        title: 'AI-Powered Matching',
        desc: 'Our intelligent algorithms match students to the best-fit programs and universities based on academic profiles and career goals.',
    },
    {
        icon: ShieldCheck,
        title: 'Military-Grade Security',
        desc: 'We use advanced encryption and secure cloud infrastructure to ensure your partner and student data is always protected.',
    },
    {
        icon: BarChart3,
        title: 'Real-Time Analytics',
        desc: 'Track application funnels, conversion rates, and commission payouts in real-time through a comprehensive partner dashboard.',
    },
    {
        icon: Zap,
        title: 'Automated Processing',
        desc: 'Reduce operational overhead with automated document verification and pre-screening workflows.',
    },
    {
        icon: Cloud,
        title: 'Cloud Scalability',
        desc: 'Built on high-performance cloud infrastructure to ensure 99.9% uptime and lightning-fast portal response times.',
    }
]

const TechCapabilities = () => {
    return (
        <div className="pt-32 pb-24 px-6 bg-slate-950 text-white min-h-screen">
            <div className="container mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-accent uppercase bg-accent/10 rounded-full border border-accent/20"
                    >
                        Technology Stack
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-8 italic">Platform <span className="brand-gradient-text">Capabilities</span></h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                        Leverage our industry-leading SaaS platform to manage every aspect of the international student recruitment journey. Edge-case technology for elite performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techFeatures.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-900/50 border border-white/5 p-10 rounded-[3rem] hover:border-accent/30 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform">
                                <tech.icon size={30} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold mb-4">{tech.title}</h3>
                            <p className="text-slate-400 font-medium leading-relaxed">
                                {tech.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 p-12 lg:p-20 rounded-[4rem] bg-brand-gradient text-white text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8">Integrated API Access</h2>
                        <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto font-medium">
                            Connect your existing CRM or internal systems directly with our robust API for a truly integrated recruitment experience.
                        </p>
                        <button className="bg-white text-primary px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transition-all">
                            View API Documentation
                        </button>
                    </div>
                    {/* Decorative Background Icon */}
                    <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                        <Cpu size={500} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TechCapabilities
