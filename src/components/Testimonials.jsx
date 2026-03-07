import { motion } from 'framer-motion'
import { Quote, Star, TrendingUp, ShieldCheck } from 'lucide-react'

const testimonials = [
    {
        name: 'Vikram Mehta',
        role: 'Director, Global Education Consultants',
        content: 'Partnering with EdBucket was a strategic move for our consultancy. Their institution network and white-label platform helped us scale our admissions by 45% in just 12 months.',
        rating: 5,
        growth: '+45% Enrollment'
    },
    {
        name: 'Dr. Sarah Wilson',
        role: 'CEO, Global Reach Academy',
        content: 'The level of commission transparency and real-time tracking EdBucket provides is unmatched. It has completely streamlined our internal operations and financial reporting.',
        rating: 5,
        growth: '2x Efficiency'
    },
    {
        name: 'Marcus Tan',
        role: 'Head of Partnerships, EduGate',
        content: 'Direct university access and automated pre-screening have been game-changers. Our visa success rates have improved significantly due to their rigorous compliance support.',
        rating: 5,
        growth: '99% Visa Success'
    }
]

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase text-secondary bg-secondary/10 rounded-xl"
                    >
                        Partner Success
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-extrabold mb-4"
                    >
                        Voices of <span className="brand-gradient-text">Our Partners</span>
                    </motion.h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        Join a community of forward-thinking education partners who are redefining international recruitment with EdBucket.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testi, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass p-10 rounded-[3rem] border border-white/40 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group"
                        >
                            <div className="absolute top-10 right-10 text-primary/5 group-hover:text-primary/10 transition-colors">
                                <Quote size={80} fill="currentColor" />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(testi.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="#FFB800" color="#FFB800" />
                                ))}
                            </div>

                            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 italic leading-relaxed font-medium relative z-10">
                                "{testi.content}"
                            </p>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-primary font-bold text-xl border border-indigo-100 dark:border-white/5">
                                    {testi.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-heading font-bold text-slate-900 dark:text-white">{testi.name}</h4>
                                    <p className="text-sm text-slate-500 font-bold">{testi.role}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl w-fit">
                                <TrendingUp size={16} className="text-emerald-600" />
                                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">{testi.growth}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
