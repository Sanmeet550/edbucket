import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const UniversityCard = ({ university }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="glass group rounded-[2rem] overflow-hidden border border-white/10 flex flex-col h-full transition-all duration-500"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={university.banner_url || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800'}
                    alt={university.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>

                <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white/20">
                        <img
                            src={university.logo_url || 'https://via.placeholder.com/150'}
                            alt={`${university.name} logo`}
                            className="w-10 h-10 object-contain"
                        />
                    </div>
                </div>

                {university.category && (
                    <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-accent/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider">
                            {university.category}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-heading font-bold text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                    {university.name}
                </h3>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
                    <MapPin size={14} className="text-accent" />
                    <span>{university.location || 'Location Not Specified'}</span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-6 flex-grow">
                    {university.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                        <GraduationCap size={14} />
                        <span>{university.intake_details || 'Multiple Intakes'}</span>
                    </div>

                    <Link
                        to={`/universities/${university.slug}`}
                        className="flex items-center gap-2 text-sm font-bold text-accent group/btn"
                    >
                        View Details
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ArrowRight size={16} />
                        </motion.span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default UniversityCard;
