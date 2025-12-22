import { div } from 'framer-motion/client';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ErrorPage = () => {
    return (


        <div>
            <Navbar></Navbar>
            <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0f1f3f] via-[#112b5c] to-[#0b1831] text-white">
                <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 text-center">
                    <p className="text-xs font-semibold tracking-[0.3em] text-white/60">SCHOLARSTREAM</p>
                    <h1 className="mt-4 text-7xl font-black tracking-tight text-white drop-shadow-lg sm:text-8xl">404</h1>
                    <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">Lost in the Scholarsphere</h2>
                    <p className="mt-4 max-w-xl text-sm text-white/70 sm:text-base">
                        The page you are looking for doesn&apos;t exist or may have been moved. Let&apos;s guide you back to the
                        scholarships and stories that matter.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/"
                            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0f1f3f] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-slate-100"
                        >
                            Go Home
                        </Link>
                        <Link
                            to="/scholarships"
                            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                        >
                            Browse Scholarships
                        </Link>
                    </div>
                </div>
                <div className="pb-8 text-center text-xs text-white/50">Need help? Contact support@scholarstream.com</div>
            </div>
            <Footer></Footer>
        </div>

    );
};

export default ErrorPage;
