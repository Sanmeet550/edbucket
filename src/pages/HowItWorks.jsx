import React from 'react'
import { motion } from 'framer-motion'
import { UserPlus, BookOpen, Rocket, CheckCircle2, ArrowRight } from 'lucide-react'

const steps = [
    {
        icon: UserPlus,
        title: 'Partner Application',
        desc: 'Submit your partnership interest through our portal. Our team will review your consultancy profile and credentials.',
        color: 'bg-blue-600'
    },
    {
        icon: CheckCircle2,
        title: 'Verification & Approval',
        desc: 'We conduct a swift onboarding process to verify compliance and align on strategic goals.',
        color: 'bg-emerald-600'
    },
    {
        icon: BookOpen,
        title: 'Platform Training',
        desc: 'Get a personalized demo and training on our SaaS platform, CRM integrations, and university database.',
        color: 'bg-indigo-600'
    },
    {
        icon: Rocket,
        title: 'Launch & Scale',
        desc: 'Start processing applications, tracking commissions, and expanding your recruitment reach instantly.',
        color: 'bg-secondary'
    }
]

const HowItWorks = () => {
    return (
        <div className="pt-32 pb-24 px-6">
            <div className="container mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full"
                    >
                        Success Journey
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-8">How <span className="brand-gradient-text">Partnership Works</span></h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                        A streamlined, transparent, and technology-driven approach to international education partnerships. Join our ecosystem in four simple steps.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className={`w-20 h-20 rounded-full ${step.color} text-white flex items-center justify-center mb-8 shadow-xl shadow-slate-200 dark:shadow-none relative`}>
                                    <step.icon size={32} />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 border-4 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold">
                                        {idx + 1}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-heading font-bold mb-4">{step.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 rounded-[3.5rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Start Your Partnership Journey Today</h2>
                        <p className="text-slate-400 font-medium">Become a part of the global education enablement ecosystem and scale your operations with EdBucket.</p>
                    </div>
                    <button className="bg-primary text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-indigo-950">
                        Apply Now <ArrowRight size={20} />
                    </button>
                </motion.div>
            </div>
        </div>
    )
}

export default HowItWorks
