import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from '../../utils/userApi';

const Analytics = () => {
    const { role } = useOutletContext();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalScholarships: 0,
        approvedApplications: 0,
        monthlyApprovals: 0,
    });
    const [loading, setLoading] = useState(role === 'admin');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (role !== 'admin') {
            setLoading(false);
            return;
        }

        let isMounted = true;

        const loadAnalytics = async () => {
            try {
                setLoading(true);
                setErrorMsg('');

                const [usersRes, scholarshipsRes, applicationsRes] = await Promise.all([
                    apiClient.get('/users'),
                    apiClient.get('/scholarships'),
                    apiClient.get('/applications'),
                ]);

                if (!isMounted) return;

                const users = Array.isArray(usersRes.data) ? usersRes.data : [usersRes.data].filter(Boolean);
                const scholarships = Array.isArray(scholarshipsRes.data)
                    ? scholarshipsRes.data
                    : [scholarshipsRes.data].filter(Boolean);
                const applications = Array.isArray(applicationsRes.data)
                    ? applicationsRes.data
                    : [applicationsRes.data].filter(Boolean);

                const approved = applications.filter(
                    (app) => (app.status || '').toLowerCase() === 'approved'
                );
                const monthStart = new Date();
                monthStart.setDate(1);
                monthStart.setHours(0, 0, 0, 0);
                const monthlyApprovals = approved.filter((app) => {
                    const timestamp = new Date(app.updatedAt || app.createdAt);
                    return !Number.isNaN(timestamp) && timestamp >= monthStart;
                }).length;

                setStats({
                    totalUsers: users.length,
                    totalScholarships: scholarships.length,
                    approvedApplications: approved.length,
                    monthlyApprovals,
                });
            } catch (error) {
                const message = error?.response?.data?.message || 'Failed to load analytics.';
                if (isMounted) {
                    setErrorMsg(message);
                }
                toast.error(message);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadAnalytics();
        return () => {
            isMounted = false;
        };
    }, [role]);

    const pieData = useMemo(() => {
        const base = [
            { key: 'users', label: 'Users', value: stats.totalUsers, color: '#1B3C73' },
            { key: 'scholarships', label: 'Scholarships', value: stats.totalScholarships, color: '#F58A4B' },
            { key: 'approved', label: 'Approved', value: stats.approvedApplications, color: '#1A9273' },
            { key: 'monthly', label: 'New This Month', value: stats.monthlyApprovals, color: '#6F4FF2' },
        ];
        const total = base.reduce((sum, item) => sum + item.value, 0) || 1;
        let current = 0;
        const segments = base.map((item) => {
            const start = (current / total) * 100;
            current += item.value;
            const end = (current / total) * 100;
            return `${item.color} ${start}% ${end}%`;
        });
        const legend = base.map((item) => ({
            ...item,
            percent: Math.round((item.value / total) * 100),
        }));
        return {
            gradient: `conic-gradient(${segments.join(', ')})`,
            legend,
        };
    }, [stats]);

    if (role !== 'admin') {
        return <p className="text-sm text-slate-500">Analytics are available to admins only.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Analytics & Statistics</h1>
                <p className="text-sm text-slate-500">A quick breakdown of the platform&apos;s performance.</p>
            </header>

            {loading ? (
                <div className="rounded-2xl border border-slate-100 p-6 text-center text-sm text-slate-500">
                    Loading analytics...
                </div>
            ) : (
                <>
                    {errorMsg && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                            {errorMsg}
                        </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-100 p-5">
                            <h2 className="text-lg font-semibold text-slate-900">Totals</h2>
                            <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                <li className="flex items-center justify-between">
                                    <span>Total Users</span>
                                    <span className="font-semibold">{stats.totalUsers.toLocaleString()}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Total Scholarships</span>
                                    <span className="font-semibold">{stats.totalScholarships.toLocaleString()}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Total Approved</span>
                                    <span className="font-semibold">{stats.approvedApplications.toLocaleString()}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-slate-100 p-5">
                            <h2 className="text-lg font-semibold text-slate-900">Engagement Breakdown</h2>
                            <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
                                <div className="relative h-44 w-44 flex-shrink-0">
                                    <div className="h-full w-full rounded-full" style={{ background: pieData.gradient }}></div>
                                    <div className="absolute inset-6 flex flex-col items-center justify-center rounded-full bg-white text-center">
                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Month</p>
                                        <p className="text-2xl font-semibold text-slate-900">{stats.monthlyApprovals}</p>
                                        <span className="text-xs text-slate-500">new approvals</span>
                                    </div>
                                </div>
                                <ul className="flex-1 space-y-3 text-sm text-slate-600">
                                    {pieData.legend.map((item) => (
                                        <li key={item.key} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                                <span>{item.label}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-slate-900">{item.value.toLocaleString()}</p>
                                                <p className="text-xs text-slate-500">{item.percent}%</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 p-6">
                        <h2 className="text-lg font-semibold text-slate-900">Insights</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                            <li>Scholarships with service charge below $100 convert 2.4x better.</li>
                            <li>{stats.approvedApplications.toLocaleString()} applications reached the approved state so far.</li>
                            <li>{stats.monthlyApprovals.toLocaleString()} of them were completed during the last reporting month.</li>
                        </ul>
                    </div>
                </>
            )}
        </section>
    );
};

export default Analytics;
