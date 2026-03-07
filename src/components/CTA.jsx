import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Building2, Zap } from 'lucide-react'
import journalImg from '../assets/calltoaction.png'
import ConsultationModal from './ConsultationModal'

const CTA = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-white dark:bg-slate-950">
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            {/* Background Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[4rem] overflow-hidden shadow-3xl border border-slate-200 dark:border-white/5 bg-slate-900"
                >
                    {/* Cinematic Image Background */}
                    <div className="absolute inset-0 z-0 opacity-40">
                        <img
                            src={journalImg}
                            alt="B2B Partnership"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/80 to-primary/20"></div>
                    </div>

                    <div className="relative z-10 p-12 md:p-24 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="inline-flex items-center gap-2 px-6 py-2 mb-8 text-sm font-bold tracking-widest uppercase text-accent bg-accent/10 rounded-full border border-accent/20 backdrop-blur-md">
                                <Zap size={16} /> Ready to Scale?
                            </div>
                            <h2 className="text-4xl md:text-7xl font-heading font-extrabold text-white mb-10 leading-tight tracking-tight">
                                The Future of Study Abroad <br />
                                <span className="brand-gradient-text italic">Is Partnership</span>
                            </h2>
                            <p className="text-slate-300 text-lg md:text-xl mb-14 max-w-3xl mx-auto font-medium leading-relaxed">
                                Empower your consultancy with our state-of-the-art tech, global university network, and dedicated support. Join 1200+ partners who are redefining international education.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <motion.button
                                    onClick={() => setIsModalOpen(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-accent text-primary px-12 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-cyan-500/30"
                                >
                                    Become a Partner <ArrowRight size={22} />
                                </motion.button>

                            </div>

                            <div className="mt-16 flex items-center justify-center gap-8 text-slate-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-sm font-bold uppercase tracking-wider">800+ Universities</span>
                                </div>
                                <div className="hidden sm:block w-px h-4 bg-white/10" />
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-sm font-bold uppercase tracking-wider">20+ Countries</span>
                                </div>
                                <div className="hidden sm:block w-px h-4 bg-white/10" />
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                    <span className="text-sm font-bold uppercase tracking-wider">AI-Driven Portal</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Subtle corner light catch */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTA
