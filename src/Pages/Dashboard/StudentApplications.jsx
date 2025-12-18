import { useOutletContext } from 'react-router-dom';

const rows = [
    {
        id: 1,
        scholarship: 'Global STEM Fellows',
        university: 'MIT',
        status: 'pending',
        fees: '$85',
        appliedAt: '03/12/2025',
    },
    {
        id: 2,
        scholarship: 'Creative Arts Talent',
        university: 'Parsons',
        status: 'completed',
        fees: '$45',
        appliedAt: '01/05/2025',
    },
];

const statusClass = {
    pending: 'bg-amber-50 text-amber-700',
    completed: 'bg-emerald-50 text-emerald-700',
    rejected: 'bg-red-50 text-red-600',
};

const StudentApplications = () => {
    const { role } = useOutletContext();

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
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-4 py-3">University</th>
                            <th className="px-4 py-3">Scholarship</th>
                            <th className="px-4 py-3">Fees</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Applied At</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} className="border-t border-slate-100 text-slate-600">
                                <td className="px-4 py-4 font-semibold text-slate-900">{row.university}</td>
                                <td className="px-4 py-4">{row.scholarship}</td>
                                <td className="px-4 py-4">{row.fees}</td>
                                <td className="px-4 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[row.status]}`}
                                    >
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4">{row.appliedAt}</td>
                                <td className="px-4 py-4">
                                    <div className="flex justify-end gap-2 text-xs font-semibold">
                                        <button className="text-[#1B3C73]">Details</button>
                                        {row.status === 'pending' && <button className="text-amber-600">Edit</button>}
                                        {row.status === 'pending' && <button className="text-emerald-600">Pay</button>}
                                        {row.status === 'pending' && <button className="text-red-500">Delete</button>}
                                        {row.status === 'completed' && <button className="text-[#F58A4B]">Add Review</button>}
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

export default StudentApplications;
