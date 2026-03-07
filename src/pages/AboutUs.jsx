import React from 'react'
import { motion } from 'framer-motion'
import { Target, ShieldCheck, Globe, Users, Award, TrendingUp } from 'lucide-react'

const AboutUs = () => {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/20 overflow-hidden">
                <div className="container mx-auto">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full"
                        >
                            Our Mission
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-heading font-extrabold mb-8 leading-tight"
                        >
                            Redefining the <br />
                            <span className="brand-gradient-text">Study Abroad Ecosystem</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed font-medium"
                        >
                            EdBucket is a global B2B study abroad enablement partner. We bridge the gap between ambitious education consultants and world-class institutions through cutting-edge technology and a verified global network.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Transparency First",
                                desc: "We believe in direct relationships and clear commission tracking for every stakeholder."
                            },
                            {
                                icon: Target,
                                title: "Institutional Quality",
                                desc: "Our network consists of 800+ top-tier, verified universities across 20+ countries."
                            },
                            {
                                icon: Globe,
                                title: "Global Empowerment",
                                desc: "Providing consultants with the tools to reach any destination and any program with ease."
                            }
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass p-10 rounded-[3rem] border-slate-100 dark:border-white/5"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                                    <value.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-heading font-bold mb-4">{value.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scale Section */}
            <section className="py-24 px-6 bg-slate-900 text-white rounded-[4rem] mx-6 mb-24 overflow-hidden relative">
                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 italic">The EdBucket <span className="text-accent">Difference</span></h2>
                            <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
                                Founded with the vision to digitize and democratize the study abroad industry, we have grown into a multi-national enablement partner serving thousands of agents and hundreds of universities.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-3xl font-heading font-extrabold text-white mb-1">2018</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Year Founded</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-heading font-extrabold text-accent mb-1">$150M+</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Scholarships Processed</div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-1 gap-6">
                            {[
                                { icon: Award, text: "Recognized as a leading EduTech platform in APAC." },
                                { icon: Users, text: "Empowering 1200+ active partner consultancies." },
                                { icon: TrendingUp, text: "Consistent 99% visa and admission success rate." }
                            ].map((item, id) => (
                                <div key={id} className="flex items-center gap-6 p-8 rounded-3xl bg-white/5 border border-white/5">
                                    <div className="text-secondary">
                                        <item.icon size={40} />
                                    </div>
                                    <p className="text-lg font-bold text-slate-200">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs
