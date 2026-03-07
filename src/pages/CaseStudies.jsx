import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Building2, ExternalLink } from 'lucide-react'

const cases = [
    {
        title: 'SEA Agency Growth',
        partner: 'Global Reach Consultants',
        metrics: '45% Revenue Inc.',
        desc: 'How a leading Southeast Asian consultancy leveraged our white-label portal to double their application volume in 12 months.',
        tags: ['Partnership', 'Technology']
    },
    {
        title: 'Institutional Diversity',
        partner: 'University of New Heights',
        metrics: '15+ New Markets',
        desc: 'Driving diverse enrollment through our global agent network, reaching unrepresented regions with high-quality talent.',
        tags: ['Institutional', 'Recruitment']
    },
    {
        title: 'Operational Excellence',
        partner: 'EduLink Global',
        metrics: '60% Faster Cycles',
        desc: 'Streamlining multi-country application processing through our automated compliance and pre-screening engine.',
        tags: ['Operations', 'SaaS']
    }
]

const CaseStudies = () => {
    return (
        <div className="pt-32 pb-24 px-6">
            <div className="container mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full"
                    >
                        Partner Success
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-8">Success <span className="brand-gradient-text">Case Studies</span></h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                        Real-world examples of how EdBucket is driving growth and efficiency for education partners and institutions globally.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {cases.map((cs, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="flex flex-col h-full glass rounded-[3rem] border border-slate-100 dark:border-white/5 overflow-hidden group shadow-xl shadow-slate-200/50 dark:shadow-none"
                        >
                            <div className="p-10 flex-1">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {cs.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="text-3xl font-heading font-extrabold mb-2 group-hover:text-primary transition-colors">{cs.title}</h3>
                                <div className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">{cs.partner}</div>
                                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8">
                                    {cs.desc}
                                </p>

                                <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div className="text-lg font-heading font-extrabold text-emerald-700 dark:text-emerald-400">{cs.metrics}</div>
                                </div>
                            </div>
                            <div className="p-8 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                                <button className="font-bold flex items-center gap-2 text-primary hover:gap-4 transition-all">
                                    Read Full Case Study <ExternalLink size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Growth Highlights */}
                <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-12 py-20 bg-slate-50 dark:bg-slate-900/40 rounded-[4rem]">
                    <div>
                        <h2 className="text-4xl font-heading font-extrabold mb-6">Drive <span className="brand-gradient-text">Measurable Growth</span></h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                            Join our partners who have seen significant improvements in their enrollment rates, visa successes, and operational efficiency through EdBucket.
                        </p>
                        <div className="space-y-4">
                            {[
                                "99% Overall Visa Success Rate",
                                "Avg. 35% Enrollment Growth for Partners",
                                "800+ Tier-1 Institution Access",
                                "Real-time Financial Transparency"
                            ].map((item, id) => (
                                <div key={id} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                        <Users size={12} />
                                    </div>
                                    <span className="font-bold text-slate-700 dark:text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="glass p-8 rounded-3xl bg-white text-center">
                            <div className="text-4xl font-heading font-extrabold text-primary mb-2">12M+</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Students Reached</div>
                        </div>
                        <div className="glass p-8 rounded-3xl bg-white text-center mt-8">
                            <div className="text-4xl font-heading font-extrabold text-secondary mb-2">1.2K</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Partners</div>
                        </div>
                        <div className="glass p-8 rounded-3xl bg-white text-center">
                            <div className="text-4xl font-heading font-extrabold text-emerald-500 mb-2">800+</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Unis Locked In</div>
                        </div>
                        <div className="glass p-8 rounded-3xl bg-white text-center mt-8">
                            <div className="text-4xl font-heading font-extrabold text-blue-500 mb-2">99%</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Partner Retention</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaseStudies
