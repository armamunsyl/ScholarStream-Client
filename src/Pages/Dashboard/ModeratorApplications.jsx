import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from '../../utils/userApi';

const ModeratorApplications = () => {
    const { role } = useOutletContext();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

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
                const { data } = await apiClient.get('/applications');
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
            await apiClient.patch(`/applications/${applicationId}`, { status });
            toast.success(`Application ${status}.`);
            setApplications((prev) =>
                prev
                    .map((app) => (app._id === applicationId ? { ...app, status } : app))
                    .filter((app) => (app.status || 'pending').toLowerCase() !== 'approved')
            );
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update application.');
        }
    };

    const deleteApplication = async (applicationId) => {
        try {
            await apiClient.delete(`/applications/${applicationId}`);
            toast.success('Application rejected.');
            setApplications((prev) => prev.filter((app) => app._id !== applicationId));
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
                    <div className="flex min-h-[200px] items-center justify-center text-sm text-slate-500">
                        Loading applications...
                    </div>
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
                                    <td className="px-4 py-4 capitalize">{item.payment || 'unpaid'}</td>
                                    <td className="px-4 py-4">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-wrap justify-end gap-2 text-xs font-semibold">
                                            <button className="rounded-full border border-slate-200 px-3 py-1 text-[#1B3C73]">Details</button>
                                            <button
                                                className="rounded-full border border-emerald-200 px-3 py-1 text-emerald-600"
                                                onClick={() => updateStatus(item._id || item.id, 'approved')}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="rounded-full border border-red-200 px-3 py-1 text-red-500"
                                                onClick={() => deleteApplication(item._id || item.id)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
    );
};

export default ModeratorApplications;
