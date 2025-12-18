import { useOutletContext } from 'react-router-dom';

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
    const { role, profile } = useOutletContext();
    const data = overviewData[role] ?? overviewData.student;

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

            <div className="grid gap-4 sm:grid-cols-3">
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
                        <button type="button" className="text-sm font-semibold text-[#1B3C73]">
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
                                {section.rows.map((row, rowIndex) => (
                                    <tr key={`${section.title}-${rowIndex}`} className="text-slate-700">
                                        {row.map((value, cellIndex) => (
                                            <td key={`${value}-${cellIndex}`} className="border-b border-slate-100 px-3 py-3">
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default DashboardOverview;
