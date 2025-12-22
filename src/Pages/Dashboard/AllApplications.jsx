import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from '../../utils/userApi';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const AllApplications = () => {
    const { role } = useOutletContext();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeApplication, setActiveApplication] = useState(null);

    useEffect(() => {
        if (role === 'student') {
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
                const approved = list.filter((item) => (item.status || 'pending').toLowerCase() === 'approved');
                setApplications(approved);
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

    if (role === 'student') {
        return <p className="text-sm text-slate-500">Only moderators and admins can view all applications.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">All Applications</h1>
                <p className="text-sm text-slate-500">Platform-wide visibility across every submission.</p>
            </header>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                {loading ? (
                    <LoadingSkeleton variant="table" />
                ) : applications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">No approved applications yet.</div>
                ) : (
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Applicant</th>
                                <th className="px-4 py-3">Scholarship</th>
                                <th className="px-4 py-3">University</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((row) => (
                                <tr key={row._id || row.id} className="border-t border-slate-100 text-slate-600">
                                    <td className="px-4 py-4 font-semibold text-slate-900">{row.studentName}</td>
                                    <td className="px-4 py-4">{row.scholarshipName || 'Scholarship'}</td>
                                    <td className="px-4 py-4">{row.universityName || 'University'}</td>
                                    <td className="px-4 py-4 capitalize">{row.status}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-3 text-xs font-semibold">
                                            <button
                                                className="text-[#1B3C73]"
                                                onClick={() => setActiveApplication(row)}
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
                                <span className="font-semibold text-slate-900">{activeApplication.scholarshipName || 'Scholarship'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>University</span>
                                <span className="font-semibold text-slate-900">{activeApplication.universityName || 'University'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className="font-semibold capitalize text-slate-900">{activeApplication.status || 'pending'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Payment</span>
                                <span className="font-semibold capitalize text-slate-900">{activeApplication.payment || 'unpaid'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Applied Date</span>
                                <span className="font-semibold text-slate-900">
                                    {activeApplication.createdAt ? new Date(activeApplication.createdAt).toLocaleDateString() : 'N/A'}
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
                        </div>
                        <div className="flex justify-end border-t border-slate-100 px-6 py-4">
                            <button
                                type="button"
                                className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600"
                                onClick={() => setActiveApplication(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AllApplications;
