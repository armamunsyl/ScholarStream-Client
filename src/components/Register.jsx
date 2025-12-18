import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { saveUser, saveFirebaseCredential } from '../utils/userApi';

const Register = () => {
    const navigate = useNavigate();
    const { createUser, updateUserProfile, googleLogin, loading: authLoading } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', photoURL: '' });
    const [status, setStatus] = useState({ error: '', success: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setStatus({ error: '', success: '' });
        setSubmitting(true);
        try {
            await createUser(formData.email, formData.password);
            await updateUserProfile(formData.name, formData.photoURL);
            await saveUser({
                name: formData.name,
                email: formData.email,
                photoURL: formData.photoURL,
                createdAt: new Date().toISOString(),
            });
            setStatus({ error: '', success: 'Account created successfully!' });
            navigate('/', { replace: true });
        } catch (error) {
            setStatus({ error: error.message, success: '' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleRegister = async () => {
        setStatus({ error: '', success: '' });
        setSubmitting(true);
        try {
            const credential = await googleLogin();
            await saveFirebaseCredential(credential);
            setStatus({ error: '', success: 'Signed in with Google.' });
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
            className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#1B3C73] to-[#23467C] px-4 py-12"
        >
            <div className="w-full max-w-sm">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-black/20"
                >
                    <div className="relative overflow-hidden bg-[#1B3C73] px-7 py-5 text-center text-white">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <div className="relative flex flex-col items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/10">
                                <img src="/logo1.png" alt="ScholarStream logo" className="h-6 w-6 object-contain" />
                            </div>
                            <p className="text-base font-semibold tracking-[0.3em]">SCHOLARSTREAM</p>
                        </div>
                    </div>
                    <div className="px-6 pb-6 pt-5">
                        <h1 className="mb-4 text-center text-xl font-bold text-slate-900">REGISTER</h1>
                        <form className="space-y-3" onSubmit={handleRegister}>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600">Full Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your name"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1B3C73]"
                                />
                            </label>
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
                                <span className="text-sm font-medium text-slate-600">Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Create a strong password"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1B3C73]"
                                />
                                <p className="mt-1 text-xs text-slate-400">Use at least 8 characters with numbers & symbols</p>
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600">Photo URL</span>
                                <input
                                    type="url"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    placeholder="https://example.com/photo.jpg"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1B3C73]"
                                />
                            </label>
                            <button
                                type="submit"
                                disabled={isBusy}
                                className="w-full rounded-full bg-[#1B3C73] py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#16305b] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isBusy ? 'Creating Account...' : 'Create Account'}
                            </button>
                            {status.error && <p className="text-sm text-red-500">{status.error}</p>}
                            {status.success && <p className="text-sm text-green-600">{status.success}</p>}
                        </form>
                        <p className="mt-5 text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-[#1B3C73]">
                                Login
                            </Link>
                        </p>
                        <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-slate-400">
                            <span className="h-px flex-1 bg-slate-200" />
                            <span>or</span>
                            <span className="h-px flex-1 bg-slate-200" />
                        </div>
                        <button
                            type="button"
                            onClick={handleGoogleRegister}
                            disabled={isBusy}
                            className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                className="h-5 w-5"
                            />
                            Register with Google
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Register;
