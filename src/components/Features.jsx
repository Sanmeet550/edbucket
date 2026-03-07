import { motion } from 'framer-motion'
import { ShieldCheck, LineChart, LayoutDashboard, Globe, Briefcase, FileCheck, Headphones, ArrowRight } from 'lucide-react'

const features = [
    {
        title: 'Commission Transparency',
        desc: 'Real-time tracking and automated reporting of student enrolments and commission payouts.',
        icon: LineChart,
        color: 'from-emerald-600 to-teal-500'
    },
    {
        title: 'Centralized Application Hub',
        desc: 'Manage applications across multiple countries and institutions from a single, unified dashboard.',
        icon: Briefcase,
        color: 'from-indigo-600 to-purple-500'
    },
    {
        title: 'Compliance & Verification',
        desc: 'Automated document pre-screening and compliance checks to ensure high visa success rates.',
        icon: FileCheck,
        color: 'from-blue-500 to-cyan-400'
    },
    {
        title: 'Global University Access',
        desc: 'Direct partnerships with over 800+ top-tier universities and colleges across 20+ countries.',
        icon: Globe,
        color: 'from-amber-500 to-orange-500'
    },
    {
        title: 'Dedicated Account Support',
        desc: 'A personal Partner Success Manager to help you scale your operations and resolve queries.',
        icon: Headphones,
        color: 'from-slate-700 to-slate-900'
    }
]

const Features = () => {
    return (
        <section id="features" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-secondary uppercase bg-secondary/10 rounded-full"
                    >
                        Partner Enablement
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-extrabold mb-4"
                    >
                        Solutions Built for <span className="brand-gradient-text">Growth</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        We provide study abroad consultants and education agents with the technology and network needed to scale admissions and improve conversion rates.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass p-10 rounded-[2.5rem] relative overflow-hidden group border border-white dark:border-white/5"
                        >
                            {/* Card Glow Effect */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`}></div>

                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-500/10`}>
                                <feature.icon size={28} />
                            </div>

                            <h3 className="text-2xl font-heading font-bold mb-4">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {feature.desc}
                            </p>

                            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary dark:text-accent group-hover:gap-4 transition-all cursor-pointer">
                                Solution Details <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
