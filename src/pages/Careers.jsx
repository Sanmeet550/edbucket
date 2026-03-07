import { motion } from 'framer-motion'
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Globe, Shield } from 'lucide-react'

const CareersHero = () => (
    <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block glass px-6 py-2 rounded-full mb-8 text-sm font-bold text-accent border border-accent/20"
            >
                Join the Mission 🚀
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-8xl font-heading font-extrabold mb-8 tracking-tight"
            >
                Empower Global <br /> <span className="brand-gradient-text">Aspirations</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
            >
                We're looking for passionate individuals to help us simplify the study abroad journey for thousands of ambitious students.
            </motion.p>
        </div>
    </section>
)

const Values = () => {
    const values = [
        { icon: Heart, title: "Student-Centric", desc: "Our success is measured solely by the success and safety of our students." },
        { icon: Zap, title: "Excellence in Advice", desc: "We provide honest, accurate, and up-to-date guidance every single time." },
        { icon: Globe, title: "Global Mindset", desc: "We think globally to ensure our students excel in multicultural environments." },
        { icon: Shield, title: "Integrity Above All", desc: "In the world of consultancy, trust is our most valuable currency." }
    ]
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/40">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading font-bold mb-4">Our Core <span className="text-accent text-glow">Values</span></h2>
                    <p className="text-slate-500 max-w-xl mx-auto">The principles that make EdBucket the most trusted study abroad consultants.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="glass p-8 rounded-3xl border-0 shadow-sm text-center"
                        >
                            <div className="w-16 h-16 bg-brand-gradient rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-indigo-500/20">
                                <v.icon size={28} />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3">{v.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const OpenRoles = () => {
    const roles = [
        { title: "Senior Study Abroad Consultant", dept: "Admissions", loc: "Bengaluru / Delhi", type: "Full-time" },
        { title: "Visa Documentation Specialist", dept: "Operations", loc: "Mumbai / Remote", type: "Full-time" },
        { title: "University Partner Relations", dept: "Business", loc: "London / Remote", type: "Full-time" },
        { title: "Student Experience Manager", dept: "Support", loc: "Hyderabad", type: "Full-time" }
    ]
    return (
        <section id="roles" className="py-24 px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl font-heading font-bold mb-4">Make an Impact</h2>
                        <p className="text-slate-500 font-medium">Help students achieve their global education dreams.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {roles.map((role, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-8 rounded-[2.5rem] group hover:border-accent/30 transition-all flex flex-col md:flex-row justify-between items-center gap-6"
                        >
                            <div className="flex-grow">
                                <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">{role.dept}</div>
                                <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-accent transition-colors">{role.title}</h3>
                                <div className="flex gap-6 text-slate-500 text-sm font-medium">
                                    <span className="flex items-center gap-2"><MapPin size={16} /> {role.loc}</span>
                                    <span className="flex items-center gap-2"><Clock size={16} /> {role.type}</span>
                                </div>
                            </div>
                            <button className="bg-primary dark:bg-accent text-white dark:text-primary px-8 py-4 rounded-2xl font-bold flex items-center gap-2 group-hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/10">
                                Apply Now <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 glass p-12 rounded-[3.5rem] bg-brand-gradient text-white text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-heading font-bold mb-4 font-bold">Don't see a fit?</h3>
                        <p className="mb-8 opacity-90 font-medium">We're always looking for empathetic and expert counselors. Send us your profile.</p>
                        <button className="bg-white text-primary px-10 py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-transform">
                            General Application
                        </button>
                    </div>
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </section>
    )
}

const Careers = () => {
    return (
        <main className="min-h-screen">
            <CareersHero />
            <Values />
            <OpenRoles />
        </main>
    )
}

export default Careers
