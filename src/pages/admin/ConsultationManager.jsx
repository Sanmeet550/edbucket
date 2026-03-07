import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Users,
    Globe,
    Calendar,
    Building2,
    Mail,
    Phone,
    BarChart3,
    Search,
    Filter,
    Download,
    Eye,
    CheckCircle2
} from 'lucide-react'

const ConsultationManager = () => {
    const [consultations, setConsultations] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterCountry, setFilterCountry] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchConsultations()
    }, [])

    const exportToCSV = () => {
        if (filteredConsultations.length === 0) return

        const headers = ['Full Name', 'Agency', 'Email', 'Phone', 'Country', 'Volume', 'Destination', 'Date']
        const csvContent = [
            headers.join(','),
            ...filteredConsultations.map(item => [
                `"${item.full_name}"`,
                `"${item.company_name}"`,
                `"${item.email}"`,
                `"${item.phone}"`,
                `"${item.country}"`,
                `"${item.student_volume}"`,
                `"${item.study_destination}"`,
                `"${new Date(item.created_at).toLocaleDateString()}"`
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `consultation_requests_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const fetchConsultations = async () => {
        try {
            const token = localStorage.getItem('admin_token')
            const response = await fetch('http://127.0.0.1:8000/api/admin/consultations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                setConsultations(data)
            }
        } catch (error) {
            console.error('Error fetching consultations:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredConsultations = consultations.filter(item => {
        const matchesCountry = filterCountry === '' || item.country.toLowerCase().includes(filterCountry.toLowerCase())
        const matchesSearch = searchTerm === '' ||
            item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCountry && matchesSearch
    })

    const countries = [...new Set(consultations.map(c => c.country))]

    return (
        <div className="min-h-screen pt-32 pb-24 px-8 bg-slate-50 dark:bg-slate-950">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-heading font-extrabold mb-2">Consultation Requests</h1>
                    <p className="text-slate-500 font-medium">Manage and track your B2B partnership leads.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <div className="text-2xl font-bold text-primary">{consultations.length}</div>
                        <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Total Requests</div>
                    </div>
                    <button
                        onClick={exportToCSV}
                        className="p-4 bg-slate-900 text-white rounded-2xl flex items-center gap-2 font-bold hover:bg-slate-800 transition-all"
                    >
                        <Download size={18} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, agency, or email..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                        value={filterCountry}
                        onChange={(e) => setFilterCountry(e.target.value)}
                    >
                        <option value="">All Countries</option>
                        {countries.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest opacity-60">Partner / Agency</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest opacity-60">Contact Details</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest opacity-60">Metrics</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest opacity-60">Interest</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest opacity-60">Date</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest opacity-60">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center text-slate-400 font-medium italic">Loading consultations...</td>
                                </tr>
                            ) : filteredConsultations.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center text-slate-400 font-medium italic">No consultation requests found.</td>
                                </tr>
                            ) : filteredConsultations.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-slate-900 dark:text-white mb-0.5">{item.full_name}</div>
                                        <div className="text-sm font-medium text-primary flex items-center gap-1.5">
                                            <Building2 size={12} /> {item.company_name}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                            <Mail size={14} className="opacity-40" /> {item.email}
                                        </div>
                                        <div className="text-xs font-bold opacity-40 flex items-center gap-2">
                                            <Phone size={14} /> {item.phone}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-full text-xs font-bold">
                                            <BarChart3 size={12} /> {item.student_volume}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-bold flex items-center gap-2">
                                            <Globe size={14} className="text-secondary" /> {item.country}
                                        </div>
                                        <div className="text-[10px] uppercase font-extrabold opacity-40 mt-1">To: {item.study_destination}</div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-medium text-slate-500">
                                        {new Date(item.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <button className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-primary hover:text-white transition-all">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-emerald-500 hover:text-white transition-all">
                                                <CheckCircle2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ConsultationManager
