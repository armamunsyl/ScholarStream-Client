import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { apiClient } from '../utils/userApi';

const formatCurrency = (value) => {
    if (value === 0) return '$0';
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
        return value || 'N/A';
    }
    return `$${numeric.toLocaleString()}`;
};

const Popular = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        const fetchScholarships = async () => {
            try {
                setError('');
                const { data } = await apiClient.get('/scholarships');
                if (!isMounted) return;
                const list = Array.isArray(data) ? data : [];
                const sorted = [...list].sort(
                    (a, b) =>
                        new Date(b.createdAt || b.updatedAt || 0).getTime() -
                        new Date(a.createdAt || a.updatedAt || 0).getTime()
                );
                const latest = (sorted.length ? sorted : list).slice(0, 6);
                setScholarships(latest);
            } catch (err) {
                if (isMounted) {
                    setError(err?.response?.data?.message || 'Failed to load scholarships.');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchScholarships();
        return () => {
            isMounted = false;
        };
    }, []);

    const cards = useMemo(() => {
        if (!scholarships.length) return [];
        return scholarships.map((scholarship, index) => {
            const {
                _id,
                id,
                scholarshipName,
                scholarshipCategory,
                country,
                city,
                tuitionFees,
                applicationFees,
                universityName,
                image,
                dashboardScholarshipId,
            } = scholarship;
            const displayLocation = [city, country].filter(Boolean).join(', ') || 'Location not specified';
            const fundingLabel = scholarshipCategory || 'Scholarship';
            const fee = formatCurrency(applicationFees ?? tuitionFees ?? 0);
            const derivedId = _id || id || dashboardScholarshipId || index;

            return {
                key: derivedId,
                id: derivedId,
                scholarship,
                universityName,
                scholarshipName,
                fundingLabel,
                displayLocation,
                fee,
                image,
                delay: index * 0.05,
            };
        });
    }, [scholarships]);

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-b from-[#22467c] to-[#23467C] py-20 text-white"
        >
            <div className="mx-auto max-w-6xl px-4">
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">Top Picks</p>
                    <h2 className="mt-2 text-2xl font-bold sm:text-4xl">Top Scholarships</h2>
                </div>

                {error && (
                    <p className="mb-6 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-red-200">
                        {error}
                    </p>
                )}

                <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {(loading ? Array.from({ length: 3 }) : cards).map((college, index) =>
                        loading ? (
                            <div
                                key={index}
                                className="flex h-full animate-pulse flex-col overflow-hidden rounded-3xl bg-white/10 p-6 text-white/70"
                            >
                                <div className="mb-4 h-32 rounded-2xl bg-white/10 sm:h-40 lg:h-48" />
                                <div className="mb-3 h-5 rounded-full bg-white/10" />
                                <div className="mb-2 h-4 w-2/3 rounded-full bg-white/10" />
                                <div className="mb-2 h-4 w-1/2 rounded-full bg-white/10" />
                                <div className="mt-auto h-10 rounded-full bg-white/10" />
                            </div>
                        ) : (
                        <motion.article
                            key={college.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: college.delay }}
                            whileHover={{ translateY: -6, boxShadow: '0 20px 30px rgba(0,0,0,0.2)' }}
                            className="flex h-full flex-col overflow-hidden rounded-3xl bg-white text-slate-900 shadow-lg shadow-black/20"
                        >
                            <div className="relative h-32 w-full sm:h-40 lg:h-48">
                                <img
                                    src={
                                        college.image ||
                                        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'
                                    }
                                    alt={college.scholarshipName || college.universityName}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6 w-6 text-[#1C4E94]"
                                    >
                                        <path d="M3 11.5 12 7l9 4.5-9 4.5-9-4.5Z" />
                                        <path d="M5 10v6.5a8 8 0 0 0 14 0V10" />
                                        <path d="M12 12v9" />
                                    </svg>
                                    <h3 className="leading-tight">{college.scholarshipName || college.universityName}</h3>
                                </div>
                                <span className="mt-3 inline-flex items-center rounded-full border border-[#D6E8FF] px-3 py-1 text-[9px] font-semibold text-[#1C4E94] sm:px-4 sm:text-xs">
                                    {college.fundingLabel}
                                </span>
                                <ul className="mt-3 space-y-2 text-[11px] text-slate-600 sm:text-sm">
                                    <li className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4 text-[#1C4E94]"
                                        >
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        {college.displayLocation}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4 text-[#1C4E94]"
                                        >
                                            <path d="m7 21 5-5 5 5" />
                                            <path d="m7 8 5-5 5 5" />
                                            <path d="M7 8v10" />
                                            <path d="M17 8v10" />
                                        </svg>
                                        {college.universityName || 'Top University'}
                                    </li>
                                </ul>

                                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 sm:flex-nowrap sm:justify-between">
                                    <span className="text-lg font-bold text-slate-900 sm:text-2xl">{college.fee}</span>
                                    <Link
                                        to={`/scholarship-details/${college.id}`}
                                        state={{ scholarship: college.scholarship }}
                                        className="flex-1 rounded-full bg-[#234DCC] px-2.5 py-1 text-center text-[8px] font-semibold text-white transition hover:bg-[#1b3ba0] sm:flex-none sm:px-5 sm:py-2 sm:text-sm"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                        )
                    )}
                </div>
            </div>
        </motion.section>
    );
};

export default Popular;
