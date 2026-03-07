import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, ArrowLeft } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [countries, setCountries] = useState([])
    const [isCountriesOpen, setIsCountriesOpen] = useState(false)
    const [activeCountry, setActiveCountry] = useState(null)
    const location = useLocation()

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/countries')
                const data = await response.json()
                setCountries(data)
                if (data.length > 0) setActiveCountry(data[0])
            } catch (error) {
                console.error('Error fetching countries:', error)
            }
        }
        fetchCountries()
    }, [])

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Universities', href: '/universities' },
        { name: 'Solutions for Partners', href: '/solutions/partners' },
        { name: 'For Universities', href: '/solutions/universities' },
        // { name: 'How it Works', href: '/how-it-works' },
        // { name: 'Technology', href: '/technology' },
        { name: 'Success Stories', href: '/case-studies' },
    ]

    const isHome = location.pathname === '/'

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-2xl font-heading font-extrabold text-primary dark:text-white flex items-center gap-2 cursor-pointer"
                >
                    <div className="w-9 h-9 bg-brand-gradient rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
                    </div>
                    <span className="tracking-tight">EdBucket</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {/* Countries Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setIsCountriesOpen(true)}
                        onMouseLeave={() => {
                            setIsCountriesOpen(false)
                            // Reset active country to first one on close if desired
                            if (countries.length > 0) setActiveCountry(countries[0])
                        }}
                    >
                        <Link
                            to="/countries"
                            className={`text-[15px] font-medium transition-colors relative group py-2 flex items-center gap-1 ${location.pathname.startsWith('/countries') ? 'text-accent' : 'text-slate-600 dark:text-slate-300 hover:text-accent'}`}
                        >
                            Countries
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all ${location.pathname.startsWith('/countries') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>

                        <AnimatePresence>
                            {isCountriesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute left-0 mt-2 w-[550px] glass rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden flex"
                                >
                                    {/* Left Side: Country List */}
                                    <div className="w-1/2 p-4 border-r border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                                        <div className="flex flex-col gap-1">
                                            {countries.map((country) => (
                                                <button
                                                    key={country.id}
                                                    onMouseEnter={() => setActiveCountry(country)}
                                                    onClick={() => {
                                                        setIsCountriesOpen(false)
                                                    }}
                                                    className={`w-full px-5 py-3.5 rounded-2xl transition-all text-sm font-bold flex items-center justify-between group/item ${activeCountry?.id === country.id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'hover:bg-primary/5 text-slate-600 dark:text-slate-300'}`}
                                                >
                                                    <Link to={`/countries/${country.slug}`} className="flex-grow text-left">
                                                        {country.name}
                                                    </Link>
                                                    <ArrowLeft className={`rotate-180 transition-all ${activeCountry?.id === country.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} size={14} />
                                                </button>
                                            ))}
                                            <hr className="my-2 border-slate-100 dark:border-white/10" />
                                            <Link
                                                to="/countries"
                                                className="px-4 py-3 rounded-2xl bg-primary/5 dark:bg-accent/10 text-primary dark:text-accent text-center text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-primary transition-all"
                                                onClick={() => setIsCountriesOpen(false)}
                                            >
                                                View All Destinations
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Right Side: University Preview */}
                                    <div className="w-1/2 p-6 bg-white dark:bg-slate-900/50">
                                        <div className="flex flex-col h-full">
                                            <div className="mb-4">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Featured Institutions</span>
                                                <h4 className="text-lg font-black text-primary dark:text-white">{activeCountry?.name}</h4>
                                            </div>

                                            <div className="flex flex-col gap-2 flex-grow">
                                                {activeCountry?.universities?.slice(0, 5).map((uni) => (
                                                    <Link
                                                        key={uni.id}
                                                        to={`/universities/${uni.slug}`}
                                                        className="group/uni flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                                                        onClick={() => setIsCountriesOpen(false)}
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-white/10">
                                                            {uni.logo_url ? (
                                                                <img src={uni.logo_url} alt={uni.name} className="w-full h-full object-contain p-1" />
                                                            ) : <span className="text-[10px] font-bold text-slate-400">{uni.name.charAt(0)}</span>}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200 group-hover/uni:text-primary transition-colors line-clamp-1">{uni.name}</span>
                                                            <span className="text-[11px] text-slate-400 font-medium">{uni.category || 'Institutional Partner'}</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                                {activeCountry?.universities?.length > 5 && (
                                                    <Link
                                                        to={`/countries/${activeCountry.slug}`}
                                                        className="text-[11px] font-bold text-primary dark:text-accent mt-2 hover:underline px-2"
                                                        onClick={() => setIsCountriesOpen(false)}
                                                    >
                                                        + {activeCountry.universities.length - 5} more institutions
                                                    </Link>
                                                )}
                                                {(!activeCountry?.universities || activeCountry.universities.length === 0) && (
                                                    <div className="flex-grow flex items-center justify-center text-center p-4 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                                                        <span className="text-xs font-medium text-slate-400 italic">No institutions listed for this region yet.</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {[
                        { name: 'About Us', href: '/about' },
                        { name: 'Universities', href: '/universities' },
                        { name: 'Solutions for Partners', href: '/solutions/partners' },
                        { name: 'For Universities', href: '/solutions/universities' },
                        { name: 'Success Stories', href: '/case-studies' },
                    ].map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`text-[15px] font-medium transition-colors relative group ${location.pathname === link.href ? 'text-accent' : 'text-slate-600 dark:text-slate-300 hover:text-accent'}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                    ))}
                    <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
                    >
                        {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
                    </button>
                    <button className="bg-primary dark:bg-accent text-white dark:text-primary px-7 py-3 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-900/10 dark:shadow-cyan-400/10">
                        Talk to Us
                    </button>
                </div>

                <button
                    className="md:hidden p-2 text-primary dark:text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col gap-4 p-6">
                            <Link
                                to="/countries"
                                className="text-lg font-semibold"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Countries
                            </Link>
                            {[
                                { name: 'About Us', href: '/about' },
                                { name: 'Universities', href: '/universities' },
                                { name: 'Solutions for Partners', href: '/solutions/partners' },
                                { name: 'For Universities', href: '/solutions/universities' },
                                { name: 'Success Stories', href: '/case-studies' },
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-lg font-semibold"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-slate-200 dark:border-slate-700" />
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-slate-600 dark:text-slate-400">Theme</span>
                                <button onClick={toggleDarkMode} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            </div>
                            <button className="w-full bg-primary dark:bg-accent text-white dark:text-primary py-4 rounded-2xl font-bold mt-2">
                                Talk to Us
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
