import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from '../../utils/userApi';

const overviewData = {
    student: {
        stats: [
            { label: 'Total Applications', value: 4, color: 'bg-[#FDEDE4]', text: 'text-[#E86A33]' },
            { label: 'Completed', value: 1, color: 'bg-[#E9F8F3]', text: 'text-[#1A9273]' },
            { label: 'Pending', value: 3, color: 'bg-[#FFF8E6]', text: 'text-[#C38B00]' },
        ],
        sections: [
            {
                title: 'My Applications',
                columns: ['Scholarship', 'University', 'Status', 'Applied At'],
                rows: [
                    ['Emi Lang Scholarship', 'Hadley Rosa', 'Pending', '12/18/2025'],
                    ['Future Leaders', 'Oxford', 'Completed', '04/22/2025'],
                ],
            },
            {
                title: 'My Reviews',
                columns: ['Scholarship', 'Rating', 'Comment'],
                rows: [
                    ['Future Leaders', '5 / 5', 'Amazing support from mentors.'],
                    ['STEM Excellence', '4 / 5', 'Clear expectations and fast response.'],
                ],
            },
        ],
    },
    moderator: {
        stats: [
            { label: 'Applications in Queue', value: 12, color: 'bg-[#FFF1F1]', text: 'text-[#E54E53]' },
            { label: 'Awaiting Feedback', value: 5, color: 'bg-[#EEF4FF]', text: 'text-[#1B3C73]' },
            { label: 'Completed Today', value: 3, color: 'bg-[#E9F8F3]', text: 'text-[#1A9273]' },
        ],
        sections: [
            {
                title: 'Applications Overview',
                columns: ['Applicant', 'University', 'Status', 'Payment'],
                rows: [
                    ['Anika Rahman', 'Toronto', 'Processing', 'Paid'],
                    ['Kevin Grant', 'TU Munich', 'Pending', 'Unpaid'],
                ],
            },
            {
                title: 'Recent Feedback',
                columns: ['Applicant', 'Scholarship', 'Feedback'],
                rows: [
                    ['Samir Khan', 'Future Leaders', 'Please attach updated transcript.'],
                    ['Lena Walsh', 'STEM Masters', 'Application moved to completed.'],
                ],
            },
        ],
    },
    admin: {
        stats: [
            { label: 'Total Users', value: 842, color: 'bg-[#E9F8F3]', text: 'text-[#1A9273]' },
            { label: 'Scholarships Live', value: 38, color: 'bg-[#FFF8E6]', text: 'text-[#C38B00]' },
            { label: 'Fees Collected', value: '$24k', color: 'bg-[#FDEDE4]', text: 'text-[#E86A33]' },
        ],
        sections: [
            {
                title: 'Scholarships Requiring Review',
                columns: ['Scholarship', 'University', 'Category', 'Status'],
                rows: [
                    ['Global Leaders', 'Cambridge', 'MBA', 'Draft'],
                    ['Urban Innovators', 'NYU', 'Architecture', 'Pending'],
                ],
            },
            {
                title: 'User Snapshot',
                columns: ['Name', 'Email', 'Role'],
                rows: [
                    ['Nadia Rahim', 'nadia@scholar.com', 'Moderator'],
                    ['Joseph Nolan', 'joseph@scholar.com', 'Student'],
                ],
            },
        ],
    },
};

const DashboardOverview = () => {
    const { role, profile, authUser } = useOutletContext();
    const isStudent = role === 'student';
    const isModerator = role === 'moderator';
    const isAdmin = role === 'admin';
    const [applications, setApplications] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [scholarships, setScholarships] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(isStudent || isModerator || isAdmin);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                if (!isStudent && !isModerator && !isAdmin) {
                    setLoading(false);
                    return;
                }

                setLoading(true);

                if (isStudent) {
                    if (!authUser?.email) {
                        setApplications([]);
                        setReviews([]);
                        setLoading(false);
                        return;
                    }

                    const [applicationsRes, reviewsRes] = await Promise.all([
                        apiClient.get('/applications'),
                        apiClient.get('/reviews'),
                    ]);

                    if (!isMounted) return;

                    const allApplications = Array.isArray(applicationsRes.data) ? applicationsRes.data : [];
                    const myApplications = allApplications.filter(
                        (item) => item.studentEmail?.toLowerCase() === authUser.email.toLowerCase()
                    );
                    const allReviews = Array.isArray(reviewsRes.data) ? reviewsRes.data : [];
                    const myReviews = allReviews.filter((item) => item.userEmail?.toLowerCase() === authUser.email.toLowerCase());
                    setApplications(myApplications);
                    setReviews(myReviews);
                } else if (isModerator) {
                    const [applicationsRes, reviewsRes] = await Promise.all([
                        apiClient.get('/applications'),
                        apiClient.get('/reviews'),
                    ]);

                    if (!isMounted) return;

                    const allApplications = Array.isArray(applicationsRes.data) ? applicationsRes.data : [];
                    const allReviews = Array.isArray(reviewsRes.data) ? reviewsRes.data : [];
                    setApplications(allApplications);
                    setReviews(allReviews);
                } else if (isAdmin) {
                    const [applicationsRes, scholarshipsRes, usersRes] = await Promise.all([
                        apiClient.get('/applications'),
                        apiClient.get('/scholarships'),
                        apiClient.get('/users'),
                    ]);

                    if (!isMounted) return;

                    const allApplications = Array.isArray(applicationsRes.data) ? applicationsRes.data : [];
                    const allScholarships = Array.isArray(scholarshipsRes.data) ? scholarshipsRes.data : [];
                    const allUsers = Array.isArray(usersRes.data) ? usersRes.data : [];

                    setApplications(allApplications);
                    setScholarships(allScholarships);
                    setUsers(allUsers);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Failed to load dashboard data.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();
        return () => {
            isMounted = false;
        };
    }, [isStudent, isModerator, isAdmin, authUser?.email]);

    const data = useMemo(() => {
        if (isStudent) {
            const total = applications.length;
            const completed = applications.filter((app) => app.status?.toLowerCase() === 'approved').length;
            const pending = applications.filter((app) => (app.status || 'pending').toLowerCase() === 'pending').length;

            return {
                stats: [
                    { label: 'Total Applications', value: total, color: 'bg-[#FDEDE4]', text: 'text-[#E86A33]' },
                    { label: 'Completed', value: completed, color: 'bg-[#E9F8F3]', text: 'text-[#1A9273]' },
                    { label: 'Pending', value: pending, color: 'bg-[#FFF8E6]', text: 'text-[#C38B00]' },
                ],
                sections: [
                    {
                        title: 'My Applications',
                        columns: ['Scholarship', 'University', 'Status', 'Applied At'],
                        rows: (applications ?? []).slice(0, 3).map((app) => [
                            app.scholarshipName || 'Scholarship',
                            app.universityName || 'University',
                            (app.status || 'pending').replace(/\b\w/, (c) => c.toUpperCase()),
                            app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A',
                        ]),
                    },
                    {
                        title: 'My Reviews',
                        columns: ['Scholarship', 'Rating', 'Comment'],
                        rows: (reviews ?? []).slice(0, 3).map((review) => [
                            review.scholarshipName || 'Scholarship',
                            `${review.rating || 0} / 5`,
                            review.comment || 'No comment',
                        ]),
                    },
                ],
            };
        }

        if (isModerator) {
            const queue = applications.filter((app) => (app.status || 'pending').toLowerCase() !== 'approved').length;
            const approved = applications.filter((app) => app.status?.toLowerCase() === 'approved').length;

            return {
                stats: [
                    { label: 'Applications in Queue', value: queue, color: 'bg-[#FFF1F1]', text: 'text-[#E54E53]' },
                    { label: 'Total Approved', value: approved, color: 'bg-[#E9F8F3]', text: 'text-[#1A9273]' },
                ],
                sections: [
                    {
                        title: 'Applications Overview',
                        columns: ['Applicant', 'University', 'Status', 'Payment'],
                        rows: (applications ?? []).slice(0, 4).map((app) => [
                            app.studentName || 'Applicant',
                            app.universityName || 'University',
                            (app.status || 'pending').replace(/\b\w/g, (c) => c.toUpperCase()),
                            (app.payment || 'unpaid').replace(/\b\w/g, (c) => c.toUpperCase()),
                        ]),
                    },
                    {
                        title: 'Recent Feedback',
                        columns: ['Applicant', 'Scholarship', 'Feedback'],
                        rows: (reviews ?? []).slice(0, 4).map((review) => [
                            review.userName || 'Scholar',
                            review.scholarshipName || 'Scholarship',
                            review.comment || 'No comment added.',
                        ]),
                    },
                ],
            };
        }

        if (isAdmin) {
            const totalUsers = users.length;
            const totalScholarships = scholarships.length;
            const approvedApps = applications.filter((app) => (app.status || '').toLowerCase() === 'approved').length;
            const sortedUsers = [...(users ?? [])]
                .filter((user) => Boolean(user))
                .sort((a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0))
                .slice(0, 7);

            return {
                stats: [
                    { label: 'Total Users', value: totalUsers, color: 'bg-[#E9F8F3]', text: 'text-[#1A9273]' },
                    { label: 'Scholarships Live', value: totalScholarships, color: 'bg-[#FFF8E6]', text: 'text-[#C38B00]' },
                    { label: 'Applications Approved', value: approvedApps, color: 'bg-[#FDEDE4]', text: 'text-[#E86A33]' },
                ],
                sections: [
                    {
                        title: 'Recent Members',
                        columns: ['Name', 'Email', 'Role', 'Joined'],
                        rows: sortedUsers.map((user) => [
                            user.name || user.displayName || 'New Member',
                            user.email || 'unknown@user.com',
                            (user.role || 'student').replace(/\b\w/g, (c) => c.toUpperCase()),
                            user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
                        ]),
                    },
                ],
            };
        }

        return overviewData[role] ?? overviewData.student;
    }, [role, isStudent, isModerator, isAdmin, applications, reviews, scholarships, users]);

    return (
        <section className="space-y-8 text-slate-800">
            <header className="space-y-2">
                <p className="text-sm font-semibold text-[#F58A4B] uppercase tracking-[0.3em]">Dashboard</p>
                <h1 className="text-2xl font-semibold text-slate-900">
                    Welcome back, {profile?.name || 'Scholar'}!
                </h1>
                <p className="text-sm text-slate-500">
                    Manage your {role} responsibilities and track progress from a single place.
                </p>
            </header>

            {loading ? (
                <div className="rounded-2xl border border-slate-100 p-6 text-center text-sm text-slate-500">
                    Loading overview...
                </div>
            ) : (
                <>
                    <div className={`grid gap-4 ${data.stats.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
                        {data.stats.map((stat) => (
                            <div key={stat.label} className={`rounded-2xl ${stat.color} px-5 py-4`}>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <p className={`mt-2 text-3xl font-semibold ${stat.text}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {data.sections.map((section) => (
                        <div key={section.title} className="rounded-2xl border border-slate-100 p-5">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                                <button
                                    type="button"
                                    className="text-sm font-semibold text-[#1B3C73]"
                                    onClick={() => {
                                        if (role === 'student') {
                                            const target =
                                                section.title === 'My Reviews'
                                                    ? '/dashboard/my-reviews'
                                                    : '/dashboard/my-applications';
                                            window.location.href = target;
                                        } else if (role === 'moderator') {
                                            const target =
                                                section.title === 'Recent Feedback'
                                                    ? '/dashboard/application-feedback'
                                                    : '/dashboard/review-applications';
                                            window.location.href = target;
                                        } else if (role === 'admin') {
                                            window.location.href = '/dashboard/manage-users';
                                        }
                                    }}
                                >
                                    View All
                                </button>
                            </div>
                            <div className="mt-4 overflow-x-auto">
                                <table className="min-w-full text-left text-sm">
                                    <thead>
                                        <tr className="text-xs uppercase tracking-wide text-slate-500">
                                            {section.columns.map((column) => (
                                                <th key={column} className="border-b border-slate-100 px-3 pb-2">
                                                    {column}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.rows.length === 0 ? (
                                            <tr>
                                                <td className="px-3 py-4 text-center text-sm text-slate-500" colSpan={section.columns.length}>
                                                    Nothing to display yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            section.rows.map((row, rowIndex) => (
                                                <tr key={`${section.title}-${rowIndex}`} className="text-slate-700">
                                                    {row.map((value, cellIndex) => (
                                                        <td key={`${section.title}-${rowIndex}-${cellIndex}`} className="border-b border-slate-100 px-3 py-3">
                                                            {value}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </section>
    );
};

export default DashboardOverview;
