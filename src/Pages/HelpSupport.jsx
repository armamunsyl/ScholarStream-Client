import StaticPageShell from '../components/StaticPageShell';

const HelpSupport = () => {
    return (
        <StaticPageShell
            sectionId="help-support"
            title="Help & Support"
            subtitle="Find quick answers or reach out to the ScholarStream support team."
        >
            <div className="grid gap-6 md:grid-cols-2">
                {[
                    {
                        title: 'Help Center',
                        body: 'Browse FAQs, application guidance, and payment questions.',
                    },
                    {
                        title: 'Support Hours',
                        body: 'Saturday–Thursday, 9:00 AM to 7:00 PM (GMT+6).',
                    },
                    {
                        title: 'Report an Issue',
                        body: 'Let us know about any bugs or listing problems.',
                    },
                    {
                        title: 'Safety Tips',
                        body: 'Learn how we verify listings and protect your data.',
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]"
                    >
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
                    </div>
                ))}
            </div>
        </StaticPageShell>
    );
};

export default HelpSupport;
