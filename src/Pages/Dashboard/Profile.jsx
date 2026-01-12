import { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import secureApi from '../../utils/secureApi';
import { saveUser } from '../../utils/userApi';

const Profile = () => {
    const { profile, authUser, role, refreshProfile } = useOutletContext();
    const { updateUserProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: '', photoURL: '' });
    const [status, setStatus] = useState({ error: '', success: '' });
    const [saving, setSaving] = useState(false);
    const info = [
        { label: 'Name', value: profile?.name || authUser?.displayName || 'N/A' },
        { label: 'Email', value: authUser?.email || profile?.email || 'N/A' },
        { label: 'Role', value: role },
        { label: 'Joined At', value: profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Today' },
    ];

    useEffect(() => {
        setFormData({
            name: profile?.name || authUser?.displayName || '',
            photoURL: profile?.photoURL || authUser?.photoURL || '',
        });
    }, [profile?.name, profile?.photoURL, authUser?.displayName, authUser?.photoURL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ error: '', success: '' });

        const trimmedName = formData.name.trim();
        const trimmedPhoto = formData.photoURL.trim();
        const currentName = profile?.name || authUser?.displayName || '';
        const currentPhoto = profile?.photoURL || authUser?.photoURL || '';
        const payload = {};

        if (trimmedName && trimmedName !== currentName) {
            payload.name = trimmedName;
        }
        if (trimmedPhoto && trimmedPhoto !== currentPhoto) {
            payload.photoURL = trimmedPhoto;
        }

        if (!Object.keys(payload).length) {
            setStatus({ error: 'No changes to update.', success: '' });
            return;
        }

        setSaving(true);
        try {
            await secureApi.patch('/users/profile', payload);
            const nextName = payload.name || currentName;
            const nextPhoto = payload.photoURL || currentPhoto;
            if (updateUserProfile) {
                await updateUserProfile(nextName, nextPhoto);
            }
            if (typeof refreshProfile === 'function') {
                refreshProfile();
            }
            setStatus({ error: '', success: 'Profile updated successfully.' });
        } catch (error) {
            const status = error?.response?.status;
            if (status === 404 && authUser?.email) {
                try {
                    await saveUser({
                        name: payload.name || currentName || authUser?.displayName || 'Scholar Member',
                        email: authUser.email,
                        photoURL: payload.photoURL || currentPhoto || authUser?.photoURL || '',
                        createdAt: profile?.createdAt,
                    });
                    if (updateUserProfile) {
                        await updateUserProfile(payload.name || currentName, payload.photoURL || currentPhoto);
                    }
                    if (typeof refreshProfile === 'function') {
                        refreshProfile();
                    }
                    setStatus({ error: '', success: 'Profile created and updated.' });
                    return;
                } catch (createError) {
                    setStatus({
                        error: createError?.response?.data?.message || 'Failed to create profile.',
                        success: '',
                    });
                    return;
                }
            }
            setStatus({ error: error?.response?.data?.message || 'Failed to update profile.', success: '' });
        } finally {
            setSaving(false);
        }
    };

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
                <h2 className="text-lg font-semibold text-slate-900">Edit Profile</h2>
                <p className="mt-1 text-sm text-slate-500">Only name and photo URL can be updated.</p>
                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    <label className="block">
                        <span className="text-sm font-medium text-slate-600">Full Name</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1B3C73]"
                        />
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-slate-600">Photo URL</span>
                        <input
                            type="url"
                            name="photoURL"
                            value={formData.photoURL}
                            onChange={handleChange}
                            placeholder="https://"
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1B3C73]"
                        />
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-full bg-[#1B3C73] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#16305b] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        {status.error && <p className="text-sm text-red-500">{status.error}</p>}
                        {status.success && <p className="text-sm text-green-600">{status.success}</p>}
                    </div>
                </form>
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
