import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from '../../utils/userApi';

const statusClass = {
    pending: 'bg-amber-50 text-amber-700',
    completed: 'bg-emerald-50 text-emerald-700',
    rejected: 'bg-red-50 text-red-600',
};

const StudentApplications = () => {
    const { role, authUser } = useOutletContext();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeApplication, setActiveApplication] = useState(null);

    useEffect(() => {
        if (role !== 'student' || !authUser?.email) {
            setApplications([]);
            setLoading(false);
            return;
        }
        let isMounted = true;

        const loadApplications = async () => {
            try {
                setLoading(true);
                const { data } = await apiClient.get('/applications');
                if (!isMounted) return;
                const list = Array.isArray(data) ? data : [];
                const mine = list.filter((item) => item.studentEmail?.toLowerCase() === authUser.email.toLowerCase());
                setApplications(mine);
            } catch (error) {
                if (isMounted) {
                    toast.error(error?.response?.data?.message || 'Failed to load applications.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadApplications();
        return () => {
            isMounted = false;
        };
    }, [role, authUser?.email]);

    if (role !== 'student') {
        return (
            <p className="text-sm text-slate-500">
                This section is visible only to student accounts.
            </p>
        );
    }

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">My Applications</h1>
                <p className="text-sm text-slate-500">Track every scholarship you submitted.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                {loading ? (
                    <div className="flex min-h-[200px] items-center justify-center text-sm text-slate-500">
                        Loading applications...
                    </div>
                ) : applications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">You have not applied yet.</div>
                ) : (
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3">University</th>
                                <th className="px-4 py-3">Scholarship</th>
                                <th className="px-4 py-3">Fees</th>
                                <th className="px-4 py-3">Payment</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Applied At</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application) => {
                                const appliedDate = application.createdAt
                                    ? new Date(application.createdAt).toLocaleDateString()
                                    : 'N/A';
                                const statusKey = application.status?.toLowerCase?.() || 'pending';
                                const feeValue = Number(application.applicationFees ?? 0);
                                const feeDisplay = Number.isNaN(feeValue) || feeValue === 0 ? '—' : `$${feeValue}`;
                                        console.log(application)
                                return (
                                    <tr key={application._id} className="border-t border-slate-100 text-slate-600">
                                        <td className="px-4 py-4 font-semibold text-slate-900">{application.universityName}</td>
                                        <td className="px-4 py-4">{application.scholarshipName || 'N/A'}</td>
                                        <td className="px-4 py-4">{feeDisplay}</td>
                                        <td className="px-4 py-4 capitalize">{application.payment || 'unpaid'}</td>
                                        <td className="px-4 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[statusKey] || 'bg-slate-100 text-slate-600'}`}>
                                                {application.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">{appliedDate}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex justify-end gap-2 text-xs font-semibold">
                                                <button className="text-[#1B3C73]" onClick={() => setActiveApplication(application)}>Details</button>
                                                {application.status === 'pending' && <button className="text-emerald-600">Pay</button>}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            {activeApplication && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-lg rounded-3xl bg-white shadow-lg">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-500">Application Details</p>
                                <h3 className="text-lg font-semibold text-slate-900">{activeApplication.universityName}</h3>
                            </div>
                            <button
                                type="button"
                                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600"
                                onClick={() => setActiveApplication(null)}
                            >
                                Close
                            </button>
                        </div>
                        <div className="space-y-4 px-6 py-5 text-sm text-slate-600">
                            <div className="flex justify-between">
                                <span>Scholarship</span>
                                <span className="font-semibold text-slate-900">{activeApplication.scholarshipName || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>University Address</span>
                                <span className="text-right font-semibold text-slate-900">
                                    {activeApplication.universityAddress || [activeApplication.city, activeApplication.country].filter(Boolean).join(', ') || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Fees</span>
                                <span className="font-semibold text-slate-900">
                                    {Number.isNaN(Number(activeApplication.applicationFees))
                                        ? '—'
                                        : `$${Number(activeApplication.applicationFees)}`}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Applied Date</span>
                                <span className="font-semibold text-slate-900">
                                    {activeApplication.createdAt
                                        ? new Date(activeApplication.createdAt).toLocaleDateString()
                                        : 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className="font-semibold capitalize text-slate-900">{activeApplication.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Payment</span>
                                <span className="font-semibold capitalize text-slate-900">{activeApplication.payment}</span>
                            </div>
                        </div>
                        <div className="flex justify-between border-t border-slate-100 px-6 py-4">
                            <button
                                type="button"
                                className="text-sm font-semibold text-slate-500"
                                onClick={() => setActiveApplication(null)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-full bg-[#1B3C73] px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-60"
                                disabled={activeApplication.payment === 'paid'}
                            >
                                {activeApplication.payment === 'paid' ? 'Paid' : 'Pay Now'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default StudentApplications;
