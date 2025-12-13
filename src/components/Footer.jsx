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
                            <ul className="mt-3 space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Twitter
                                    </a>
                                </li>
                            </ul>
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
