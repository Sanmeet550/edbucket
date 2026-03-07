import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Building2, ArrowRight, Loader2, MapPin, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const Countries = () => {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/countries')
                if (!response.ok) throw new Error('Failed to fetch countries')
                const data = await response.json()
                setCountries(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCountries()
    }, [])

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) return (
        <div className="min-h-screen pt-40 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={64} />
        </div>
    )

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Hero Section */}
                <div className="max-w-4xl mb-20 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold mb-8"
                    >
                        <Globe size={16} />
                        Global Institutional Network
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-heading font-black text-slate-800 dark:text-white mb-8 tracking-tighter leading-[0.9]"
                    >
                        Explore Study <span className="brand-gradient-text">Destinations</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-medium"
                    >
                        Connecting ambitious students with world-class institutions across the globe. Your journey to international education excellence starts here.
                    </motion.p>

                    {/* Background Decorative Element */}
                    <div className="absolute -top-20 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                </div>

                {/* Search Bar */}
                <div className="mb-16 relative z-10">
                    <div className="max-w-2xl relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                        <input
                            type="text"
                            placeholder="Find your destination..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] glass border-white/20 shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                        />
                    </div>
                </div>

                {/* Countries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence>
                        {filteredCountries.map((country, index) => (
                            <motion.div
                                key={country.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-indigo-900/10"
                            >
                                <Link to={`/countries/${country.slug}`} className="block h-full w-full">
                                    {/* Image with zoom effect */}
                                    <img
                                        src={country.image_url || 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800'}
                                        alt={country.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />

                                    {/* Multi-layered overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>

                                    {/* Top Content */}
                                    <div className="absolute top-10 right-10 flex flex-col gap-3 items-end">
                                        <div className="glass px-5 py-2.5 rounded-2xl flex items-center gap-2.5 text-white font-extrabold text-xs uppercase tracking-widest border-white/30 backdrop-blur-2xl">
                                            <Building2 size={16} className="text-secondary" />
                                            {country.institutional_presence || 'Global Reach'}
                                        </div>
                                    </div>

                                    {/* Bottom Content */}
                                    <div className="absolute inset-0 p-12 flex flex-col justify-end">
                                        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-3 mb-4">
                                                <MapPin size={24} className="text-secondary" />
                                                <h3 className="text-4xl font-heading font-black text-white tracking-tight">
                                                    {country.name}
                                                </h3>
                                            </div>

                                            <p className="text-slate-200 text-lg leading-relaxed mb-10 opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-3 font-medium">
                                                {country.description}
                                            </p>

                                            <div className="flex items-center gap-4 text-white font-black text-sm uppercase tracking-widest group/link">
                                                <span className="relative">
                                                    Explore Institutions
                                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover/link:w-full"></span>
                                                </span>
                                                <div className="w-10 h-10 rounded-full glass border-white/20 flex items-center justify-center group-hover/link:bg-secondary transition-colors group-hover/link:border-secondary">
                                                    <ArrowRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Edge highlight */}
                                    <div className="absolute inset-0 border border-white/10 rounded-[3.5rem] pointer-events-none group-hover:border-white/30 transition-colors"></div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredCountries.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-40 glass rounded-[4rem] border border-dashed border-slate-300 dark:border-slate-700 mt-12"
                    >
                        <Globe size={80} className="mx-auto text-slate-200 mb-8" />
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">No destinations found</h3>
                        <p className="text-slate-500 text-lg">Try searching for a different country or region.</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-10 px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl"
                        >
                            View All Destinations
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Countries
