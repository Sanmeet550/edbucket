import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Linkedin, Twitter, Zap, Building2, Headphones, Users } from 'lucide-react'

const Contact = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }

    const bentoCards = [
        {
            title: "Partner Support",
            details: "+91 80804 99905",
            subtext: "Mon-Sat, 10AM - 7PM",
            icon: Headphones,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            span: "lg:col-span-1 lg:row-span-2",
            type: "info"
        },
        {
            title: "Institutional Desk",
            details: "institutions@edbucket.com",
            subtext: "Global University Relations",
            icon: Building2,
            color: "text-accent",
            bg: "bg-accent/10",
            span: "lg:col-span-1 lg:row-span-2",
            type: "info"
        },
        {
            title: "Platform Stats",
            tags: ["1.2K+ Partners", "800+ Universities", "20+ Countries"],
            icon: Users,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            span: "lg:col-span-1 lg:row-span-1",
            type: "tags"
        },
        {
            title: "Global Headquarters",
            details: "Mumbai, India",
            subtext: "Corporate Hub",
            icon: MapPin,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            span: "lg:col-span-1 lg:row-span-2",
            type: "info"
        }
    ]

    return (
        <main className="min-h-screen pt-28 pb-20 px-6 bg-[#F8FAFC] dark:bg-[#0F172A] selection:bg-accent selection:text-primary">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-indigo-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] bg-accent/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[minmax(140px,auto)]"
                >
                    {/* --- HEADER HERO CARD --- */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 lg:row-span-3 glass rounded-[3rem] p-8 md:p-12 flex flex-col justify-end relative overflow-hidden group border-none shadow-2xl shadow-indigo-900/5 dark:shadow-none bg-slate-900 text-white"
                    >
                        <div className="relative z-10">
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-xs font-black uppercase tracking-widest mb-6"
                            >
                                <Zap size={14} className="fill-accent" /> Partnership First
                            </motion.span>
                            <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4 leading-tight">
                                Transform Your <br />
                                <span className="brand-gradient-text italic font-serif">Future with Us.</span>
                            </h1>
                            <p className="text-slate-400 text-sm md:text-base max-w-md font-medium leading-relaxed">
                                Join the world's most comprehensive study abroad enablement platform. Reach out for partnerships, institutional tie-ups, or tech integration.
                            </p>
                        </div>
                    </motion.div>

                    {/* --- B2B CONTACT FORM --- */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 lg:row-span-6 glass rounded-[3rem] p-8 md:p-12 relative overflow-hidden flex flex-col border-2 border-accent/20 shadow-[0_0_50px_-12px_rgba(79,209,197,0.3)] dark:shadow-none"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] -mr-32 -mt-32 rounded-full animate-pulse" />

                        <div className="flex items-center gap-4 mb-10 relative z-10">
                            <div className="w-14 h-14 bg-brand-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <MessageSquare size={24} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-primary dark:text-white uppercase tracking-tighter">Connect with Us</h2>
                                <p className="text-accent text-sm font-bold uppercase tracking-widest">B2B Partnership</p>
                            </div>
                        </div>

                        <form className="flex-1 space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Organization Name</label>
                                    <input
                                        type="text"
                                        placeholder="Company / Institution"
                                        className="w-full bg-white/50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl px-6 py-5 outline-none focus:ring-4 focus:ring-accent/20 transition-all dark:text-white placeholder:text-slate-500 text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Business Email</label>
                                    <input
                                        type="email"
                                        placeholder="email@company.com"
                                        className="w-full bg-white/50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl px-6 py-5 outline-none focus:ring-4 focus:ring-accent/20 transition-all dark:text-white placeholder:text-slate-500 text-sm font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Partnership Type</label>
                                <select className="w-full bg-white/50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl px-6 py-5 outline-none focus:ring-4 focus:ring-accent/20 transition-all dark:text-white appearance-none cursor-pointer text-sm font-medium">
                                    <option>Consultancy / Agent Partnership</option>
                                    <option>University / Institution Tie-up</option>
                                    <option>Technology Integration Request</option>
                                    <option>Financial / Commission Inquiry</option>
                                    <option>Other B2B Inquiry</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Proposal Details</label>
                                <textarea
                                    placeholder="Tell us about your organization and partnership goals..."
                                    rows="5"
                                    className="w-full bg-white/50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl px-6 py-5 outline-none focus:ring-4 focus:ring-accent/20 transition-all dark:text-white placeholder:text-slate-500 text-sm font-medium resize-none"
                                ></textarea>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-brand-gradient text-white py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/30 transition-all flex items-center justify-center gap-3 group"
                            >
                                Submit Proposal <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* --- BENTO PIECES --- */}
                    {bentoCards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`${card.span} glass rounded-[2.5rem] p-8 border-none shadow-xl shadow-indigo-900/5 dark:shadow-none flex flex-col justify-between group transition-all`}
                        >
                            <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300`}>
                                <card.icon className={`${card.color}`} size={28} />
                            </div>

                            {card.type === "info" ? (
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{card.title}</p>
                                    <h3 className="text-lg font-bold text-primary dark:text-white leading-tight">{card.details}</h3>
                                    <p className="text-slate-500 text-xs mt-1 font-bold">{card.subtext}</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{card.title}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {card.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-accent/10 text-accent text-[10px] font-black rounded-lg uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {/* --- SOCIAL HUB --- */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 lg:row-span-1 glass rounded-[2.5rem] p-8 border-none flex items-center justify-between group transition-all hover:bg-white/90 dark:hover:bg-slate-800/90"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-primary dark:text-white uppercase tracking-widest leading-none">Global Network</h3>
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">Institutional Relations</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {['https://linkedin.com', 'https://twitter.com'].map((url, i) => (
                                <motion.a
                                    key={i}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2, rotate: 12 }}
                                    className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-accent transition-all border border-slate-100 dark:border-slate-800 shadow-sm"
                                >
                                    {i === 0 ? <Linkedin size={20} /> : <Twitter size={20} />}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    )
}

export default Contact
