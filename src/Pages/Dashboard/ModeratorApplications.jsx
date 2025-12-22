import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import secureApi from '../../utils/secureApi';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const ModeratorApplications = () => {
    const { role } = useOutletContext();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeApplication, setActiveApplication] = useState(null);

    useEffect(() => {
        if (role !== 'moderator') {
            setApplications([]);
            setLoading(false);
            return;
        }
        let isMounted = true;

        const loadApplications = async () => {
            try {
                setLoading(true);
                const { data } = await secureApi.get('/applications');
                if (!isMounted) return;
                const list = Array.isArray(data) ? data : [];
                const pending = list.filter((app) => (app.status || 'pending').toLowerCase() !== 'approved');
                setApplications(pending);
            } catch (error) {
                if (isMounted) {
                    toast.error(error?.response?.data?.message || 'Failed to fetch applications.');
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
    }, [role]);

    const updateStatus = async (applicationId, status) => {
        try {
            await secureApi.patch(`/applications/${applicationId}`, { status });
            toast.success(`Application ${status}.`);
            setApplications((prev) =>
                prev
                    .map((app) => (app._id === applicationId ? { ...app, status } : app))
                    .filter((app) => (app.status || 'pending').toLowerCase() !== 'approved')
            );
            if (activeApplication?._id === applicationId || activeApplication?.id === applicationId) {
                setActiveApplication(null);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update application.');
        }
    };

    const deleteApplication = async (applicationId) => {
        try {
            await secureApi.delete(`/applications/${applicationId}`);
            toast.success('Application rejected.');
            setApplications((prev) => prev.filter((app) => app._id !== applicationId));
            if (activeApplication?._id === applicationId) {
                setActiveApplication(null);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete application.');
        }
    };

    if (role !== 'moderator') {
        return <p className="text-sm text-slate-500">Only moderators review applications here.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Manage Applied Applications</h1>
                <p className="text-sm text-slate-500">Review, leave feedback, or update statuses.</p>
            </header>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                {loading ? (
                    <LoadingSkeleton variant="table" />
                ) : applications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">No applications waiting for review.</div>
                ) : (
                    <table className="min-w-full text-left text-xs sm:text-sm">
                        <thead className="bg-slate-50 uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Applicant</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">University</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Payment</th>
                                <th className="px-4 py-3">Applied At</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((item) => (
                                <tr key={item._id || item.id} className="border-t border-slate-100 text-slate-600">
                                    <td className="px-4 py-4 font-semibold text-slate-900">{item.studentName}</td>
                                    <td className="px-4 py-4">{item.studentEmail}</td>
                                    <td className="px-4 py-4">{item.universityName}</td>
                                    <td className="px-4 py-4 capitalize">{item.status || 'pending'}</td>
                                    <td className="px-4 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                (item.payment || '').toLowerCase() === 'paid'
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'bg-red-50 text-red-500'
                                            }`}
                                        >
                                            {item.payment || 'unpaid'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-wrap justify-end gap-2 text-xs font-semibold">
                                            <button
                                                className="rounded-full border border-slate-200 px-3 py-1 text-[#1B3C73]"
                                                onClick={() => setActiveApplication(item)}
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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
                                <span>Applicant</span>
                                <span className="font-semibold text-slate-900">{activeApplication.studentName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Email</span>
                                <span className="font-semibold text-slate-900">{activeApplication.studentEmail}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Scholarship</span>
                                <span className="font-semibold text-slate-900">{activeApplication.scholarshipName || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>University</span>
                                <span className="font-semibold text-slate-900">{activeApplication.universityName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Applied Date</span>
                                <span className="font-semibold text-slate-900">
                                    {activeApplication.createdAt ? new Date(activeApplication.createdAt).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Payment</span>
                                <span className="font-semibold capitalize text-slate-900">{activeApplication.payment || 'unpaid'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className="font-semibold capitalize text-slate-900">{activeApplication.status || 'pending'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Fees</span>
                                <span className="font-semibold text-slate-900">
                                    {Number.isNaN(Number(activeApplication.applicationFees))
                                        ? '—'
                                        : `$${Number(activeApplication.applicationFees)}`}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
                            <button
                                type="button"
                                className="rounded-full border border-emerald-200 px-4 py-1.5 text-xs font-semibold text-emerald-600"
                                onClick={() => updateStatus(activeApplication._id || activeApplication.id, 'approved')}
                            >
                                Approve
                            </button>
                            <button
                                type="button"
                                className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-500"
                                onClick={() => deleteApplication(activeApplication._id || activeApplication.id)}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ModeratorApplications;
