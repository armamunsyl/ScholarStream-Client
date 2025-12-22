import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import secureApi from '../../utils/secureApi';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const ManageUsers = () => {
    const { role } = useOutletContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingUserId, setUpdatingUserId] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [roleFilter, setRoleFilter] = useState('all');

    useEffect(() => {
        if (role !== 'admin') return;
        let isMounted = true;

        const loadUsers = async () => {
            try {
                setLoading(true);
                const { data } = await secureApi.get('/users');
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

    const filteredUsers = useMemo(() => {
        if (roleFilter === 'all') return users;
        const target = roleFilter.toLowerCase();
        return users.filter((user) => user.role?.toLowerCase() === target);
    }, [users, roleFilter]);

    if (role !== 'admin') {
        return <p className="text-sm text-slate-500">Only admins can manage users.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Manage Users</h1>
                <p className="text-sm text-slate-500">Promote, demote, or remove accounts.</p>
            </header>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3">
                <span className="text-sm font-medium text-slate-600">
                    Showing {filteredUsers.length} of {users.length} users
                </span>
                <select
                    value={roleFilter}
                    onChange={(event) => setRoleFilter(event.target.value)}
                    className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 outline-none focus:border-[#1B3C73]"
                >
                    <option value="all">All roles</option>
                    <option value="admin">Admins</option>
                    <option value="moderator">Moderators</option>
                    <option value="student">Students</option>
                </select>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                {loading ? (
                    <LoadingSkeleton variant="table" />
                ) : filteredUsers.length === 0 ? (
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
                            {filteredUsers.map((user) => (
                                <tr key={user._id || user.id} className="border-t border-slate-100 text-slate-600">
                                    <td className="px-4 py-4 font-semibold text-slate-900">{user.name}</td>
                                    <td className="px-4 py-4">{user.email}</td>
                                    <td className="px-4 py-4">
                                        <span className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold capitalize text-slate-600">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <select
                                            className="rounded-2xl border border-slate-200 px-3 py-1 text-xs font-semibold capitalize text-slate-600 focus:border-[#1B3C73] focus:outline-none"
                                            value={user.role}
                                            disabled={updatingUserId === (user._id || user.id)}
                                            onChange={async (event) => {
                                                const newRole = event.target.value;
                                                const userId = user._id || user.id;
                                                if (!userId || newRole === user.role) return;
                                                try {
                                                    setUpdatingUserId(userId);
                                                    await secureApi.patch(`/users/${userId}/role`, { role: newRole });
                                                    setUsers((prev) =>
                                                        prev.map((item) =>
                                                            (item._id || item.id) === userId ? { ...item, role: newRole } : item
                                                        )
                                                    );
                                                    toast.success(`${user.name || user.email} is now ${newRole}.`);
                                                } catch (error) {
                                                    toast.error(error?.response?.data?.message || 'Failed to update user role.');
                                                } finally {
                                                    setUpdatingUserId('');
                                                }
                                            }}
                                        >
                                            <option value="admin">admin</option>
                                            <option value="moderator">moderator</option>
                                            <option value="student">student</option>
                                        </select>
                                        <button
                                            className="ml-4 text-xs font-semibold text-red-500"
                                            onClick={() => setConfirmDelete(user)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-slate-900">Delete User</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Remove{' '}
                            <span className="font-semibold text-slate-900">
                                {confirmDelete.name || confirmDelete.email}
                            </span>
                            ?
                        </p>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                type="button"
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
                                onClick={() => setConfirmDelete(null)}
                                disabled={updatingUserId === (confirmDelete._id || confirmDelete.id)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                                disabled={updatingUserId === (confirmDelete._id || confirmDelete.id)}
                                onClick={async () => {
                                    const userId = confirmDelete._id || confirmDelete.id;
                                    if (!userId) return;
                                    try {
                                        setUpdatingUserId(userId);
                                        await secureApi.delete(`/users/${userId}`);
                                        setUsers((prev) => prev.filter((user) => (user._id || user.id) !== userId));
                                        toast.success(`${confirmDelete.name || confirmDelete.email} deleted.`);
                                        setConfirmDelete(null);
                                    } catch (error) {
                                        toast.error(error?.response?.data?.message || 'Failed to delete user.');
                                    } finally {
                                        setUpdatingUserId('');
                                    }
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ManageUsers;
