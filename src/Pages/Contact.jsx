import StaticPageShell from '../components/StaticPageShell';

const Contact = () => {
    return (
        <StaticPageShell
            sectionId="contact"
            title="Contact Us"
            subtitle="Reach out to the ScholarStream team for partnerships, support, or feedback."
        >
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Support</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Email us anytime for account or application help.
                    </p>
                    <a
                        href="mailto:support@scholarstream.com"
                        className="mt-4 inline-flex rounded-full bg-[#1B3C73] px-4 py-2 text-sm font-semibold text-white"
                    >
                        support@scholarstream.com
                    </a>
                </div>
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Partnerships</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Interested in listing scholarships or collaborating with us?
                    </p>
                    <a
                        href="mailto:partners@scholarstream.com"
                        className="mt-4 inline-flex rounded-full bg-[#234DCC] px-4 py-2 text-sm font-semibold text-white"
                    >
                        partners@scholarstream.com
                    </a>
                </div>
            </div>
        </StaticPageShell>
    );
};

export default Contact;
