import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import secureApi from '../../utils/secureApi';
import LoadingSkeleton from '../../components/LoadingSkeleton';

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
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [reviewData, setReviewData] = useState({ rating: 0, comment: '' });
    const [submittingReview, setSubmittingReview] = useState(false);
    const [deleting, setDeleting] = useState(false);

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
                const { data } = await secureApi.get('/applications');
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

    const navigate = useNavigate();

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
                    <LoadingSkeleton variant="table" />
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
                                                <button
                                                    className="text-[#1B3C73]"
                                                    onClick={() => {
                                                        setActiveApplication(application);
                                                        setReviewData({ rating: 0, comment: '' });
                                                    }}
                                                >
                                                    Details
                                                </button>
                                                {application.status?.toLowerCase() === 'pending' && (
                                                    <button
                                                        className="text-red-500"
                                                        onClick={() => {
                                                            toast.info('You have Nothing to edit');
                                                            setConfirmDelete(application);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
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
                        {activeApplication.status?.toLowerCase() === 'approved' && (
                            <div className="border-t border-slate-100 px-6 py-4">
                                <h4 className="text-base font-semibold text-slate-900">Share your review</h4>
                                <form
                                    className="mt-3 space-y-3 text-sm text-slate-600"
                                    onSubmit={async (event) => {
                                        event.preventDefault();
                                        if (reviewData.rating === 0 || !reviewData.comment.trim()) {
                                            toast.info('Please provide both rating and comment.');
                                            return;
                                        }
                                        try {
                                            setSubmittingReview(true);
                                            await secureApi.post('/reviews', {
                                                userName: authUser?.displayName || authUser?.email || 'ScholarStream User',
                                                userEmail: authUser?.email || '',
                                                userPhotoURL: authUser?.photoURL || '',
                                                comment: reviewData.comment,
                                                rating: reviewData.rating,
                                                scholarshipId:
                                                    activeApplication.scholarshipId ||
                                                    activeApplication.dashboardScholarshipId ||
                                                    activeApplication.scholarship_id,
                                                scholarshipName: activeApplication.scholarshipName || 'Scholarship',
                                                universityName: activeApplication.universityName || 'University',
                                            });
                                            toast.success('Review submitted!');
                                            setReviewData({ rating: 0, comment: '' });
                                        } catch (error) {
                                            toast.error(error?.response?.data?.message || 'Failed to submit review.');
                                        } finally {
                                            setSubmittingReview(false);
                                        }
                                    }}
                                >
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rating</span>
                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: 5 }).map((_, index) => {
                                                const value = index + 1;
                                                const selected = reviewData.rating >= value;
                                                return (
                                                    <button
                                                        key={value}
                                                        type="button"
                                                        onClick={() => setReviewData((prev) => ({ ...prev, rating: value }))}
                                                        className={`h-8 w-8 rounded-full border text-sm font-semibold ${
                                                            selected ? 'border-[#F58A4B] bg-[#F58A4B] text-white' : 'border-slate-200 text-slate-500'
                                                        }`}
                                                    >
                                                        {value}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <label className="block text-sm font-semibold text-slate-600">
                                        Comment
                                        <textarea
                                            rows={3}
                                            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                                            value={reviewData.comment}
                                            onChange={(e) => setReviewData((prev) => ({ ...prev, comment: e.target.value }))}
                                            placeholder="Share your experience..."
                                        />
                                    </label>
                                    <button
                                        type="submit"
                                        className="w-full rounded-full bg-[#1B3C73] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                                        disabled={submittingReview}
                                    >
                                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </form>
                            </div>
                        )}
                        <div className="flex justify-between border-t border-slate-100 px-6 py-4">
                            <button
                                type="button"
                                className="text-sm font-semibold text-slate-500"
                                onClick={() => setActiveApplication(null)}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="rounded-full bg-[#1B3C73] px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-60"
                                disabled={activeApplication.payment === 'paid'}
                                onClick={() => {
                                    if (activeApplication.payment === 'paid') return;
                                    const payload = { ...activeApplication };
                                    setActiveApplication(null);
                                    navigate('/dashboard/make-payment', { state: { application: payload } });
                                }}
                            >
                                {activeApplication.payment === 'paid' ? 'Paid' : 'Pay Now'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-lg font-semibold text-slate-900">You have nothing to edit !</h3>
                            <button
                                type="button"
                                className="text-slate-500"
                                onClick={() => setConfirmDelete(null)}
                            >
                                ✕
                            </button>
                        </div>
                        <p className="mt-4 text-sm text-slate-600">
                            Do you want to delete your application for{' '}
                            <span className="font-semibold text-slate-900">{confirmDelete.universityName}</span>?
                        </p>
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
                                disabled={deleting}
                                onClick={async () => {
                                    if (!confirmDelete?._id && !confirmDelete?.id) return;
                                    try {
                                        setDeleting(true);
                                        const id = confirmDelete._id || confirmDelete.id;
                                        await secureApi.delete(`/applications/${id}`);
                                        setApplications((prev) =>
                                            prev.filter((item) => (item._id || item.id) !== id)
                                        );
                                        toast.success('Application deleted.');
                                        setConfirmDelete(null);
                                    } catch (error) {
                                        toast.error(error?.response?.data?.message || 'Failed to delete application.');
                                    } finally {
                                        setDeleting(false);
                                    }
                                }}
                            >
                                {deleting ? 'Deleting...' : 'Delete Application'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default StudentApplications;
