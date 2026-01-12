import StaticPageShell from '../components/StaticPageShell';

const Blog = () => {
    const posts = [
        {
            title: 'How to Choose the Right Scholarship',
            summary: 'A quick guide to narrowing options based on eligibility, deadlines, and impact.',
        },
        {
            title: 'Application Checklist for 2024',
            summary: 'Everything you should prepare before you hit submit.',
        },
        {
            title: 'Common Mistakes to Avoid',
            summary: 'Improve your chances with these practical tips.',
        },
    ];

    return (
        <StaticPageShell
            sectionId="blog"
            title="Blog"
            subtitle="Insights, tips, and guides to help you apply with confidence."
        >
            <div className="space-y-4">
                {posts.map((post) => (
                    <div
                        key={post.title}
                        className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]"
                    >
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{post.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.summary}</p>
                        <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-wide text-[#1B3C73] dark:text-sky-300">
                            Coming soon
                        </span>
                    </div>
                ))}
            </div>
        </StaticPageShell>
    );
};

export default Blog;
