import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, ArrowRight, Building2, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Destinations = () => {
    const [destinations, setDestinations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/countries')
                if (!response.ok) throw new Error('Failed to fetch destinations')
                const data = await response.json()
                setDestinations(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchDestinations()
    }, [])

    if (loading) return (
        <div className="py-24 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    )

    if (error) return (
        <div className="py-24 text-center text-red-500 font-bold">
            Unable to load institutional network. Please ensure the backend is running.
        </div>
    )

    return (
        <section id="network" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase text-primary bg-primary/5 rounded-full border border-primary/10"
                    >
                        <Globe size={16} />
                        Global Market Reach
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 tracking-tight"
                    >
                        A World of <span className="brand-gradient-text">Institutional Access</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium"
                    >
                        Empowering our partners with unhindered access to verified institutions globally. Expand your business reach with our dynamic educational network.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {destinations.map((country, index) => (
                        <Link to={`/countries/${country.slug}`} key={country.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -12 }}
                                className="group relative h-[450px] rounded-[3rem] overflow-hidden cursor-pointer shadow-xl shadow-slate-200/50 dark:shadow-none"
                            >
                                {/* Background Image */}
                                <img
                                    src={country.image_url || 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800'}
                                    alt={country.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent group-hover:via-slate-900/70 transition-colors duration-500"></div>
                                <div className="absolute inset-0 bg-primary/10 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                                {/* Top info badge */}
                                <div className="absolute top-8 right-8 z-20">
                                    <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 text-white font-bold text-xs backdrop-blur-xl border-white/20">
                                        <Building2 size={14} className="text-secondary" />
                                        {country.institutional_presence || 'Global Access'}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (index * 0.1) }}
                                    >
                                        <h3 className="text-3xl font-heading font-bold text-white mb-4 group-hover:text-secondary transition-colors">
                                            {country.name}
                                        </h3>
                                        <p className="text-slate-200/90 text-sm md:text-base leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-medium">
                                            {country.description}
                                        </p>

                                        <div className="flex items-center gap-3 text-white font-bold text-sm tracking-wider uppercase group/btn">
                                            <span>Institutional Network</span>
                                            <div className="w-8 h-[2px] bg-secondary group-hover/btn:w-16 transition-all duration-300"></div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Glass Edge Glow */}
                                <div className="absolute inset-0 border border-white/10 rounded-[3rem] pointer-events-none"></div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Destinations
