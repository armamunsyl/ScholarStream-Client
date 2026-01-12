import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const quickLinks = [
    {
        title: 'About',
        description: 'Our mission, values, and what we stand for.',
        to: '/about',
    },
    {
        title: 'Contact',
        description: 'Get in touch with our support and partnerships team.',
        to: '/contact',
    },
    {
        title: 'Blog',
        description: 'Tips, guides, and scholarship application insights.',
        to: '/blog',
    },
    {
        title: 'Help / Support',
        description: 'Find answers fast or report an issue.',
        to: '/help-support',
    },
    {
        title: 'Privacy / Terms',
        description: 'Learn how we protect your data and platform rules.',
        to: '/privacy-terms',
    },
];

const HomeQuickLinks = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-b from-[#EFF3FF] to-white py-20 dark:from-[#0b1120] dark:to-[#0f172a]"
        >
            <div className="mx-auto max-w-6xl px-4">
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Learn More
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
                        Explore ScholarStream
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                        Quick access to everything you might need beyond scholarships.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {quickLinks.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="h-full"
                        >
                            <Link
                                to={item.to}
                                className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-black/5 transition hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-[#0f172a]"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                        {item.description}
                                    </p>
                                </div>
                                <span className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#1B3C73] dark:text-sky-300">
                                    Learn more
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default HomeQuickLinks;
