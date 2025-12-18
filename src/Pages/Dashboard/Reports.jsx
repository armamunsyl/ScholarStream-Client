import { useOutletContext } from 'react-router-dom';

const reportCards = [
    { label: 'Processing Average', value: '3.1 days', accent: 'bg-[#E9F8F3] text-emerald-700' },
    { label: 'Completion Rate', value: '82%', accent: 'bg-[#FFF8E6] text-amber-700' },
    { label: 'Rejected this week', value: '4', accent: 'bg-[#FDEDE4] text-[#E86A33]' },
];

const Reports = () => {
    const { role } = useOutletContext();

    if (role !== 'moderator') {
        return <p className="text-sm text-slate-500">Reports can only be viewed by moderators.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Moderator Reports</h1>
                <p className="text-sm text-slate-500">Snapshot of how application reviews are moving.</p>
            </header>

            <div className="grid gap-4 sm:grid-cols-3">
                {reportCards.map((card) => (
                    <div key={card.label} className={`rounded-2xl px-4 py-5 text-sm font-semibold ${card.accent}`}>
                        <p className="text-slate-600">{card.label}</p>
                        <p className="mt-2 text-2xl">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-slate-100 p-6">
                <h2 className="text-lg font-semibold text-slate-900">Insights</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                    <li>Applicants who upload full transcripts are completed 30% faster.</li>
                    <li>Processing queue spikes on Mondays—consider staggering reviews.</li>
                    <li>Feedback templates reduce response time by 1.4 days.</li>
                </ul>
            </div>
        </section>
    );
};

export default Reports;
