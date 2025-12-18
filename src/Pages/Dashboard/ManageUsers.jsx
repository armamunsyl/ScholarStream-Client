import { useOutletContext } from 'react-router-dom';

const users = [
    { id: 1, name: 'Sara Malik', email: 'sara@scholar.com', role: 'student' },
    { id: 2, name: 'Owen Patel', email: 'owen@scholar.com', role: 'moderator' },
];

const roles = ['student', 'moderator', 'admin'];

const ManageUsers = () => {
    const { role } = useOutletContext();
    console.log(role)

    if (role !== 'admin') {
        return <p className="text-sm text-slate-500">Only admins can manage users.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Manage Users</h1>
                <p className="text-sm text-slate-500">Promote, demote, or remove accounts.</p>
            </header>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t border-slate-100 text-slate-600">
                                <td className="px-4 py-4 font-semibold text-slate-900">{user.name}</td>
                                <td className="px-4 py-4">{user.email}</td>
                                <td className="px-4 py-4 capitalize">{user.role}</td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-wrap justify-end gap-2 text-xs font-semibold">
                                        {roles.map((r) => (
                                            <button key={r} className={`rounded-full border px-3 py-1 ${r === user.role ? 'border-[#1B3C73] text-[#1B3C73]' : 'border-slate-200 text-slate-500'}`}>
                                                {r}
                                            </button>
                                        ))}
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

export default ManageUsers;
