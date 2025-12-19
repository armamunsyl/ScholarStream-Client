import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from '../../utils/userApi';

const AllApplications = () => {
    const { role } = useOutletContext();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <div className="flex min-h-[200px] items-center justify-center text-sm text-slate-500">
                        Loading applications...
                    </div>
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
                                            <button className="text-[#1B3C73]">Details</button>
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

export default AllApplications;
