import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-0 bg-gradient-to-b from-[#122C5A] to-[#091A37] text-white"
        >
            <div className="mx-auto max-w-6xl px-4 py-12">
                <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                        <Link to="/" className="flex items-center justify-center gap-3 md:justify-start">
                            <img src="/logo1.png" alt="ScholarStream logo" className="w-10" />
                            <span className="text-2xl font-bold tracking-wide">SCHOLARSTREAM</span>
                        </Link>
                        <p className="max-w-sm text-center text-sm text-white/70 md:text-left">
                            Empowering students to discover scholarships, track progress, and achieve their academic dreams.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 text-center text-sm text-white/80 sm:grid-cols-2 md:grid-cols-3 md:text-left">
                        <div>
                            <p className="text-white">Explore</p>
                            <ul className="mt-3 space-y-2">
                                <li>
                                    <Link to="/scholarships" className="hover:text-white">
                                        All Scholarships
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/success-stories" className="hover:text-white">
                                        Success Stories
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/faq" className="hover:text-white">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-white">Support</p>
                            <ul className="mt-3 space-y-2">
                                <li>
                                    <a href="mailto:support@scholarstream.com" className="hover:text-white">
                                        support@scholarstream.com
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-white">Follow</p>
                            <div className="mt-3 flex items-center justify-center gap-3 text-white md:justify-start">
                                <a
                                    href="https://github.com/armamunsyl"
                                    className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                                    aria-label="GitHub"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.57v-2c-3.34.73-4.05-1.63-4.05-1.63a3.19 3.19 0 0 0-1.34-1.76c-1.1-.74.09-.72.09-.72a2.54 2.54 0 0 1 1.85 1.25 2.58 2.58 0 0 0 3.51 1 2.57 2.57 0 0 1 .76-1.61c-2.67-.3-5.48-1.34-5.48-5.95a4.67 4.67 0 0 1 1.24-3.23 4.35 4.35 0 0 1 .12-3.18s1-.32 3.3 1.23a11.28 11.28 0 0 1 6 0c2.31-1.55 3.29-1.23 3.29-1.23a4.35 4.35 0 0 1 .12 3.18 4.67 4.67 0 0 1 1.24 3.23c0 4.62-2.82 5.64-5.5 5.94a2.88 2.88 0 0 1 .82 2.24v3.33c0 .32.21.7.83.57A12 12 0 0 0 12 .5Z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://x.com/armamunsyl"
                                    className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                                    aria-label="Twitter"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                        <path d="M3 3h5.21l3.24 4.77L15.57 3H21l-7.43 9.82L20.69 21h-5.2l-3.49-5.15L8.42 21H3l7.55-9.82L3 3Z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/armamunsyl"
                                    className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                                    aria-label="LinkedIn"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 8.98h3.96V21H3V8.98Zm7.47 0H14.3v1.65h.07c.46-.87 1.56-1.78 3.22-1.78 3.44 0 4.08 2.26 4.08 5.2V21h-3.96v-5.5c0-1.31-.02-3-1.82-3-1.82 0-2.1 1.42-2.1 2.9V21h-3.95V8.98Z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://armamunsyl.vercel.app/"
                                    className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                                    aria-label="Developer Portfolio"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                                        <path d="M5 5 2 12l3 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="m19 5 3 7-3 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="m9 20 6-16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 border-t border-white/10 pb-24 pt-6 text-center text-xs text-white/60 md:pb-0">
                    © {new Date().getFullYear()} ScholarStream — All rights reserved.
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
