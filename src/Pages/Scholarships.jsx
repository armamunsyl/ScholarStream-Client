import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from '../utils/userApi';

const Scholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('date_desc');

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        let isMounted = true;

        const fetchScholarships = async () => {
            try {
                setLoading(true);
                const { data } = await apiClient.get('/scholarships', {
                    params: {
                        search: debouncedSearch || undefined,
                        category: selectedCategory,
                        sort: sortOption,
                    },
                });
                if (isMounted) {
                    setScholarships(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Failed to load scholarships.');
                if (isMounted) {
                    setScholarships([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchScholarships();
        return () => {
            isMounted = false;
        };
    }, [debouncedSearch, selectedCategory, sortOption]);

    const pageSize = isMobile ? 10 : 9;
    const totalPages = Math.max(1, Math.ceil((scholarships.length || 0) / pageSize));

    useEffect(() => {
        setPage((prev) => Math.min(prev, totalPages));
    }, [totalPages]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, selectedCategory, sortOption, pageSize]);

    const pageData = useMemo(() => {
        if (!scholarships.length) return [];
        const start = (page - 1) * pageSize;
        return scholarships.slice(start, start + pageSize);
    }, [page, pageSize, scholarships]);

    const handlePageChange = (direction) => {
        setPage((prev) => {
            if (direction === 'prev') return Math.max(1, prev - 1);
            if (direction === 'next') return Math.min(totalPages, prev + 1);
            return prev;
        });
    };

    const renderCards = () => {
        if (loading) {
            return (
                <div className="col-span-full flex min-h-[200px] items-center justify-center rounded-3xl bg-white text-slate-500">
                    Loading scholarships...
                </div>
            );
        }
        if (!pageData.length) {
            const hasFilters = Boolean(debouncedSearch || selectedCategory !== 'all');
            return (
                <div className="col-span-full rounded-3xl border border-slate-100 bg-white p-10 text-center text-slate-500">
                    {hasFilters ? 'No scholarships match your filters.' : 'No scholarships available right now.'}
                </div>
            );
        }

        return pageData.map((item, index) => {
            const location = [item.city, item.country].filter(Boolean).join(', ');
            const detailId = item._id || item.id;

            return (
                <motion.article
                    key={detailId || index}
                    className="flex h-full flex-col rounded-3xl bg-white text-slate-900 shadow-lg shadow-black/5 transition hover:-translate-y-1"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % pageSize) * 0.05 }}
                    whileHover={{ translateY: -8, boxShadow: '0 25px 35px rgba(23,20,54,0.15)' }}
                >
                    <div className="h-28 w-full overflow-hidden rounded-t-3xl sm:h-40">
                        <img
                            src={item.image || 'https://i.ibb.co/s1sDzpT/default-avatar.png'}
                            alt={item.universityName || item.scholarshipName}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold sm:text-lg">{item.universityName}</h3>
                            <p className="text-xs text-slate-600 sm:text-sm">{item.scholarshipName}</p>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-600 sm:text-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-[#1B3C73]"
                            >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span className="truncate">{location || item.location || 'Not specified'}</span>
                        </div>
                        <span className="mt-3 inline-flex items-center rounded-full bg-[#D6F5E5] px-2 py-0.5 text-[9px] font-semibold text-[#1B6B3C] sm:px-3 sm:py-1 sm:text-xs">
                            {item.scholarshipCategory || item.subjectCategory || 'Scholarship'}
                        </span>
                        <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center justify-between text-[10px] text-slate-400 sm:block sm:text-xs">
                                <span className="uppercase tracking-wide">Application Fee</span>
                                <span className="ml-2 text-base font-bold text-slate-900 sm:ml-0 sm:block sm:text-lg">
                                    {item.applicationFees ? `$${item.applicationFees}` : '—'}
                                </span>
                            </div>
                            <Link
                                to={`/scholarship-details/${detailId || ''}`}
                                state={{ scholarship: item }}
                            >
                                <button className="w-full rounded-full bg-[#234DCC] px-3 py-1 text-[10px] font-semibold text-white transition hover:bg-[#1b3ba0] sm:w-auto sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.article>
            );
        });
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-b from-[#EFF3FF] to-white py-16"
        >
            <div className="mx-auto max-w-6xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">All Scholarships</h1>
                    <p className="mt-3 text-sm text-slate-500 sm:text-base">
                        Discover and compare scholarships that match your goals.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-10 grid gap-4 sm:grid-cols-4"
                >
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 sm:col-span-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-[#1B3C73]"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Scholarship name, University, Degree"
                            className="w-full bg-transparent text-sm text-slate-700 outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Category</option>
                        <option value="Full Fund">Full Fund</option>
                        <option value="Pertial Fund">Partial Fund</option>
                    </select>
                    <select
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="date_desc">Latest First</option>
                        <option value="fee_asc">Fee: Low to High</option>
                        <option value="fee_desc">Fee: High to Low</option>
                    </select>
                </motion.div>

                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                    {renderCards()}
                </div>

                <motion.div
                    className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    {(() => {
                        const total = scholarships.length;
                        const startCount = total ? (page - 1) * pageSize + 1 : 0;
                        const endCount = total ? Math.min(page * pageSize, total) : 0;
                        return (
                            <p className="text-sm text-slate-500">
                                Showing {startCount}-{endCount} of {total} scholarships
                            </p>
                        );
                    })()}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange('prev')}
                            disabled={page === 1}
                            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-40"
                        >
                            Previous
                        </button>
                        <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow">
                            Page {page} of {totalPages}
                        </div>
                        <button
                            onClick={() => handlePageChange('next')}
                            disabled={page === totalPages}
                            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Scholarships;
