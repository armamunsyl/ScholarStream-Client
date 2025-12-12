const Hero = () => {
    return (
        <section className="bg-gradient-to-b from-[#14356A] via-[#1B3C73] to-[#23467C] text-white">
            <div className="max-w-7xl mx-auto flex flex-col gap-10 px-4 py-14 sm:py-20 md:py-28 lg:flex-row lg:items-center lg:gap-16">
                <div className="flex-1">
                    <p className="font-semibold uppercase tracking-[0.3em] text-sm text-slate-200">
                        Scholarships made simple
                    </p>
                    <h1 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                        Find the Right Scholarship for Your Future
                    </h1>
                    <p className="mt-5 text-sm text-slate-100 sm:text-xl lg:max-w-xl">
                        Discover opportunities, apply with confidence, track your progress— all in one place.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <label className="flex h-14 w-full items-center rounded-full border border-white/25 bg-white/15 px-4 shadow-lg shadow-black/20 backdrop-blur-sm transition focus-within:border-white/40 focus-within:bg-white/20 sm:w-auto sm:min-w-[260px] sm:px-6">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 text-white"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search for scholarships."
                                className="ml-4 flex-1 bg-transparent text-sm text-white placeholder:text-white/80 outline-none sm:text-base"
                            />
                        </label>
                        <button
                            type="button"
                            className="h-14 w-full rounded-full bg-[#16632F] px-6 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-[#135029] sm:w-auto sm:min-w-[260px] sm:text-base"
                        >
                            Browse Scholarships
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="relative mx-auto aspect-square max-w-[180px] sm:max-w-sm">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent" />
                        <div className="absolute inset-4 rounded-full border border-white/20" />
                        <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white/40 shadow-2xl shadow-black/30">
                            <img
                                src="/hero.png"
                                alt="Students smiling together"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
