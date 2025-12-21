import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { apiClient } from '../../utils/userApi';
import { toast } from 'react-toastify';

const ManageScholarships = () => {
    const { role } = useOutletContext();
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editTarget, setEditTarget] = useState(null);
    const [formData, setFormData] = useState({});
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState('');
    const [confirmTarget, setConfirmTarget] = useState(null);

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

    const handleUpdate = async () => {
        if (!editTarget?._id && !editTarget?.id) return;
        const targetId = (editTarget._id || editTarget.id || '').toString();
        try {
            setSaving(true);
            await apiClient.patch(`/scholarships/${targetId}`, formData);
            setScholarships((prev) =>
                prev.map((item) =>
                    ((item._id || item.id || '').toString()) === targetId ? { ...item, ...formData } : item
                )
            );
            toast.success(`${formData.scholarshipName || editTarget.scholarshipName} updated successfully.`);
            setEditTarget(null);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update scholarship.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirmTarget) return;
        const id = (confirmTarget._id || confirmTarget.id || '').toString();
        if (!id) {
            setConfirmTarget(null);
            return;
        }
        setDeletingId(id);
        try {
            await apiClient.delete(`/scholarships/${id}`);
            setScholarships((prev) =>
                prev.filter((item) => ((item._id || item.id || '').toString()) !== id)
            );
            toast.success(`${confirmTarget.scholarshipName} at ${confirmTarget.universityName} deleted.`);
            setConfirmTarget(null);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete scholarship.');
        } finally {
            setDeletingId('');
        }
    };

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
                                            <button
                                                className="text-[#1B3C73]"
                                                onClick={() => {
                                                    setEditTarget(item);
                                                    setFormData({
                                                        scholarshipName: item.scholarshipName || '',
                                                        universityName: item.universityName || '',
                                                        scholarshipCategory: item.scholarshipCategory || '',
                                                        country: item.country || '',
                                                        tuitionFees: item.tuitionFees || '',
                                                        status: item.status || '',
                                                    });
                                                }}
                                            >
                                                Update
                                            </button>
                                            <button
                                                type="button"
                                                className="text-red-500"
                                                disabled={deletingId === (item._id || item.id || '').toString()}
                                                onClick={() => setConfirmTarget(item)}
                                            >
                                                {deletingId === (item._id || item.id || '').toString() ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {editTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <h3 className="text-lg font-semibold text-slate-900">Update Scholarship</h3>
                            <button
                                type="button"
                                className="text-sm font-semibold text-slate-500"
                                onClick={() => setEditTarget(null)}
                                disabled={saving}
                            >
                                Close
                            </button>
                        </div>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <label className="text-sm text-slate-600">
                                Scholarship Name
                                <input
                                    type="text"
                                    className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                                    value={formData.scholarshipName}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, scholarshipName: event.target.value }))}
                                />
                            </label>
                            <label className="text-sm text-slate-600">
                                University Name
                                <input
                                    type="text"
                                    className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                                    value={formData.universityName}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, universityName: event.target.value }))}
                                />
                            </label>
                            <label className="text-sm text-slate-600">
                                Category
                                <input
                                    type="text"
                                    className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                                    value={formData.scholarshipCategory}
                                    onChange={(event) =>
                                        setFormData((prev) => ({ ...prev, scholarshipCategory: event.target.value }))
                                    }
                                />
                            </label>
                            <label className="text-sm text-slate-600">
                                Country
                                <input
                                    type="text"
                                    className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                                    value={formData.country}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, country: event.target.value }))}
                                />
                            </label>
                            <label className="text-sm text-slate-600">
                                Tuition Fees
                                <input
                                    type="number"
                                    className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                                    value={formData.tuitionFees}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, tuitionFees: event.target.value }))}
                                />
                            </label>
                            <label className="text-sm text-slate-600">
                                Status
                                <select
                                    className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 capitalize text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                                    value={formData.status}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, status: event.target.value }))}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </label>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600"
                                onClick={() => setEditTarget(null)}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-full bg-[#1B3C73] px-5 py-2 text-sm font-semibold text-white disabled:opacity-70"
                                onClick={handleUpdate}
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {confirmTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
                        <h4 className="text-lg font-semibold text-slate-900">Delete Scholarship</h4>
                        <p className="mt-2 text-sm text-slate-600">
                            Are you sure you want to remove{' '}
                            <span className="font-semibold text-slate-900">{confirmTarget.scholarshipName}</span> at{' '}
                            {confirmTarget.universityName}?
                        </p>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                type="button"
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
                                onClick={() => setConfirmTarget(null)}
                                disabled={Boolean(deletingId)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
                                onClick={handleDelete}
                                disabled={Boolean(deletingId)}
                            >
                                {deletingId ? 'Deleting...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ManageScholarships;
