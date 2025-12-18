import { useOutletContext } from 'react-router-dom';

const Profile = () => {
    const { profile, authUser, role } = useOutletContext();
    const info = [
        { label: 'Name', value: profile?.name || authUser?.displayName || 'N/A' },
        { label: 'Email', value: authUser?.email || profile?.email || 'N/A' },
        { label: 'Role', value: role },
        { label: 'Joined At', value: profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Today' },
    ];

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">My Profile</h1>
                <p className="text-sm text-slate-500">Update your personal information.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                {info.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-100 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{item.label}</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                    </div>
                ))}
            </div>
            <div className="rounded-2xl border border-slate-100 p-5">
                <h2 className="text-lg font-semibold text-slate-900">Security Tips</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                    <li>Use unique passwords for ScholarStream and your email.</li>
                    <li>Turn on device-based MFA inside your Google account.</li>
                    <li>Keep profile details up to date for moderator communication.</li>
                </ul>
            </div>
        </section>
    );
};

export default Profile;
