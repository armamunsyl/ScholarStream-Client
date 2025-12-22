import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import secureApi from '../../utils/secureApi';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const StudentReviews = () => {
    const { role, authUser } = useOutletContext();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingReview, setEditingReview] = useState(null);
    const [formData, setFormData] = useState({ comment: '', rating: 0 });
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        if (role !== 'student' || !authUser?.email) {
            setReviews([]);
            setLoading(false);
            return;
        }
        let isMounted = true;

        const loadReviews = async () => {
            try {
                setLoading(true);
                const { data } = await secureApi.get('/reviews');
                if (!isMounted) return;
                const list = Array.isArray(data) ? data : [];
                const mine = list.filter((item) => item.userEmail?.toLowerCase() === authUser.email.toLowerCase());
                setReviews(mine);
            } catch (error) {
                if (isMounted) {
                    toast.error(error?.response?.data?.message || 'Failed to load reviews.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadReviews();
        return () => {
            isMounted = false;
        };
    }, [role, authUser?.email]);

    const handleDelete = async (reviewId) => {
        if (!reviewId) return;
        try {
            setDeletingId(reviewId);
            await secureApi.delete(`/reviews/${reviewId}`);
            setReviews((prev) => prev.filter((review) => review._id !== reviewId));
            toast.success('Review deleted.');
            setDeleteTarget(null);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete review.');
        } finally {
            setDeletingId('');
        }
    };

    const handleUpdate = async () => {
        if (!editingReview?._id) return;
        try {
            setSaving(true);
            await secureApi.patch(`/reviews/${editingReview._id}`, {
                comment: formData.comment,
                rating: formData.rating,
            });
            setReviews((prev) =>
                prev.map((review) =>
                    review._id === editingReview._id ? { ...review, comment: formData.comment, rating: formData.rating } : review
                )
            );
            toast.success('Review updated.');
            setEditingReview(null);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update review.');
        } finally {
            setSaving(false);
        }
    };

    if (role !== 'student') {
        return <p className="text-sm text-slate-500">Only students can manage their reviews.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">My Reviews</h1>
                <p className="text-sm text-slate-500">Keep an eye on the feedback you shared.</p>
            </header>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                {loading ? (
                    <LoadingSkeleton variant="table" />
                ) : reviews.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">You have not submitted any reviews yet.</div>
                ) : (
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Scholarship</th>
                                <th className="px-4 py-3">University</th>
                                <th className="px-4 py-3">Rating</th>
                                <th className="px-4 py-3">Comment</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review._id} className="border-t border-slate-100 text-slate-600">
                                    <td className="px-4 py-4 font-semibold text-slate-900">{review.scholarshipName || 'Scholarship'}</td>
                                    <td className="px-4 py-4">{review.universityName || 'University'}</td>
                                    <td className="px-4 py-4">{'⭐'.repeat(Number(review.rating) || 0)}</td>
                                    <td className="px-4 py-4">{review.comment}</td>
                                    <td className="px-4 py-4">
                                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-3 text-xs font-semibold">
                                            <button
                                                className="text-[#1B3C73]"
                                                onClick={() => {
                                                    setEditingReview(review);
                                                    setFormData({
                                                        comment: review.comment || '',
                                                        rating: Number(review.rating) || 0,
                                                    });
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-500"
                                                onClick={() => setDeleteTarget(review)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {editingReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div>
                                <p className="text-sm font-semibold text-slate-500">Edit Review</p>
                                <h3 className="text-lg font-semibold text-slate-900">{editingReview.scholarshipName || 'Scholarship'}</h3>
                            </div>
                            <button
                                type="button"
                                className="text-slate-500"
                                onClick={() => setEditingReview(null)}
                                disabled={saving}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mt-4 space-y-4 text-sm text-slate-600">
                            <label className="block">
                                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rating</span>
                                <select
                                    value={formData.rating}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, rating: Number(event.target.value) }))}
                                    className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 focus:border-[#1B3C73] focus:outline-none"
                                >
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1} Star{index === 0 ? '' : 's'}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="block">
                                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Comment</span>
                                <textarea
                                    value={formData.comment}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, comment: event.target.value }))}
                                    className="mt-1 min-h-[100px] w-full rounded-2xl border border-slate-200 px-3 py-2 focus:border-[#1B3C73] focus:outline-none"
                                />
                            </label>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
                                onClick={() => setEditingReview(null)}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-full bg-[#1B3C73] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                                onClick={handleUpdate}
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-lg font-semibold text-slate-900">Delete Review</h3>
                            <button
                                type="button"
                                className="text-slate-500"
                                onClick={() => setDeleteTarget(null)}
                                disabled={Boolean(deletingId)}
                            >
                                ✕
                            </button>
                        </div>
                        <p className="mt-4 text-sm text-slate-600">
                            Are you sure you want to remove your review for{' '}
                            <span className="font-semibold text-slate-900">{deleteTarget.scholarshipName || 'Scholarship'}</span>?
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
                                onClick={() => setDeleteTarget(null)}
                                disabled={Boolean(deletingId)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
                                onClick={() => handleDelete(deleteTarget._id)}
                                disabled={Boolean(deletingId)}
                            >
                                {deletingId ? 'Deleting...' : 'Delete Review'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default StudentReviews;
