import { motion } from 'framer-motion'
import { ShieldCheck, TrendingUp, Award, Globe, Building2, LayoutDashboard, HandshakeIcon, Zap } from 'lucide-react'
import successHero from '../assets/hero-success.jpg'

const WhyEdBucket = () => {
    return (
        <section className="py-24 px-6 overflow-hidden relative bg-slate-50 dark:bg-slate-900/20">
            {/* Decorative Background Glows */}
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-xl"
                        >
                            The Edge You Need
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 leading-tight text-slate-900 dark:text-white">
                            Why Partner with <span className="brand-gradient-text">EdBucket?</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                            Position yourself at the forefront of the international education industry. We provide the infrastructure, network, and compliance support to help your consultancy scale beyond boundaries.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: TrendingUp, title: 'Growth-Led Earnings', desc: 'Move beyond basic commissions. Unlock predictable, performance-driven revenue with smarter student placements.', color: 'bg-emerald-500/10 text-emerald-600' },
                                { icon: Zap, title: 'Streamlined Partner Operations', desc: 'Run your international recruitment engine smoothly with expert-backed execution and always-on support.', color: 'bg-indigo-500/10 text-indigo-600' },
                                { icon: Globe, title: 'Borderless Institution Network', desc: 'Tap into a powerful ecosystem of globally trusted universities across key study destinations.', color: 'bg-blue-500/10 text-blue-600' },
                                { icon: HandshakeIcon, title: 'Long-Term Growth Alignment', desc: 'We grow when you grow — built on strategic collaboration, not just transactions.', color: 'bg-rose-500/10 text-rose-600' }
                            ].map((item, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={idx}
                                    className="flex flex-col gap-4 p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                                >
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold text-lg mb-2 text-slate-900 dark:text-white">{item.title}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual Showcase (Modified for B2B) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="glass p-6 rounded-[3.5rem] shadow-3xl bg-white dark:bg-slate-900/40 border-indigo-100/50 backdrop-blur-md">
                            <div className="bg-slate-900 rounded-[3rem] shadow-inner overflow-hidden aspect-[1/1] flex flex-col items-center justify-center relative">

                                {/* Success Background Image */}
                                <img
                                    src={successHero}
                                    alt="Success"
                                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                                />
                                {/* Subtle Dark Overlay for Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                                <div className="relative z-10 text-white text-center p-10">
                                    <h3 className="text-3xl font-heading font-bold mb-6 drop-shadow-xl">Powering Global Growth</h3>
                                    <p className="text-white max-w-sm mx-auto drop-shadow-lg font-medium mb-10 leading-relaxed">Join a network of 1200+ successful partners scaling international education recruitment across the globe.</p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-xl hover:bg-white/20 transition-all">
                                            <div className="text-3xl font-bold text-secondary mb-1">800+</div>
                                            <div className="text-[10px] uppercase font-extrabold tracking-widest opacity-60">Verified Unis</div>
                                        </div>
                                        <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-xl hover:bg-white/20 transition-all">
                                            <div className="text-3xl font-bold text-secondary mb-1">20+</div>
                                            <div className="text-[10px] uppercase font-extrabold tracking-widest opacity-60">Key Markets</div>
                                        </div>
                                        <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-xl hover:bg-white/20 transition-all">
                                            <div className="text-3xl font-bold text-secondary mb-1">100k+</div>
                                            <div className="text-[10px] uppercase font-extrabold tracking-widest opacity-60">Applications PASSED</div>
                                        </div>
                                        <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-xl hover:bg-white/20 transition-all">
                                            <div className="text-3xl font-bold text-secondary mb-1">15+</div>
                                            <div className="text-[10px] uppercase font-extrabold tracking-widest opacity-60">Years in Industry</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pop-out info card (Professional Pivot) */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute -top-10 -right-4 glass p-6 rounded-[2rem] shadow-2xl max-w-[240px] border-primary/20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-3xl"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                    <Building2 size={20} />
                                </div>
                                <div className="text-sm font-bold text-slate-800 dark:text-white">Enterprise Reach</div>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Direct institutional partnerships withIvy League, Russell Group, and global top-ranked universities.</p>
                        </motion.div>

                        {/* Success Glow */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 blur-[80px] rounded-full -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default WhyEdBucket
