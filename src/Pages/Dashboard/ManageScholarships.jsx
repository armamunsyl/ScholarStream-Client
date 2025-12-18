import { useOutletContext } from 'react-router-dom';

const scholarships = [
    { id: 1, name: 'Global Leaders', university: 'Cambridge', category: 'MBA', status: 'published' },
    { id: 2, name: 'Urban Innovators', university: 'NYU', category: 'Architecture', status: 'draft' },
];

const ManageScholarships = () => {
    const { role } = useOutletContext();

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
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Scholarship</th>
                            <th className="px-4 py-3">University</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.map((item) => (
                            <tr key={item.id} className="border-t border-slate-100 text-slate-600">
                                <td className="px-4 py-4 font-semibold text-slate-900">{item.name}</td>
                                <td className="px-4 py-4">{item.university}</td>
                                <td className="px-4 py-4">{item.category}</td>
                                <td className="px-4 py-4 capitalize">{item.status}</td>
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
            </div>
        </section>
    );
};

export default ManageScholarships;
