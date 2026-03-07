import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, Loader2, Globe, Building2, User, Mail, Phone, BarChart3, Target } from 'lucide-react'

const ConsultationModal = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState('idle') // idle, loading, success, error
    const [formData, setFormData] = useState({
        full_name: '',
        company_name: '',
        email: '',
        phone: '',
        country: '',
        student_volume: '',
        study_destination: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const response = await fetch('http://127.0.0.1:8000/api/consultations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setStatus('success')
                setTimeout(() => {
                    onClose()
                    setStatus('idle')
                    setFormData({
                        full_name: '',
                        company_name: '',
                        email: '',
                        phone: '',
                        country: '',
                        student_volume: '',
                        study_destination: ''
                    })
                }, 3000)
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-10"
                    >
                        <X size={24} />
                    </button>

                    {status === 'success' ? (
                        <div className="p-16 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
                            >
                                <CheckCircle2 size={48} />
                            </motion.div>
                            <h2 className="text-3xl font-heading font-bold mb-4">Request Received!</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">
                                Our partnership specialist will reach out to you within 24 hours to discuss your agency's growth.
                            </p>
                        </div>
                    ) : (
                        <div className="p-8 md:p-12">
                            <div className="mb-10">
                                <h2 className="text-3xl font-heading font-bold mb-2">Book a Consultation</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Take the first step towards scaling your recruitment agency.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <User size={14} /> Full Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-slate-900 dark:text-white font-medium"
                                            placeholder="John Doe"
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <Building2 size={14} /> Agency Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-slate-900 dark:text-white font-medium"
                                            placeholder="EduGlobal Ltd"
                                            value={formData.company_name}
                                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <Mail size={14} /> Work Email
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-slate-900 dark:text-white font-medium"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <Phone size={14} /> Phone Number
                                        </label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-slate-900 dark:text-white font-medium"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <Globe size={14} /> Country
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-slate-900 dark:text-white font-medium"
                                            placeholder="United Kingdom"
                                            value={formData.country}
                                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <BarChart3 size={14} /> Monthly Student Volume
                                        </label>
                                        <select
                                            required
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-slate-900 dark:text-white font-medium appearance-none"
                                            value={formData.student_volume}
                                            onChange={(e) => setFormData({ ...formData, student_volume: e.target.value })}
                                        >
                                            <option value="">Select Volume</option>
                                            <option value="1-10">1-10 Students</option>
                                            <option value="11-50">11-50 Students</option>
                                            <option value="51-200">51-200 Students</option>
                                            <option value="200+">200+ Students</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        <Target size={14} /> Primary Study Destination Interest
                                    </label>
                                    <select
                                        required
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-slate-900 dark:text-white font-medium appearance-none"
                                        value={formData.study_destination}
                                        onChange={(e) => setFormData({ ...formData, study_destination: e.target.value })}
                                    >
                                        <option value="">Select Primary Interest</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Canada">Canada</option>
                                        <option value="USA">USA</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Europe">Europe</option>
                                        <option value="Other">Other / Multiple</option>
                                    </select>
                                </div>

                                <button
                                    disabled={status === 'loading'}
                                    className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-70 disabled:hover:scale-100"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} /> Processing...
                                        </>
                                    ) : (
                                        <>
                                            Confirm Consultation <Send size={20} />
                                        </>
                                    )}
                                </button>
                                {status === 'error' && (
                                    <p className="text-center text-red-500 text-sm font-bold">Something went wrong. Please try again.</p>
                                )}
                            </form>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default ConsultationModal
