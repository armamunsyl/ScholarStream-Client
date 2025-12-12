const Register = () => {
    return (
        <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#1B3C73] to-[#23467C] px-4 py-12">
            <div className="w-full max-w-sm">
                <div className="overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-black/20">
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
                        <form className="space-y-3">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600">Full Name</span>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1B3C73]"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600">Email</span>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1B3C73]"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600">Password</span>
                                <input
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1B3C73]"
                                />
                                <p className="mt-1 text-xs text-slate-400">Use at least 8 characters with numbers & symbols</p>
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600">Profile Image</span>
                                <div className="mt-1.5 flex w-full items-center gap-3 rounded-xl border border-dashed border-slate-200 px-4 py-2.5">
                                    <input
                                        type="file"
                                        className="w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-[#1B3C73] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                                    />
                                </div>
                            </label>
                            <button
                                type="submit"
                                className="w-full rounded-full bg-[#1B3C73] py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#16305b]"
                            >
                                Create Account
                            </button>
                        </form>
                        <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-slate-400">
                            <span className="h-px flex-1 bg-slate-200" />
                            <span>or</span>
                            <span className="h-px flex-1 bg-slate-200" />
                        </div>
                        <button
                            type="button"
                            className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                className="h-5 w-5"
                            />
                            Register with Google
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
