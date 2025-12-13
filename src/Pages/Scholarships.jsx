import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const scholarshipsData = [
    {
        id: 1,
        university: 'Cornell University',
        program: 'Global Scholars Program',
        category: 'Full Funded',
        subject: 'Engineering',
        location: 'Ithaca, United States',
        fee: '$235',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        university: 'Stanford University',
        program: 'Stanford International Award',
        category: 'Full Funded',
        subject: 'Science',
        location: 'Stanford, United States',
        fee: '$30',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        university: 'University of Toronto',
        program: 'International Scholar Grant',
        category: 'Partial Funded',
        subject: 'Business',
        location: 'Toronto, Canada',
        fee: '$20',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 4,
        university: 'Harvard University',
        program: 'Crimson Scholars Program',
        category: 'Full Funded',
        subject: 'Law',
        location: 'Cambridge, United States',
        fee: '$40',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 5,
        university: 'University of Oxford',
        program: 'Oxford Global Award',
        category: 'Full Funded',
        subject: 'Humanities',
        location: 'Oxford, United Kingdom',
        fee: '$35',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 6,
        university: 'University of Sydney',
        program: 'Merit Scholarship',
        category: 'Full Funded',
        subject: 'Medicine',
        location: 'Sydney, Australia',
        fee: '$10',
        image: 'https://images.unsplash.com/photo-1469474989222-079c3f1f4b1c?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 7,
        university: 'University of Edinburgh',
        program: 'Edinburgh Excellence Award',
        category: 'Full Funded',
        subject: 'Arts',
        location: 'Edinburgh, United Kingdom',
        fee: '$25',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 8,
        university: 'University of Amsterdam',
        program: 'Carnegie Scholarship',
        category: 'Full Funded',
        subject: 'Economics',
        location: 'Amsterdam, Netherlands',
        fee: '$28',
        image: 'https://images.unsplash.com/photo-1500534314211-77a0944b3e27?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 9,
        university: 'ETH Zürich',
        program: 'Innovation Grant',
        category: 'Partial Funded',
        subject: 'Engineering',
        location: 'Zürich, Switzerland',
        fee: '$45',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 10,
        university: 'University of Melbourne',
        program: 'Global Impact Award',
        category: 'Full Funded',
        subject: 'Business',
        location: 'Melbourne, Australia',
        fee: '$38',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 11,
        university: 'University of California, Berkeley',
        program: 'Berkeley Scholars Program',
        category: 'Full Funded',
        subject: 'Technology',
        location: 'Berkeley, United States',
        fee: '$50',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 12,
        university: 'Cambridge University',
        program: 'Cambridge Global Fellowship',
        category: 'Full Funded',
        subject: 'Science',
        location: 'Cambridge, United Kingdom',
        fee: '$32',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 13,
        university: 'Princeton University',
        program: 'Princeton Leadership Award',
        category: 'Partial Funded',
        subject: 'Public Policy',
        location: 'Princeton, United States',
        fee: '$42',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 14,
        university: 'University of British Columbia',
        program: 'UBC Merit Scholarship',
        category: 'Full Funded',
        subject: 'Environmental Science',
        location: 'Vancouver, Canada',
        fee: '$27',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 15,
        university: 'University of Queensland',
        program: 'Global Leadership Program',
        category: 'Full Funded',
        subject: 'Marine Biology',
        location: 'Brisbane, Australia',
        fee: '$29',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 16,
        university: 'Yale University',
        program: 'Yale Future Leaders',
        category: 'Partial Funded',
        subject: 'Law',
        location: 'New Haven, United States',
        fee: '$37',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 17,
        university: 'University of Chicago',
        program: 'Chicago Scholars Initiative',
        category: 'Full Funded',
        subject: 'Economics',
        location: 'Chicago, United States',
        fee: '$41',
        image: 'https://images.unsplash.com/photo-1500534313212-2cd4f3d28b58?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 18,
        university: 'University of Hong Kong',
        program: 'HKU Innovation Scholarship',
        category: 'Full Funded',
        subject: 'Technology',
        location: 'Hong Kong, China',
        fee: '$33',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 19,
        university: 'National University of Singapore',
        program: 'NUS Excellence Award',
        category: 'Partial Funded',
        subject: 'Engineering',
        location: 'Singapore',
        fee: '$36',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 20,
        university: 'University of Copenhagen',
        program: 'Nordic Scholars Program',
        category: 'Full Funded',
        subject: 'Environmental Science',
        location: 'Copenhagen, Denmark',
        fee: '$31',
        image: 'https://images.unsplash.com/photo-1469474989222-079c3f1f4b1c?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 21,
        university: 'University of Helsinki',
        program: 'Arctic Research Grant',
        category: 'Full Funded',
        subject: 'Earth Science',
        location: 'Helsinki, Finland',
        fee: '$24',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 22,
        university: 'University of Cape Town',
        program: 'Africa Future Scholars',
        category: 'Full Funded',
        subject: 'Public Health',
        location: 'Cape Town, South Africa',
        fee: '$26',
        image: 'https://images.unsplash.com/photo-1500534314211-77a0944b3e27?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 23,
        university: 'University of Sao Paulo',
        program: 'Brazil Innovation Fund',
        category: 'Partial Funded',
        subject: 'Technology',
        location: 'Sao Paulo, Brazil',
        fee: '$30',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 24,
        university: 'University of Auckland',
        program: 'Auckland Global Scholars',
        category: 'Full Funded',
        subject: 'Education',
        location: 'Auckland, New Zealand',
        fee: '$22',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 25,
        university: 'Lund University',
        program: 'Nordic Excellence Grant',
        category: 'Full Funded',
        subject: 'Engineering',
        location: 'Lund, Sweden',
        fee: '$28',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 26,
        university: 'Tsinghua University',
        program: 'Innovation Leaders Scholarship',
        category: 'Partial Funded',
        subject: 'Technology',
        location: 'Beijing, China',
        fee: '$39',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 27,
        university: 'Monash University',
        program: 'Global Excellence Scholarship',
        category: 'Full Funded',
        subject: 'Pharmacy',
        location: 'Melbourne, Australia',
        fee: '$34',
        image: 'https://images.unsplash.com/photo-1500534314211-77a0944b3e27?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 28,
        university: 'University of Vienna',
        program: 'Vienna Scholars ',
        category: 'Full Funded',
        subject: 'History',
        location: 'Vienna, Austria',
        fee: '$23',
        image: 'https://images.unsplash.com/photo-1469474989222-079c3f1f4b1c?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 29,
        university: 'University of Geneva',
        program: 'Global Diplomacy Grant',
        category: 'Full Funded',
        subject: 'International Relations',
        location: 'Geneva, Switzerland',
        fee: '$27',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 30,
        university: 'McGill University',
        program: 'McGill Impact Scholarship',
        category: 'Partial Funded',
        subject: 'Medicine',
        location: 'Montreal, Canada',
        fee: '$41',
        image: 'https://images.unsplash.com/photo-1500534314211-77a0944b3e27?auto=format&fit=crop&w=800&q=80'
    }
];

const Scholarships = () => {
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const pageSize = isMobile ? 10 : 9;
    const totalPages = Math.ceil(scholarshipsData.length / pageSize);

    useEffect(() => {
        setPage((prev) => Math.min(prev, totalPages));
    }, [totalPages]);

    const pageData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return scholarshipsData.slice(start, start + pageSize);
    }, [page, pageSize]);

    const handlePageChange = (direction) => {
        setPage((prev) => {
            if (direction === 'prev') return Math.max(1, prev - 1);
            if (direction === 'next') return Math.min(totalPages, prev + 1);
            return prev;
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
                        />
                    </div>
                    {['Scholarship Category', 'Subject Category', 'Sort by'].map((placeholder) => (
                        <select
                            key={placeholder}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none"
                        >
                            <option>{placeholder}</option>
                        </select>
                    ))}
                </motion.div>

                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
                    {pageData.map((item) => (
                        <motion.article
                            key={item.id}
                            className="flex h-full flex-col rounded-3xl bg-white text-slate-900 shadow-lg shadow-black/5 transition hover:-translate-y-1"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: (item.id % pageSize) * 0.05 }}
                            whileHover={{ translateY: -8, boxShadow: '0 25px 35px rgba(23,20,54,0.15)' }}
                        >
                            <div className="h-28 w-full overflow-hidden rounded-t-3xl sm:h-40">
                                <img src={item.image} alt={item.university} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col p-4 sm:p-5">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold sm:text-lg">{item.university}</h3>
                                    <p className="text-xs text-slate-600 sm:text-sm">{item.program}</p>
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
                                    <span className="truncate">{item.location}</span>
                                </div>
                                <span className="mt-3 inline-flex items-center rounded-full bg-[#D6F5E5] px-2 py-0.5 text-[9px] font-semibold text-[#1B6B3C] sm:px-3 sm:py-1 sm:text-xs">
                                    {item.category}
                                </span>
                                <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 sm:block sm:text-xs">
                                        <span className="uppercase tracking-wide">Application Fee</span>
                                        <span className="ml-2 text-base font-bold text-slate-900 sm:ml-0 sm:block sm:text-lg">
                                            {item.fee}
                                        </span>
                                    </div>
                                    <Link to={"/scholarship-details/1"}>
                                    <button className="w-full rounded-full bg-[#234DCC] px-3 py-1 text-[10px] font-semibold text-white transition hover:bg-[#1b3ba0] sm:w-auto sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm">
                                        View Details
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
                <motion.div
                    className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <p className="text-sm text-slate-500">
                        Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, scholarshipsData.length)} of{' '}
                        {scholarshipsData.length} scholarships
                    </p>
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
