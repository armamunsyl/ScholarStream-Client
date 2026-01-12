import StaticPageShell from '../components/StaticPageShell';

const PrivacyTerms = () => {
    return (
        <StaticPageShell
            sectionId="privacy-terms"
            title="Privacy & Terms"
            subtitle="A quick overview of how we protect your data and keep the platform safe."
        >
            <div className="space-y-6">
                {[
                    {
                        title: 'Privacy Policy',
                        body: 'We collect only the information needed to deliver scholarship services and never sell user data.',
                    },
                    {
                        title: 'Data Security',
                        body: 'Sensitive data is protected with secure authentication and encrypted connections.',
                    },
                    {
                        title: 'Terms of Use',
                        body: 'By using ScholarStream you agree to provide accurate details and follow application guidelines.',
                    },
                    {
                        title: 'Updates',
                        body: 'Policies may evolve as the platform grows. We will notify users of significant changes.',
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

export default PrivacyTerms;
