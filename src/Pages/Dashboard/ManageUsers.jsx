import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { apiClient } from '../../utils/userApi';
import { toast } from 'react-toastify';

const ManageUsers = () => {
    const { role } = useOutletContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (role !== 'admin') return;
        let isMounted = true;

        const loadUsers = async () => {
            try {
                setLoading(true);
                const { data } = await apiClient.get('/users');
                if (isMounted) {
                    setUsers(Array.isArray(data) ? data : [data].filter(Boolean));
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Failed to fetch users.');
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadUsers();
        return () => {
            isMounted = false;
        };
    }, [role]);

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
                {loading ? (
                    <div className="flex min-h-[200px] items-center justify-center text-sm text-slate-500">
                        Loading users...
                    </div>
                ) : users.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">No users found.</div>
                ) : (
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
                                <tr key={user._id || user.id} className="border-t border-slate-100 text-slate-600">
                                    <td className="px-4 py-4 font-semibold text-slate-900">{user.name}</td>
                                    <td className="px-4 py-4">{user.email}</td>
                                    <td className="px-4 py-4">
                                        <span className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold capitalize text-slate-600">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                                            {user.role}
                                        </button>
                                        <button className="ml-4 text-xs font-semibold text-red-500">Delete</button>
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

export default ManageUsers;
