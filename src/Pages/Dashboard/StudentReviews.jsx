import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from '../../utils/userApi';

const StudentReviews = () => {
    const { role, authUser } = useOutletContext();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

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
                const { data } = await apiClient.get('/reviews');
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
                    <div className="flex min-h-[200px] items-center justify-center text-sm text-slate-500">
                        Loading reviews...
                    </div>
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
                                            <button className="text-[#1B3C73]">Edit</button>
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

export default StudentReviews;
