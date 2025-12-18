import { useOutletContext } from 'react-router-dom';

const Analytics = () => {
    const { role } = useOutletContext();

    if (role !== 'admin') {
        return <p className="text-sm text-slate-500">Analytics are available to admins only.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Analytics & Statistics</h1>
                <p className="text-sm text-slate-500">A quick breakdown of the platform&apos;s performance.</p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 p-5">
                    <h2 className="text-lg font-semibold text-slate-900">Totals</h2>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li className="flex items-center justify-between">
                            <span>Total Users</span>
                            <span className="font-semibold">842</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span>Total Scholarships</span>
                            <span className="font-semibold">38</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span>Fees Collected</span>
                            <span className="font-semibold">$24,120</span>
                        </li>
                    </ul>
                </div>
                <div className="rounded-2xl border border-slate-100 p-5">
                    <h2 className="text-lg font-semibold text-slate-900">Application Breakdown</h2>
                    <div className="mt-4 h-36 rounded-2xl bg-gradient-to-r from-[#F58A4B] to-[#F2D5C4] text-center text-white">
                        <div className="flex h-full flex-col items-center justify-center">
                            <p className="text-sm uppercase tracking-[0.3em]">Applications</p>
                            <p className="text-3xl font-semibold">65% STEM / 35% Arts</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-100 p-6">
                <h2 className="text-lg font-semibold text-slate-900">Insights</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                    <li>Scholarships with service charge below $100 convert 2.4x better.</li>
                    <li>Moderator response time directly improves completion rate.</li>
                    <li>Consider recruiting one more moderator for Americas timezone.</li>
                </ul>
            </div>
        </section>
    );
};

export default Analytics;
