import { useOutletContext } from 'react-router-dom';

const records = [
    { id: 1, applicant: 'Rafi Karim', scholarship: 'Global Leaders', amount: '$150', status: 'paid', date: '05/12/2025' },
    { id: 2, applicant: 'Lena Cruz', scholarship: 'Urban Innovators', amount: '$90', status: 'processing', date: '05/10/2025' },
];

const PaymentRecords = () => {
    const { role } = useOutletContext();

    if (role !== 'admin') {
        return <p className="text-sm text-slate-500">Only admins can view payment records.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Payment Records</h1>
                <p className="text-sm text-slate-500">Track every transaction processed on the platform.</p>
            </header>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Applicant</th>
                            <th className="px-4 py-3">Scholarship</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record.id} className="border-t border-slate-100 text-slate-600">
                                <td className="px-4 py-4 font-semibold text-slate-900">{record.applicant}</td>
                                <td className="px-4 py-4">{record.scholarship}</td>
                                <td className="px-4 py-4">{record.amount}</td>
                                <td className="px-4 py-4 capitalize">{record.status}</td>
                                <td className="px-4 py-4">{record.date}</td>
                                <td className="px-4 py-4 text-right text-xs font-semibold">
                                    <button className="text-[#1B3C73]">Receipt</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default PaymentRecords;
