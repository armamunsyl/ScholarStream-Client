import { NavLink } from 'react-router-dom';

const publicItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/scholarships', label: 'Scholarships', icon: BookIcon },
    { path: '/dashboard', label: 'Dashboard', icon: StarIcon },
    { path: '/faq', label: 'FAQ', icon: HelpIcon },
    { path: '/dashboard/my-profile', label: 'Account', icon: UserIcon }
];

const dashboardItems = [
    { path: '/dashboard', label: 'Overview', icon: HomeIcon },
    { path: '/dashboard/my-applications', label: 'Applications', icon: BookIcon, roles: ['student'] },
    { path: '/dashboard/my-reviews', label: 'Reviews', icon: StarIcon, roles: ['student'] },
    { path: '/dashboard/review-applications', label: 'Review Apps', icon: HelpIcon, roles: ['moderator'] },
    { path: '/dashboard/manage-users', label: 'Users', icon: UserIcon, roles: ['admin'] },
];

function HomeIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path d="M3 11L12 4l9 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 10v10h5v-6h4v6h5V10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function BookIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeWidth="1.8" strokeLinecap="round" />
            <path
                d="M6.5 2H20v19H6.5A2.5 2.5 0 0 0 4 23.5v-19A2.5 2.5 0 0 1 6.5 2Z"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function StarIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path
                d="m12 3 2.7 5.5 6.05.9-4.38 4.3 1.04 6.05L12 16.9l-5.4 2.85 1.04-6.05L3.27 9.4l6.05-.9L12 3Z"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function HelpIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
        </svg>
    );
}

function UserIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <circle cx="12" cy="8" r="4" strokeWidth="1.8" />
            <path d="M4 20c1.43-3 4.76-4 8-4s6.57 1 8 4" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

const MobileNav = ({ role = 'guest', isDashboard }) => {
    const items = isDashboard
        ? dashboardItems.filter((item) => !item.roles || item.roles.includes(role))
        : publicItems;
    return (
        <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-white/10 bg-[#11264F] px-2 py-2 text-white shadow-[0_-4px_12px_rgba(0,0,0,0.25)] md:hidden">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                {items.map(({ path, label, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium transition ${
                                isActive ? 'bg-white/10 text-white' : 'text-white/70'
                            }`
                        }
                    >
                        <Icon className="h-5 w-5" />
                        {label}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default MobileNav;
