import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, Users, Filter, CheckCircle2, XCircle, Search, ArrowLeft, Loader2, Mail, Phone, Calendar, LogOut } from 'lucide-react'

const ApplicationManager = () => {
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('admin_token')
            const res = await fetch('http://127.0.0.1:8000/api/admin/applications', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const data = await res.json()
            if (res.status === 401) navigate('/admin/login')
            setApplications(data)
        } catch (err) {
            console.error('Fetch error')
        } finally {
            setLoading(false)
        }
    }

    const filteredApplications = applications.filter(app =>
        filter === 'All' ? true : app.status === filter
    )

    return (
        <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-3 bg-white dark:bg-slate-900 rounded-2xl hover:text-primary transition-colors shadow-sm">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-heading font-extrabold mb-1">Partner Inquiries</h1>
                            <p className="text-slate-500 font-medium">Review and manage incoming B2B partnership applications.</p>
                        </div>
                    </div>

                    <div className="flex gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5">
                        {['All', 'Pending', 'Reviewed', 'Accepted'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${filter === f ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-24"><Loader2 size={48} className="animate-spin text-primary" /></div>
                ) : (
                    <div className="space-y-6">
                        {filteredApplications.map((app) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={app.id}
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="grid lg:grid-cols-4 gap-8">
                                    <div className="lg:col-span-1 border-r border-slate-100 dark:border-white/5 pr-8">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Partner Details</div>
                                        <h3 className="text-xl font-bold mb-1">{app.applicant_name}</h3>
                                        <p className="text-slate-500 text-sm font-medium mb-4">{app.consultancy_name}</p>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <Mail size={14} /> {app.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <Phone size={14} /> {app.phone}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl">
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Target Country</div>
                                                <div className="font-bold text-sm">{app.country?.name || 'Global'}</div>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl">
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Institution</div>
                                                <div className="font-bold text-sm">{app.university?.name || 'General Access'}</div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl h-fit">
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Partner Note</div>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic line-clamp-2">
                                                "{app.additional_notes || 'No notes provided.'}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between items-end">
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${app.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                                            app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-600' :
                                                'bg-slate-100 text-slate-600'
                                            }`}>
                                            {app.status}
                                        </div>

                                        <div className="flex gap-2">
                                            <button className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all">
                                                <CheckCircle2 size={20} />
                                            </button>
                                            <button className="p-3 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                                <XCircle size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {filteredApplications.length === 0 && (
                            <div className="text-center py-24 glass rounded-[3rem] text-slate-400 font-medium">
                                No partnership inquiries found in this category.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ApplicationManager
