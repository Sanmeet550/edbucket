import { useState } from 'react'
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react'

const ApplicationForm = () => {
    const { universityId } = useParams()
    const [searchParams] = useSearchParams()
    const countryId = searchParams.get('country')
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        applicant_name: '',
        email: '',
        phone: '',
        consultancy_name: '',
        intended_intake: '',
        program_interest: '',
        additional_notes: '',
        university_id: universityId,
        country_id: countryId
    })

    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)

        try {
            const response = await fetch('http://127.0.0.1:8000/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!response.ok) throw new Error('Submission failed. Please try again.')

            setSubmitted(true)
            setTimeout(() => navigate('/'), 5000)
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <div className="min-h-screen pt-40 flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-xl w-full text-center glass p-16 rounded-[4rem] border-primary/20 shadow-3xl"
                >
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} className="text-primary" />
                    </div>
                    <h2 className="text-4xl font-heading font-extrabold mb-6">Partnership Inquired!</h2>
                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                        Your application for institutional access has been received. Our regional partner team will review your consultancy details and contact you within 24-48 business hours.
                    </p>
                    <Link to="/" className="text-primary font-bold flex items-center justify-center gap-2">
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <Link to={`/`} className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-bold">
                        <ArrowLeft size={20} /> Cancel Application
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4">
                        Institutional <span className="brand-gradient-text">Inquiry</span>
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Complete your partner profile to initiate the direct application process with your selected institution.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-2">Primary Contact Name</label>
                                    <input
                                        required name="applicant_name" value={formData.applicant_name} onChange={handleChange}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-2">Business Email</label>
                                    <input
                                        required type="email" name="email" value={formData.email} onChange={handleChange}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all"
                                        placeholder="john@consultancy.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-2">Phone Number</label>
                                    <input
                                        required name="phone" value={formData.phone} onChange={handleChange}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-2">Consultancy Name</label>
                                    <input
                                        required name="consultancy_name" value={formData.consultancy_name} onChange={handleChange}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all"
                                        placeholder="Global Education Partners"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-2">Intended Intake</label>
                                    <select
                                        name="intended_intake" value={formData.intended_intake} onChange={handleChange}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all"
                                    >
                                        <option value="">Select Intake</option>
                                        <option value="Fall 2026">Fall 2026</option>
                                        <option value="Spring 2027">Spring 2027</option>
                                        <option value="Fall 2027">Fall 2027</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-2">Program Interest</label>
                                    <input
                                        name="program_interest" value={formData.program_interest} onChange={handleChange}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all"
                                        placeholder="Masters / Undergrad / Diploma"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-2">Partnership Notes</label>
                                <textarea
                                    name="additional_notes" value={formData.additional_notes} onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all min-h-[150px]"
                                    placeholder="Tell us about your student volume or specific questions..."
                                />
                            </div>

                            {error && <p className="text-red-500 font-bold ml-2">{error}</p>}

                            <button
                                disabled={submitting}
                                className="w-full bg-primary text-white py-6 rounded-3xl font-bold flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
                            >
                                {submitting ? 'Authenticating Submission...' : 'Send Inquiry to Institution'}
                                <Send size={20} />
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-slate-900 border-2 border-white/5 rounded-[3rem] p-10 text-white sticky top-32">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-3 bg-primary/20 rounded-2xl">
                                    <ShieldCheck className="text-secondary" />
                                </div>
                                <h3 className="text-xl font-bold">Partner Security</h3>
                            </div>

                            <p className="text-slate-400 text-sm mb-12 leading-relaxed font-medium">
                                EdBucket ensures all partner inquiries are handled with strict institutional compliance. Your data is encrypted and passed directly to the university recruitment portal.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">01</div>
                                    <div>
                                        <h4 className="font-bold mb-1">Lead Verification</h4>
                                        <p className="text-xs text-slate-500">We verify your consultancy status for direct agency links.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">02</div>
                                    <div>
                                        <h4 className="font-bold mb-1">Direct Connect</h4>
                                        <p className="text-xs text-slate-500">Fast-track access to the university's partner dashboard.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicationForm
