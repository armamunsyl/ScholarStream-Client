import React from 'react';
import { motion } from 'framer-motion';

const scholarships = [
    {
        id: 1,
        name: 'Stanford University',
        fundingType: 'Full Funding',
        location: 'Palo Alto, United States',
        rank: 'World Rank',
        amount: '$30',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        name: 'Harvard University',
        fundingType: 'Full Funding',
        location: 'Cambridge, United States',
        rank: 'World Rank',
        amount: '$70',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        name: 'University of Melbourne',
        fundingType: 'Partial Funding',
        location: 'Melbourne, Australia',
        rank: 'World Rank',
        amount: '$40',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 4,
        name: 'University of Toronto',
        fundingType: 'Full Funding',
        location: 'Toronto, Canada',
        rank: 'World Rank',
        amount: '$48',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 5,
        name: 'University of Oxford',
        fundingType: 'Partial Funding',
        location: 'Oxford, United Kingdom',
        rank: 'World Rank',
        amount: '$55',
        image: 'https://images.unsplash.com/photo-1500534316214-c83b51c79088?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 6,
        name: 'ETH Zürich',
        fundingType: 'Research Grant',
        location: 'Zürich, Switzerland',
        rank: 'World Rank',
        amount: '$60',
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80'
    }
];

const Popular = () => {
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

                <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {scholarships.map((college) => (
                        <motion.article
                            key={college.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: college.id * 0.05 }}
                            whileHover={{ translateY: -6, boxShadow: '0 20px 30px rgba(0,0,0,0.2)' }}
                            className="flex h-full flex-col overflow-hidden rounded-3xl bg-white text-slate-900 shadow-lg shadow-black/20"
                        >
                            <div className="relative h-32 w-full sm:h-40 lg:h-48">
                                <img
                                    src={college.image}
                                    alt={college.name}
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
                                    <h3 className="leading-tight">{college.name}</h3>
                                </div>
                                <span className="mt-3 inline-flex items-center rounded-full border border-[#D6E8FF] px-3 py-1 text-[9px] font-semibold text-[#1C4E94] sm:px-4 sm:text-xs">
                                    {college.fundingType}
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
                                        {college.location}
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
                                        {college.rank}
                                    </li>
                                </ul>

                                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 sm:flex-nowrap sm:justify-between">
                                    <span className="text-lg font-bold text-slate-900 sm:text-2xl">{college.amount}</span>
                                    <button className="flex-1 rounded-full bg-[#234DCC] px-2.5 py-1 text-[8px] font-semibold text-white transition hover:bg-[#1b3ba0] sm:flex-none sm:px-5 sm:py-2 sm:text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Popular;
