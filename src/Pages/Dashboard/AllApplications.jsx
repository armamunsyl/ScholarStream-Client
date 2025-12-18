import { useOutletContext } from 'react-router-dom';

const rows = [
    { id: 1, applicant: 'Maya Noor', scholarship: 'Future Leaders', role: 'student', status: 'processing' },
    { id: 2, applicant: 'Dylan Chen', scholarship: 'Urban Innovators', role: 'student', status: 'completed' },
];

const AllApplications = () => {
    const { role } = useOutletContext();

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
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Applicant</th>
                            <th className="px-4 py-3">Scholarship</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} className="border-t border-slate-100 text-slate-600">
                                <td className="px-4 py-4 font-semibold text-slate-900">{row.applicant}</td>
                                <td className="px-4 py-4">{row.scholarship}</td>
                                <td className="px-4 py-4 capitalize">{row.role}</td>
                                <td className="px-4 py-4 capitalize">{row.status}</td>
                                <td className="px-4 py-4">
                                    <div className="flex justify-end gap-3 text-xs font-semibold">
                                        <button className="text-[#1B3C73]">Details</button>
                                        <button className="text-emerald-600">Update</button>
                                        <button className="text-red-500">Reject</button>
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

export default AllApplications;
