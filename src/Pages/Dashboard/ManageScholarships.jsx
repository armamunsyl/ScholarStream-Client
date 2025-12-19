import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { apiClient } from '../../utils/userApi';
import { toast } from 'react-toastify';

const ManageScholarships = () => {
    const { role } = useOutletContext();
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (role !== 'admin') return;
        let isMounted = true;
        const loadData = async () => {
            try {
                setLoading(true);
                const { data } = await apiClient.get('/scholarships');
                if (isMounted) {
                    setScholarships(data || []);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Failed to load scholarships.');
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        loadData();
        return () => {
            isMounted = false;
        };
    }, [role]);

    if (role !== 'admin') {
        return <p className="text-sm text-slate-500">Only admins can manage scholarships.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Manage Scholarships</h1>
                <p className="text-sm text-slate-500">Keep the catalog updated and accurate.</p>
            </header>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                {loading ? (
                    <div className="flex min-h-[200px] items-center justify-center text-sm text-slate-500">
                        Loading scholarships...
                    </div>
                ) : scholarships.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">No scholarships found.</div>
                ) : (
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Scholarship</th>
                                <th className="px-4 py-3">University</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Country</th>
                                <th className="px-4 py-3">Tuition Fees</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scholarships.map((item) => (
                                <tr key={item._id || item.id} className="border-t border-slate-100 text-slate-600">
                                    <td className="px-4 py-4 font-semibold text-slate-900">{item.scholarshipName}</td>
                                    <td className="px-4 py-4">{item.universityName}</td>
                                    <td className="px-4 py-4">{item.scholarshipCategory}</td>
                                    <td className="px-4 py-4">{item.country}</td>
                                    <td className="px-4 py-4">{item.tuitionFees}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-3 text-xs font-semibold">
                                            <button className="text-[#1B3C73]">Update</button>
                                            <button className="text-red-500">Delete</button>
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

export default ManageScholarships;
