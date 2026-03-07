import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Users, Target, LineChart, Cpu, PieChart, ArrowRight, ShieldCheck, Globe, Zap, BarChart3, TrendingUp } from 'lucide-react'

const serviceData = [
    {
        id: 'recruitment',
        title: 'Global Student Recruitment',
        shortDesc: 'Access a pre-screened, diverse pool of high-quality international students.',
        fullDesc: 'Bridge the gap between your institution and high-potential students across 20+ emerging markets. Our verified agent network ensures quality and diversity in every application.',
        icon: Users,
        color: 'from-blue-600 to-indigo-500',
        metrics: [
            { label: 'Verified Agents', value: '1,200+' },
            { label: 'Source Countries', value: '25+' },
            { label: 'Monthly Apps', value: '8,000+' }
        ]
    },
    {
        id: 'intelligence',
        title: 'Market Intelligence',
        shortDesc: 'Data-backed insights into global student recruitment trends.',
        fullDesc: 'Make informed decisions with real-time data on recruitment hotspots, competitor analysis, and student preference shifts. Stay ahead of the global education market curve.',
        icon: LineChart,
        color: 'from-indigo-600 to-purple-500',
        metrics: [
            { label: 'Data Points', value: '1.5M+' },
            { label: 'Accuracy', value: '98.5%' },
            { label: 'Updated', value: 'Live' }
        ]
    },
    {
        id: 'admissions',
        title: 'Verified Admissions',
        shortDesc: 'Automated pre-screening for high visa success rates.',
        fullDesc: 'Our AI-powered engine performs rigorous document verification and compliance checks before applications reach you, significantly reducing institutional overhead.',
        icon: ShieldCheck,
        color: 'from-emerald-600 to-teal-500',
        metrics: [
            { label: 'Visa Success', value: '99%' },
            { label: 'Pre-Screening', value: 'Instant' },
            { label: 'Compliance', value: 'Global' }
        ]
    },
    {
        id: 'branding',
        title: 'Branding & Visibility',
        shortDesc: 'Targeted promotions to a global network of consultants.',
        fullDesc: 'Position your institution at the forefront of the study abroad community. Reach thousands of certified consultants and student-facing platforms through our ecosystem.',
        icon: Target,
        color: 'from-rose-500 to-pink-500',
        metrics: [
            { label: 'Partner Reach', value: '5,000+' },
            { label: 'Impression Rate', value: 'High' },
            { label: 'Engagement', value: '3x Sync' }
        ]
    }
]

const Services = () => {
    const [activeService, setActiveService] = useState(serviceData[0])

    return (
        <section id="services" className="py-24 px-6 bg-white dark:bg-slate-950 overflow-hidden min-h-[900px]">
            <div className="container mx-auto">
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-bold tracking-widest uppercase text-primary bg-primary/10 rounded-xl border border-primary/20"
                    >
                        <Building2 size={16} />
                        Scale Your Impact
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight"
                    >
                        Institutional <span className="brand-gradient-text">Enablement</span>
                    </motion.h2>
                </div>

                <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 relative">
                    {/* Right: Interactive Navigation */}
                    <div className="lg:w-1/2 space-y-4">
                        {serviceData.map((service) => (
                            <motion.div
                                key={service.id}
                                onMouseEnter={() => setActiveService(service)}
                                onClick={() => setActiveService(service)}
                                className={`relative cursor-pointer p-8 rounded-[2.5rem] transition-all duration-500 group border-2 ${activeService.id === service.id
                                        ? 'bg-slate-50 dark:bg-slate-900 border-primary/20 shadow-xl shadow-primary/5'
                                        : 'border-transparent hover:border-slate-100 dark:hover:border-white/5'
                                    }`}
                            >
                                <div className="flex items-start gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeService.id === service.id
                                            ? `bg-gradient-to-br ${service.color} text-white shadow-lg`
                                            : 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-primary'
                                        }`}>
                                        <service.icon size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-2xl font-heading font-bold mb-2 transition-colors ${activeService.id === service.id ? 'text-primary' : 'text-slate-900 dark:text-white'
                                            }`}>
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">
                                            {service.shortDesc}
                                        </p>
                                    </div>
                                    <div className={`mt-2 transition-all duration-500 ${activeService.id === service.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                        }`}>
                                        <ArrowRight className="text-primary" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Left: Dynamic Feature Portal */}
                    <div className="lg:w-1/2 relative lg:sticky lg:top-32 h-fit">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeService.id}
                                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className={`relative p-12 md:p-16 rounded-[4rem] bg-gradient-to-br ${activeService.color} text-white overflow-hidden shadow-3xl`}
                            >
                                {/* Abstract Background Art */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none">
                                    <Globe size={400} className="absolute -right-20 -bottom-20 rotate-12" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                                            <TrendingUp size={24} />
                                        </div>
                                        <span className="text-sm font-bold uppercase tracking-widest text-white/80">Premium Institutional Suite</span>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 leading-tight">
                                        {activeService.title}
                                    </h2>

                                    <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed font-medium italic border-l-4 border-white/30 pl-6">
                                        "{activeService.fullDesc}"
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        {activeService.metrics.map((metric, i) => (
                                            <div key={i} className="glass border-white/20 p-6 rounded-[2rem] text-center">
                                                <div className="text-3xl font-heading font-extrabold mb-1">{metric.value}</div>
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-white/60">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full mt-12 bg-white text-primary px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all"
                                    >
                                        Inquire About {activeService.title} <Zap size={18} fill="currentColor" />
                                    </motion.button>
                                </div>

                                {/* Cinematic Light Catch */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
