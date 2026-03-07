import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Globe, FileText, Settings, ArrowRight, Users, Building2, TrendingUp, LogOut } from 'lucide-react'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const [stats, setStats] = useState({
        countries: 0,
        applications: 0,
        pending: 0
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('admin_token')
                const cRes = await fetch('http://127.0.0.1:8000/api/countries')
                const aRes = await fetch('http://127.0.0.1:8000/api/admin/applications', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                const rRes = await fetch('http://127.0.0.1:8000/api/admin/consultations', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })

                const countries = await cRes.json()
                const applications = await aRes.json()
                const consultations = await rRes.json()

                setStats({
                    countries: countries.length,
                    applications: applications.length,
                    pending: consultations.length
                })
            } catch (err) {
                console.error('Failed to fetch stats')
            }
        }
        fetchStats()
    }, [])

    return (
        <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-heading font-extrabold mb-2 text-slate-900 dark:text-white">Admin Portal</h1>
                        <p className="text-slate-500 font-medium font-heading">Secure B2B Network Management</p>
                    </div>
                    <button
                        onClick={() => { localStorage.removeItem('admin_token'); navigate('/admin/login') }}
                        className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 px-6 py-3 rounded-2xl font-bold text-slate-500 hover:text-red-500 transition-all shadow-sm group"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {[
                        { label: 'Active Countries', value: stats.countries, icon: Globe, color: 'text-blue-500' },
                        { label: 'Total Applications', value: stats.applications, icon: FileText, color: 'text-purple-500' },
                        { label: 'Consultation Requests', value: stats.pending, icon: Users, color: 'text-emerald-500' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-4 rounded-2xl bg-slate-100 dark:bg-white/5 ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <div className="text-5xl font-heading font-extrabold">{stat.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <Link to="/admin/countries" className="group">
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all h-full">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-5 bg-blue-500/10 rounded-2xl text-blue-500">
                                    <Building2 size={32} />
                                </div>
                                <ArrowRight className="text-slate-300 group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Institutional Management</h3>
                            <p className="text-slate-500 mb-8 font-medium">Add new global destinations, manage university listings, and update regional descriptions.</p>
                            <div className="flex gap-2 text-xs font-bold text-blue-500">
                                <span className="px-3 py-1 bg-blue-500/10 rounded-full">Add Country</span>
                                <span className="px-3 py-1 bg-blue-500/10 rounded-full">Assign Universities</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/admin/applications" className="group">
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all h-full text-left">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-5 bg-purple-500/10 rounded-2xl text-purple-500">
                                    <FileText size={32} />
                                </div>
                                <ArrowRight className="text-slate-300 group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Application Manager</h3>
                            <p className="text-slate-500 mb-8 font-medium">Review student intake forms, manage document verification, and track university submissions.</p>
                            <div className="flex gap-2 text-xs font-bold text-purple-500">
                                <span className="px-3 py-1 bg-purple-500/10 rounded-full">Intake Review</span>
                                <span className="px-3 py-1 bg-purple-500/10 rounded-full">Docs Verified</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/admin/consultations" className="group">
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all h-full text-left">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-5 bg-emerald-500/10 rounded-2xl text-emerald-500">
                                    <Users size={32} />
                                </div>
                                <ArrowRight className="text-slate-300 group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Consultation Requests</h3>
                            <p className="text-slate-500 mb-8 font-medium">Review partnership inquiries, filter B2B leads by region, and schedule specialist meetings.</p>
                            <div className="flex gap-2 text-xs font-bold text-emerald-500">
                                <span className="px-3 py-1 bg-emerald-500/10 rounded-full">B2B Leads</span>
                                <span className="px-3 py-1 bg-emerald-500/10 rounded-full">Partner Growth</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
