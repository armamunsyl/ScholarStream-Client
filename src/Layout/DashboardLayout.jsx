import { useMemo, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useDashboardUser from '../hooks/useDashboardUser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

const navConfig = {
    student: [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'My Applications', path: '/dashboard/my-applications' },
        { label: 'My Reviews', path: '/dashboard/my-reviews' },
        { label: 'Payment History', path: '/dashboard/payment-history' },
        { label: 'My Profile', path: '/dashboard/my-profile' },
    ],
    moderator: [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Review Applications', path: '/dashboard/review-applications' },
        { label: 'All Applications', path: '/dashboard/all-applications' },
        { label: 'Feedback Center', path: '/dashboard/application-feedback' },
        // { label: 'Reports', path: '/dashboard/reports' },
        { label: 'My Profile', path: '/dashboard/my-profile' },
    ],
    admin: [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Manage Users', path: '/dashboard/manage-users' },
        { label: 'Manage Scholarships', path: '/dashboard/manage-scholarships' },
        { label: 'Add Scholarship', path: '/dashboard/add-scholarship' },
        { label: 'Payments', path: '/dashboard/payment-records' },
        { label: 'Analytics', path: '/dashboard/analytics' },
        { label: 'My Profile', path: '/dashboard/my-profile' },
    ],
};

const roleBadge = {
    student: 'bg-blue-100 text-blue-700',
    moderator: 'bg-amber-100 text-amber-700',
    admin: 'bg-emerald-100 text-emerald-700',
};

const DashboardLayout = () => {
    const navigate = useNavigate();
    const { authUser, profile, loading, error, logOut } = useDashboardUser();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const normalizedRole = useMemo(() => profile?.role?.toLowerCase?.() ?? 'student', [profile?.role]);
    const links = navConfig[normalizedRole] ?? navConfig.student;
    const avatarSrc = authUser?.photoURL || profile?.photoURL;
    const avatarName = authUser?.displayName || profile?.name || authUser?.email || profile?.email || 'Scholar Member';
    const avatarInitial = avatarName?.charAt?.(0)?.toUpperCase?.() || 'S';

    const handleLogout = async () => {
        try {
            await logOut();
        } finally {
            navigate('/login', { replace: true });
        }
    };

    let content;

    if (loading) {
        content = (
            <section className="flex min-h-[60vh] items-center justify-center bg-[#F9F6F1] px-4 py-10">
                <div className="rounded-3xl bg-white px-8 py-10 text-center shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F58A4B]">Dashboard</p>
                    <p className="mt-3 text-lg font-semibold text-slate-900">Preparing your workspace...</p>
                    <p className="mt-1 text-sm text-slate-500">Loading the latest profile settings.</p>
                </div>
            </section>
        );
    } else if (!authUser) {
        content = (
            <section className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4 py-10 text-center">
                <div className="rounded-3xl bg-white p-10 shadow-md">
                    <h2 className="text-xl font-semibold text-slate-900">Login required</h2>
                    <p className="mt-3 text-slate-500">Please log in to open your dashboard.</p>
                    <button
                        type="button"
                        className="mt-6 rounded-full bg-[#1B3C73] px-6 py-2 text-sm font-semibold text-white"
                        onClick={() => navigate('/login')}
                    >
                        Go to Login
                    </button>
                </div>
            </section>
        );
    } else {
        content = (
            <section className="bg-[#F9F6F1] py-6">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 md:flex-row">
                    <aside className="hidden rounded-3xl bg-white p-6 shadow-sm md:block md:w-72">
                        <div className="text-center">
                            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-[#F2D5C4] bg-slate-100">
                                {avatarSrc ? (
                                    <img
                                        src={avatarSrc}
                                        alt={profile?.name || authUser?.displayName || 'User Avatar'}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-[#1B3C73]">
                                        {avatarInitial}
                                    </div>
                                )}
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-slate-900">{avatarName}</h2>
                            <p className="text-sm text-slate-500">{authUser?.email || profile?.email}</p>
                            <span
                                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                                    roleBadge[normalizedRole] || roleBadge.student
                                }`}
                            >
                                {normalizedRole}
                            </span>
                        </div>

                        <nav className="mt-8 flex flex-col gap-1">
                            {links.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/dashboard'}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                                            isActive ? 'bg-[#1B3C73] text-white' : 'text-slate-600 hover:bg-slate-100'
                                        }`
                                    }
                                >
                                    <span className="text-lg text-[#F58A4B]">•</span>
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>

                        <div className="mt-8 border-t border-slate-100 pt-6">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </aside>

                    <div className="w-full md:flex-1">
                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            {error ? (
                                <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
                                    {error}
                                </div>
                            ) : (
                                <Outlet context={{ profile: profile ?? {}, role: normalizedRole, authUser }} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9F6F1]">
            <Navbar />
            <div className="pt-24">{content}</div>
            <Footer />
            <MobileNav
                role={profile?.role?.toLowerCase?.()}
                onAccountAction={() => setMobileMenuOpen(true)}
                showMenu
            />
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 pb-4 md:hidden">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{avatarName}</p>
                                <p className="text-xs text-slate-500">{authUser?.email || profile?.email}</p>
                            </div>
                            <button
                                type="button"
                                className="text-sm font-semibold text-slate-500"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                        <nav className="mt-6 flex flex-col gap-1">
                            {links.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/dashboard'}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                                            isActive ? 'bg-[#1B3C73] text-white' : 'text-slate-600 hover:bg-slate-100'
                                        }`
                                    }
                                >
                                    <span className="text-lg text-[#F58A4B]">•</span>
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    handleLogout();
                                }}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
