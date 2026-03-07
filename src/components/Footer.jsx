import { Linkedin, Twitter, Github, Instagram, Mail, Phone, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 pt-24 pb-12 px-6 border-t border-slate-200 dark:border-white/5">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div>
                        <Link to="/" className="text-2xl font-heading font-extrabold text-primary dark:text-white flex items-center gap-2 mb-8 lowercase tracking-tighter cursor-pointer">
                            <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
                            </div>
                            edbucket
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                            Global study abroad enablement partner helping agencies and institutions scale international admissions with technology and compliance.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-accent border border-slate-100 dark:border-white/10 transition-all shadow-sm">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-lg mb-8 uppercase tracking-widest text-slate-400 text-sm">Solutions</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'For Education Agents', href: '/solutions/partners' },
                                { name: 'For Universities', href: '/solutions/universities' },
                                { name: 'How it Works', href: '/how-it-works' },
                                { name: 'Country Network', href: '/#network' }
                            ].map((link) => (
                                <li key={link.name}><Link to={link.href} className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">/ {link.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-lg mb-8 uppercase tracking-widest text-slate-400 text-sm">Partnership</h4>
                        <ul className="space-y-4">
                            <li><Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">/ Become a Partner</Link></li>
                            <li><Link to="/case-studies" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">/ Success Stories</Link></li>
                            <li><Link to="/technology" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">/ Technology</Link></li>
                            <li><Link to="/careers" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">/ Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-lg mb-8 uppercase tracking-widest text-slate-400 text-sm">Contact Us</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                <Mail size={18} className="text-accent" />
                                hello@edbucket.com
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                <Phone size={18} className="text-accent" />
                                +1 (555) EdBucket
                            </div>
                            <div className="mt-8">
                                <p className="text-xs font-bold text-slate-400 uppercase mb-4">Subscribe to Newsletter</p>
                                <div className="flex gap-2">
                                    <input type="email" placeholder="Email" className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm flex-grow outline-none focus:border-accent" />
                                    <button className="bg-primary text-white p-3 rounded-xl hover:scale-105 transition-transform">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-400 text-sm font-medium">
                        © 2026 EdBucket. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-slate-400 hover:text-slate-600 text-sm font-medium">Privacy Policy</a>
                        <a href="#" className="text-slate-400 hover:text-slate-600 text-sm font-medium">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
