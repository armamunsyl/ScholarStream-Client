import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { saveFirebaseCredential } from '../utils/userApi';

const Login = () => {
    const { loginUser, googleLogin, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState({ error: '', success: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleLogin = async (e) => {
        e.preventDefault();
        setStatus({ error: '', success: '' });
        setSubmitting(true);
        try {
            await loginUser(formData.email, formData.password);
            setStatus({ error: '', success: 'Logged in successfully!' });
            navigate('/', { replace: true });
        } catch (error) {
            setStatus({ error: error.message, success: '' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        setStatus({ error: '', success: '' });
        setSubmitting(true);
        try {
            const credential = await googleLogin();
            await saveFirebaseCredential(credential);
            setStatus({ error: '', success: 'Logged in with Google.' });
            navigate('/', { replace: true });
        } catch (error) {
            setStatus({ error: error.message, success: '' });
        } finally {
            setSubmitting(false);
        }
    };

    const isBusy = submitting || authLoading;

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#1B3C73] to-[#23467C] px-4 py-8"
        >
            <div className="w-full max-w-xs sm:max-w-sm">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="overflow-hidden rounded-[22px] bg-white shadow-2xl shadow-black/20"
                >
                    <div className="relative overflow-hidden bg-[#1B3C73] px-5 py-3 text-center text-white">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <div className="relative flex flex-col items-center gap-1.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/10">
                                <img src="/logo1.png" alt="ScholarStream logo" className="h-5 w-5 object-contain" />
                            </div>
                            <p className="text-sm font-semibold tracking-[0.3em]">SCHOLARSTREAM</p>
                        </div>
                    </div>
                    <div className="px-5 pb-5 pt-4">
                        <h1 className="mb-4 text-center text-lg font-bold text-slate-900">LOGIN</h1>
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1B3C73]"
                                />
                            </label>
                            <label className="block">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-600">Password</span>
                                    <button type="button" className="text-xs font-semibold text-[#1B3C73]">
                                        Forgot?
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your password"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1B3C73]"
                                />
                            </label>
                            <button
                                type="submit"
                                disabled={isBusy}
                                className="w-full rounded-full bg-[#1B3C73] py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#16305b] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isBusy ? 'Please wait...' : 'Login'}
                            </button>
                            {status.error && <p className="text-sm text-red-500">{status.error}</p>}
                            {status.success && <p className="text-sm text-green-600">{status.success}</p>}
                        </form>
                        <div className="mt-4 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-slate-400">
                            <span className="h-px flex-1 bg-slate-200" />
                            <span>or</span>
                            <span className="h-px flex-1 bg-slate-200" />
                        </div>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isBusy}
                            className="mt-2.5 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                className="h-5 w-5"
                            />
                            Continue with Google
                        </button>
                        <p className="mt-5 text-center text-sm text-slate-500">
                            Don&apos;t have an account?{' '}
                            <Link to="/register" className="font-semibold text-[#1B3C73]">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Login;
