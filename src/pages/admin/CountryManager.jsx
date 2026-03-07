import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Plus, Edit2, Trash2, X, Check, ArrowLeft, Loader2, Building2, ExternalLink, LogOut, Upload, Image as ImageIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

const CountryManager = () => {
    const navigate = useNavigate()
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingCountry, setEditingCountry] = useState(null)
    const [formData, setFormData] = useState({
        name: '', slug: '', description: '', institutional_presence: '', university_types: '', partner_opportunity: '', image_url: ''
    })
    const [uploading, setUploading] = useState(false)

    // University Management State
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [universities, setUniversities] = useState([])
    const [uniLoading, setUniLoading] = useState(false)
    const [showUniModal, setShowUniModal] = useState(false)
    const [editingUni, setEditingUni] = useState(null)
    const [uniForm, setUniForm] = useState({
        name: '', logo_url: '', banner_url: '', description: '', full_description: '',
        category: '', website_url: '', student_diversity_text: '',
        courses_offered: '', intake_details: ''
    })

    useEffect(() => {
        fetchCountries()
    }, [])

    const fetchCountries = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('admin_token')
            const res = await fetch('http://127.0.0.1:8000/api/admin/countries', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const data = await res.json()
            if (res.status === 401) navigate('/admin/login')
            setCountries(data)
        } catch (err) {
            console.error('Fetch error')
        } finally {
            setLoading(false)
        }
    }

    const fetchUniversities = async (countryId) => {
        setUniLoading(true)
        try {
            const token = localStorage.getItem('admin_token')
            const res = await fetch(`http://127.0.0.1:8000/api/admin/countries/${countryId}/universities`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const data = await res.json()
            if (res.status === 401) navigate('/admin/login')
            setUniversities(data)
        } catch (err) {
            console.error('Fetch universities error')
        } finally {
            setUniLoading(false)
        }
    }

    const handleFileUpload = async (e, prefix = 'country', isUni = false) => {
        const file = e.target.files[0]
        if (!file) return

        if (prefix === 'uni_banner') {
            const img = new Image()
            img.src = URL.createObjectURL(file)
            await new Promise((resolve) => {
                img.onload = () => {
                    if (img.width < 1200) {
                        alert(`Banner too small (${img.width}px). Minimum width required: 1200px for high quality.`)
                        resolve(false)
                    }
                    resolve(true)
                }
            }).then(isValid => { if (!isValid) throw new Error('Invalid dimensions') })
        }

        setUploading(true)
        const formDataUpload = new FormData()
        formDataUpload.append('file', file)

        try {
            const token = localStorage.getItem('admin_token')
            const res = await fetch(`http://127.0.0.1:8000/api/admin/upload-image?prefix=${prefix}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataUpload
            })
            const data = await res.json()
            if (res.ok) {
                if (isUni) {
                    // prefix can be 'uni_logo' or 'uni_banner'
                    const field = prefix === 'uni_logo' ? 'logo_url' : 'banner_url'
                    setUniForm(prev => ({ ...prev, [field]: data.image_url }))
                } else {
                    setFormData(prev => ({ ...prev, image_url: data.image_url }))
                }
            } else {
                alert('Upload failed: ' + (data.detail || 'Unknown error'))
            }
        } catch (err) {
            if (err.message !== 'Invalid dimensions') {
                console.error('Upload error:', err)
                alert('Upload error. Please check your connection.')
            }
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const method = editingCountry ? 'PUT' : 'POST'
        const url = editingCountry
            ? `http://127.0.0.1:8000/api/admin/countries/${editingCountry.id}`
            : 'http://127.0.0.1:8000/api/admin/countries'

        try {
            const token = localStorage.getItem('admin_token')
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                setShowModal(false)
                fetchCountries()
                setFormData({ name: '', slug: '', description: '', institutional_presence: '', university_types: '', partner_opportunity: '', image_url: '' })
                setEditingCountry(null)
            } else {
                const errorData = await res.json()
                console.error('Submit error details:', errorData)
                alert(`Error: ${errorData.error || 'Failed to preserve destination'}`)
            }
        } catch (err) {
            console.error('Submit error:', err)
            alert('Unable to connect to the server. Please ensure the backend is running and your database is connected.')
        }
    }

    const handleUniSubmit = async (e) => {
        e.preventDefault()
        const method = editingUni ? 'PUT' : 'POST'
        const url = editingUni
            ? `http://127.0.0.1:8000/api/admin/universities/${editingUni.id}`
            : 'http://127.0.0.1:8000/api/admin/universities'

        try {
            const payload = editingUni ? uniForm : { ...uniForm, country_id: selectedCountry.id }
            const token = localStorage.getItem('admin_token')
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })
            if (res.ok) {
                setShowUniModal(false)
                fetchUniversities(selectedCountry.id)
                setUniForm({
                    name: '', logo_url: '', banner_url: '', description: '', full_description: '',
                    category: '', website_url: '', student_diversity_text: '',
                    courses_offered: '', intake_details: ''
                })
                setEditingUni(null)
            }
        } catch (err) {
            console.error('Uni submit error:', err)
        }
    }

    const deleteUni = async (id) => {
        if (!confirm('Are you sure you want to delete this institution?')) return
        try {
            const token = localStorage.getItem('admin_token')
            const res = await fetch(`http://127.0.0.1:8000/api/admin/universities/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) fetchUniversities(selectedCountry.id)
        } catch (err) {
            console.error('Delete uni error:', err)
        }
    }

    const openEdit = (country) => {
        setEditingCountry(country)
        setFormData(country)
        setShowModal(true)
    }

    const selectCountry = (country) => {
        setSelectedCountry(country)
        fetchUniversities(country.id)
    }

    if (selectedCountry) {
        return (
            <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center mb-12">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSelectedCountry(null)} className="p-3 bg-white dark:bg-slate-900 rounded-2xl hover:text-primary transition-colors shadow-sm">
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-3xl font-heading font-extrabold mb-1">Institutions in {selectedCountry.name}</h1>
                                <p className="text-slate-500 font-medium">Manage universities and recruitment partners for this region.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setEditingUni(null);
                                setUniForm({
                                    name: '', logo_url: '', banner_url: '', description: '', full_description: '',
                                    category: '', website_url: '', student_diversity_text: '',
                                    courses_offered: '', intake_details: ''
                                });
                                setShowUniModal(true)
                            }}
                            className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg"
                        >
                            <Plus size={20} /> Add University
                        </button>
                    </div>

                    {uniLoading ? (
                        <div className="flex justify-center p-24"><Loader2 size={48} className="animate-spin text-primary" /></div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {universities.map((uni) => (
                                <div key={uni.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center p-2">
                                            {uni.logo_url ? <img src={uni.logo_url} className="w-full h-full object-contain" /> : <Building2 size={24} className="text-slate-300" />}
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setEditingUni(uni); setUniForm(uni); setShowUniModal(true) }} className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit2 size={16} /></button>
                                            <button onClick={() => deleteUni(uni.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{uni.name}</h3>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4">{uni.category}</div>
                                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{uni.description}</p>
                                </div>
                            ))}
                            {universities.length === 0 && (
                                <div className="col-span-full p-24 text-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
                                    <p className="text-slate-400 font-medium">No institutions added to this destination yet.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {showUniModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowUniModal(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] p-12 shadow-3xl overflow-y-auto max-h-[90vh]"
                            >
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-3xl font-heading font-extrabold">{editingUni ? 'Edit University' : 'New University'}</h2>
                                    <button onClick={() => setShowUniModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X /></button>
                                </div>

                                <form onSubmit={handleUniSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 ml-2">University Name</label>
                                        <input required value={uniForm.name} onChange={(e) => setUniForm({ ...uniForm, name: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-500 ml-2">Category</label>
                                            <input value={uniForm.category} onChange={(e) => setUniForm({ ...uniForm, category: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary" placeholder="e.g., Russell Group" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <label className="text-sm font-bold text-slate-500 ml-2">Logo</label>
                                            <div className="relative group aspect-square w-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center cursor-pointer">
                                                <input
                                                    type="file" accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'uni_logo', true)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                {uniForm.logo_url ? (
                                                    <div className="relative w-full h-full">
                                                        <img src={uniForm.logo_url} className="w-full h-full object-contain p-2" />
                                                        <button
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); setUniForm(prev => ({ ...prev, logo_url: '' })) }}
                                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg shadow-lg hover:scale-110 active:scale-90 transition-all z-20"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <Upload size={24} className="text-slate-400" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center ml-2">
                                                <label className="text-sm font-bold text-slate-500">Banner</label>
                                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">MIN WIDTH: 1200PX</span>
                                            </div>
                                            <div className="relative group aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center cursor-pointer">
                                                <input
                                                    type="file" accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'uni_banner', true)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                {uniForm.banner_url ? (
                                                    <div className="relative w-full h-full">
                                                        <img src={uniForm.banner_url} className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); setUniForm(prev => ({ ...prev, banner_url: '' })) }}
                                                            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl shadow-xl hover:scale-110 active:scale-90 transition-all z-20"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <Upload size={24} className="text-slate-400" />
                                                )}
                                            </div>
                                            <p className="text-[10px] text-slate-400 ml-2 italic">Recommended: 1920x600px. High resolution cinematic shots look best.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-500 ml-2">Logo URL</label>
                                            <input value={uniForm.logo_url} onChange={(e) => setUniForm({ ...uniForm, logo_url: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-500 ml-2">Banner URL</label>
                                            <input value={uniForm.banner_url} onChange={(e) => setUniForm({ ...uniForm, banner_url: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary text-sm" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-500 ml-2">Website URL</label>
                                            <input value={uniForm.website_url} onChange={(e) => setUniForm({ ...uniForm, website_url: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary" placeholder="Official Website" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-500 ml-2">Student Diversity</label>
                                            <input value={uniForm.student_diversity_text} onChange={(e) => setUniForm({ ...uniForm, student_diversity_text: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary" placeholder="e.g., 20,000+ International Students" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-500 ml-2">Next Intake</label>
                                            <input value={uniForm.intake_details} onChange={(e) => setUniForm({ ...uniForm, intake_details: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary" placeholder="e.g., September 2026" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-500 ml-2">Courses Offered (Summary)</label>
                                            <input value={uniForm.courses_offered} onChange={(e) => setUniForm({ ...uniForm, courses_offered: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary" placeholder="e.g., Medicine, Law, Engineering" />
                                        </div>
                                    </div>


                                    <div className="space-y-2 quill-wrapper">
                                        <label className="text-sm font-bold text-slate-500 ml-2">Full Description</label>
                                        <ReactQuill
                                            theme="snow"
                                            value={uniForm.full_description}
                                            onChange={(val) => setUniForm({ ...uniForm, full_description: val })}
                                            className="bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden"
                                            placeholder="Long-form detailed description for the detail page..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 ml-2">Short Description (for card)</label>
                                        <textarea value={uniForm.description} onChange={(e) => setUniForm({ ...uniForm, description: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary min-h-[100px]" />
                                    </div>
                                    <button type="submit" className="w-full bg-primary text-white py-6 rounded-3xl font-bold shadow-xl">
                                        {editingUni ? 'Save Changes' : 'Create Institution'}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-3 bg-white dark:bg-slate-900 rounded-2xl hover:text-primary transition-colors shadow-sm">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-heading font-extrabold mb-1">Country Management</h1>
                            <p className="text-slate-500 font-medium">Manage global destinations. Click a card to manage institutions.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { setEditingCountry(null); setShowModal(true) }}
                        className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg"
                    >
                        <Plus size={20} /> Add Destination
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-24"><Loader2 size={48} className="animate-spin text-primary" /></div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {countries.map((country) => (
                            <div key={country.id} onClick={() => selectCountry(country)} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm group hover:shadow-xl transition-all cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all">
                                    <ExternalLink size={20} className="text-primary" />
                                </div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform overflow-hidden">
                                        {country.image_url ? (
                                            <img src={country.image_url} className="w-full h-full object-cover" />
                                        ) : (
                                            <Globe size={28} />
                                        )}
                                    </div>
                                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => openEdit(country)} className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit2 size={16} /></button>
                                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{country.name}</h3>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Building2 size={14} className="text-primary" /> {country.institutional_presence}
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{country.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] p-12 shadow-3xl overflow-y-auto max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-3xl font-heading font-extrabold">{editingCountry ? 'Edit Destination' : 'New Destination'}</h2>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 ml-2">Country Name</label>
                                        <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary" placeholder="e.g., United Kingdom" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 ml-2">Slug (URL friendly)</label>
                                        <input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary" placeholder="e.g., united-kingdom" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500 ml-2">Institutional Presence (Badge Text)</label>
                                    <input value={formData.institutional_presence} onChange={(e) => setFormData({ ...formData, institutional_presence: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary" placeholder="e.g., 200+ Institutions" />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end ml-2">
                                        <label className="text-sm font-bold text-slate-500">Header Image</label>
                                        <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-black">RECOMMENDED: 1200×800PX</span>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6 items-start">
                                        <div className="space-y-4">
                                            <div className="relative group cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    disabled={uploading}
                                                />
                                                <div className="bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 group-hover:border-primary group-hover:bg-primary/5 transition-all">
                                                    {uploading ? (
                                                        <Loader2 size={32} className="animate-spin text-primary" />
                                                    ) : (
                                                        <Upload size={32} className="text-slate-400 group-hover:text-primary transition-colors" />
                                                    )}
                                                    <div className="text-center">
                                                        <p className="font-bold text-slate-700 dark:text-slate-200">
                                                            {uploading ? 'Uploading...' : 'Click to Upload'}
                                                        </p>
                                                        <p className="text-xs text-slate-400">JPG, PNG, WebP up to 10MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                                                    <ImageIcon size={18} />
                                                </div>
                                                <input
                                                    value={formData.image_url}
                                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                                    className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-primary text-sm"
                                                    placeholder="Or paste an image URL..."
                                                />
                                            </div>
                                        </div>

                                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5">
                                            {formData.image_url ? (
                                                <div className="relative w-full h-full">
                                                    <img src={formData.image_url} className="w-full h-full object-cover" alt="Preview" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                                                        className="absolute top-4 right-4 p-2.5 bg-red-500 text-white rounded-xl shadow-xl hover:scale-110 active:scale-90 transition-all z-20 flex items-center gap-2 font-bold text-xs"
                                                    >
                                                        <Trash2 size={16} /> Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                    <ImageIcon size={48} className="mb-2 opacity-20" />
                                                    <p className="text-xs font-medium">Image Preview</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 quill-wrapper">
                                    <label className="text-sm font-bold text-slate-500 ml-2">Short Description</label>
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.description}
                                        onChange={(val) => setFormData({ ...formData, description: val })}
                                        className="bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden"
                                    />
                                </div>

                                <div className="space-y-2 quill-wrapper">
                                    <label className="text-sm font-bold text-slate-500 ml-2">Market/Partner Opportunity</label>
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.partner_opportunity}
                                        onChange={(val) => setFormData({ ...formData, partner_opportunity: val })}
                                        className="bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden"
                                    />
                                </div>

                                <button type="submit" className="w-full bg-primary text-white py-6 rounded-3xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">
                                    {editingCountry ? 'Save Changes' : 'Launch Destination'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <style>{`
                .quill-wrapper .ql-toolbar {
                    border: none !important;
                    background: #f8fafc;
                    padding: 12px 20px !important;
                    border-bottom: 1px solid #e2e8f0 !important;
                }
                .dark .quill-wrapper .ql-toolbar {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.05) !important;
                }
                .quill-wrapper .ql-container {
                    border: none !important;
                    min-height: 200px;
                    font-family: inherit;
                    font-size: 16px;
                }
                .quill-wrapper .ql-editor {
                    padding: 20px !important;
                    color: inherit;
                }
                .dark .quill-wrapper .ql-stroke { stroke: #cbd5e1 !important; }
                .dark .quill-wrapper .ql-fill { fill: #cbd5e1 !important; }
                .dark .quill-wrapper .ql-picker { color: #cbd5e1 !important; }
                .dark .quill-wrapper .ql-picker-options { background-color: #0f172a !important; border-color: rgba(255,255,255,0.05) !important; }
            `}</style>
        </div>
    )
}

export default CountryManager
