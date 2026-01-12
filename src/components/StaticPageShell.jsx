const StaticPageShell = ({ title, subtitle, sectionId, children }) => {
    return (
        <section id={sectionId} className="bg-[#F9F6F1] py-10 dark:bg-[#0b1120]">
            <div className="mx-auto max-w-5xl px-4">
                <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-black/5 dark:border-slate-800 dark:bg-[#0f172a]">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        ScholarStream
                    </p>
                    <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                            {subtitle}
                        </p>
                    )}
                    <div className="mt-8">{children}</div>
                </div>
            </div>
        </section>
    );
};

export default StaticPageShell;
