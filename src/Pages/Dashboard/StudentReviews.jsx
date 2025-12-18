import { useOutletContext } from 'react-router-dom';

const reviews = [
    {
        id: 1,
        scholarship: 'Future Leaders',
        university: 'Oxford',
        rating: 5,
        comment: 'Organized timeline and great mentorship.',
        date: '05/14/2025',
    },
];

const StudentReviews = () => {
    const { role } = useOutletContext();

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
                            <tr key={review.id} className="border-t border-slate-100 text-slate-600">
                                <td className="px-4 py-4 font-semibold text-slate-900">{review.scholarship}</td>
                                <td className="px-4 py-4">{review.university}</td>
                                <td className="px-4 py-4">{'⭐'.repeat(review.rating)}</td>
                                <td className="px-4 py-4">{review.comment}</td>
                                <td className="px-4 py-4">{review.date}</td>
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
            </div>
        </section>
    );
};

export default StudentReviews;
