import StaticPageShell from '../components/StaticPageShell';

const About = () => {
    return (
        <StaticPageShell
            sectionId="about"
            title="About ScholarStream"
            subtitle="We help students discover scholarships faster with a clean, guided application experience."
        >
            <div className="grid gap-6 md:grid-cols-2">
                {[
                    {
                        title: 'Our Mission',
                        body: 'Make scholarship discovery transparent, accessible, and inspiring for every student.',
                    },
                    {
                        title: 'What We Offer',
                        body: 'Curated scholarships, smart filters, guided applications, and trusted reviews.',
                    },
                    {
                        title: 'Community First',
                        body: 'We celebrate success stories and keep student feedback at the center.',
                    },
                    {
                        title: 'Trusted Partners',
                        body: 'We collaborate with universities and organizations to keep listings fresh.',
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

export default About;
