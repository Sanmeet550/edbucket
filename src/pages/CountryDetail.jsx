import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, ArrowLeft, Globe, ShieldCheck, Zap, Loader2, MapPin } from 'lucide-react'

const CountryDetail = () => {
    const { slug } = useParams()
    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/countries/${slug}`)
                if (!response.ok) throw new Error('Country not found')
                const data = await response.json()
                setCountry(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCountry()
    }, [slug])

    if (loading) return (
        <div className="min-h-screen pt-40 px-6 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={64} />
        </div>
    )

    if (error) return (
        <div className="min-h-screen pt-40 px-6 text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-8">Error</h1>
            <p className="text-xl text-slate-600 mb-12">{error}</p>
            <Link to="/countries" className="text-primary font-bold flex items-center justify-center gap-2">
                <ArrowLeft size={20} /> Back to Countries
            </Link>
        </div>
    )

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background">
            <div className="container mx-auto px-6">
                <Link to="/countries" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-12 font-bold group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Study Destinations
                </Link>

                {/* Hero Header */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-8 tracking-tight">
                            {country.name} <br />
                            <span className="brand-gradient-text">Expansion Hub</span>
                        </h1>
                        <div className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium rich-text"
                            dangerouslySetInnerHTML={{ __html: country.description }} />

                        <div className="grid grid-cols-2 gap-6">
                            <div className="glass p-6 rounded-3xl border-primary/10">
                                <div className="text-primary font-extrabold text-xs uppercase tracking-widest mb-2">Presence</div>
                                <div className="text-2xl font-bold">{country.institutional_presence}</div>
                            </div>
                            <div className="glass p-6 rounded-3xl border-secondary/10">
                                <div className="text-secondary font-extrabold text-xs uppercase tracking-widest mb-2">Category</div>
                                <div className="text-2xl font-bold">Tier-1 Access</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative h-[400px] rounded-[4rem] overflow-hidden shadow-2xl"
                    >
                        <img
                            src={country.image_url}
                            alt={country.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    </motion.div>
                </div>

                {/* Detailed Info */}
                <div className="grid lg:grid-cols-3 gap-8 mb-24">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-heading font-extrabold mb-6">Market Overview</h2>
                            <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed rich-text"
                                dangerouslySetInnerHTML={{ __html: country.partner_opportunity }} />
                        </section>

                        <section>
                            <h2 className="text-3xl font-heading font-extrabold mb-8 flex items-center gap-3">
                                <Building2 className="text-primary" />
                                Available Institutions
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {country.universities && country.universities.map((uni) => (
                                    <div key={uni.id} className="glass p-8 rounded-[2.5rem] border-white/10 hover:shadow-xl transition-all group">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center p-3">
                                                {uni.logo_url ? (
                                                    <img src={uni.logo_url} alt={uni.name} className="w-full h-full object-contain" />
                                                ) : <Building2 className="text-slate-300" size={32} />}
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">
                                                {uni.category || 'Institutional'}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{uni.name}</h3>
                                        <p className="text-sm text-slate-500 mb-8 line-clamp-2">{uni.description}</p>
                                        <Link
                                            to={`/apply/${uni.id}?country=${country.id}`}
                                            className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg"
                                        >
                                            Inquire to Partner <ArrowLeft className="rotate-180" size={18} />
                                        </Link>
                                    </div>
                                ))}
                                {(!country.Universities || country.Universities.length === 0) && (
                                    <div className="col-span-full p-12 text-center glass rounded-[3rem] text-slate-400 font-medium">
                                        Institutional list for this region is currently being updated.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <ShieldCheck size={120} />
                            </div>
                            <h3 className="text-2xl font-bold mb-6">Compliance & Success</h3>
                            <ul className="space-y-6">
                                {[
                                    'Verified DLI Institutions',
                                    'Direct Application Portal',
                                    'Priority Processing Channel',
                                    'Regional Expert Support'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Zap size={14} className="text-secondary" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full mt-10 glass border-white/20 py-4 rounded-xl font-bold text-sm hover:bg-white/10 transition-all">
                                Download Regional Guide
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountryDetail
