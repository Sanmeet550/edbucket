import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin,
    Calendar,
    BookOpen,
    ArrowLeft,
    GraduationCap,
    Globe,
    CheckCircle2,
    ExternalLink,
    ChevronRight
} from 'lucide-react';

const UniversityDetail = () => {
    const { slug } = useParams();
    const [university, setUniversity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUniversity = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/universities/${slug}`);
                if (!response.ok) throw new Error('University not found');
                const data = await response.json();
                setUniversity(data);

                // Dynamic SEO Update
                document.title = `${data.name} | EdBucket Universities`;
                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) metaDesc.setAttribute('content', data.description);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversity();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error || !university) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
            <div className="text-center">
                <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-4">404</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">{error || 'University not found'}</p>
                <Link to="/universities" className="bg-accent text-primary px-8 py-3 rounded-2xl font-bold inline-flex items-center gap-2 hover:scale-105 transition-all">
                    <ArrowLeft size={20} />
                    Back to Universities
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            {/* JSON-LD Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "EducationalOrganization",
                    "name": university.name,
                    "description": university.description,
                    "url": window.location.href,
                    "logo": university.logo_url,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": university.location
                    }
                })}
            </script>

            {/* Hero Banner Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={university.banner_url || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200'}
                    alt={university.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                <div className="absolute inset-0 flex items-end pb-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-4xl"
                        >
                            <Link
                                to="/universities"
                                className="inline-flex items-center gap-2 text-white/80 hover:text-accent font-medium mb-8 transition-colors group"
                            >
                                <ArrowLeft size={18} />
                                Back to all universities
                            </Link>

                            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
                                <div className="w-24 h-24 bg-white rounded-[2rem] p-4 shadow-2xl flex items-center justify-center border border-white/10">
                                    <img src={university.logo_url} alt="Logo" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-4 leading-tight">
                                        {university.name}
                                    </h1>
                                    <div className="flex flex-wrap gap-4 items-center text-white/80 shrink-0">
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium">
                                            <MapPin size={16} className="text-accent" />
                                            {university.location}
                                        </span>
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-primary text-sm font-bold">
                                            <GraduationCap size={16} />
                                            {university.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-10 relative z-10 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="brand-card rounded-[2.5rem] p-8 md:p-12 overflow-hidden"
                        >
                            <h2 className="text-3xl font-heading font-bold text-slate-800 dark:text-white mb-6">About the University</h2>
                            <div className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed break-words rich-text">
                                <div dangerouslySetInnerHTML={{ __html: university.full_description || university.description || 'Information about this institution is being updated.' }} />
                            </div>

                            {university.courses_offered && (
                                <div className="mt-12">
                                    <h3 className="text-xl font-heading font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                        <BookOpen size={24} className="text-accent" />
                                        Courses Offered
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {university.courses_offered.split(',').map((course, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                                <CheckCircle2 size={18} className="text-accent shrink-0" />
                                                <span className="font-medium text-slate-700 dark:text-slate-200">{course.trim()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Quick Info Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="brand-card rounded-[2.5rem] p-8"
                        >
                            <h3 className="text-xl font-heading font-bold text-slate-800 dark:text-white mb-6">Quick Overview</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                                        <Calendar size={18} className="text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Next Intake</p>
                                        <p className="font-bold text-slate-800 dark:text-white text-[15px]">{university.intake_details || 'Multiple Sessions'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                                        <Globe size={18} className="text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">International Students</p>
                                        <p className="font-bold text-slate-800 dark:text-white text-[15px]">{university.student_diversity_text || 'Active Diversity'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                                        <ExternalLink size={18} className="text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Official Website</p>
                                        {university.website_url ? (
                                            <a href={university.website_url.startsWith('http') ? university.website_url : `https://${university.website_url}`} target="_blank" rel="noopener noreferrer" className="font-bold text-accent hover:underline flex items-center gap-1 text-[15px]">
                                                Visit Institution <ChevronRight size={14} />
                                            </a>
                                        ) : (
                                            <p className="font-bold text-slate-400 italic text-[15px]">Link not available</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 space-y-4">
                                <Link
                                    to={`/apply/${university.id}`}
                                    className="block w-full text-center py-4 bg-primary dark:bg-accent text-white dark:text-primary rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-indigo-900/10 dark:shadow-cyan-400/10"
                                >
                                    Start Application
                                </Link>
                                <button className="w-full py-4 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                    Download Brochure
                                </button>
                            </div>
                        </motion.div>

                        {/* Help Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="glass-dark bg-slate-900 rounded-[2.5rem] p-8 border border-white/5 shadow-2xl"
                        >
                            <h3 className="text-xl font-heading font-bold text-white mb-4">Need Guidance?</h3>
                            <p className="text-slate-400 mb-8">Our expert consultants are ready to help you with the admission process.</p>
                            <button className="w-full py-4 bg-white text-primary rounded-2xl font-bold hover:bg-accent hover:text-white transition-all">
                                Talk to an Expert
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UniversityDetail;
