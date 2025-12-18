import { useOutletContext } from 'react-router-dom';

const applications = [
    {
        id: 1,
        name: 'Anika Rahman',
        email: 'anika@student.com',
        university: 'Toronto',
        feedback: 'Need updated I-20 form',
        status: 'processing',
        payment: 'paid',
    },
    {
        id: 2,
        name: 'Kevin Grant',
        email: 'kevin@student.com',
        university: 'TU Munich',
        feedback: '—',
        status: 'pending',
        payment: 'unpaid',
    },
];

const ModeratorApplications = () => {
    const { role } = useOutletContext();

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
                <table className="min-w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Applicant</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">University</th>
                            <th className="px-4 py-3">Feedback</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Payment</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((item) => (
                            <tr key={item.id} className="border-t border-slate-100 text-slate-600">
                                <td className="px-4 py-4 font-semibold text-slate-900">{item.name}</td>
                                <td className="px-4 py-4">{item.email}</td>
                                <td className="px-4 py-4">{item.university}</td>
                                <td className="px-4 py-4">{item.feedback}</td>
                                <td className="px-4 py-4 capitalize">{item.status}</td>
                                <td className="px-4 py-4 capitalize">{item.payment}</td>
                                <td className="px-4 py-4">
                                    <div className="flex justify-end gap-3 text-xs font-semibold">
                                        <button className="text-[#1B3C73]">Details</button>
                                        <button className="text-[#F58A4B]">Feedback</button>
                                        <button className="text-emerald-600">Update</button>
                                        <button className="text-red-500">Cancel</button>
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

export default ModeratorApplications;
