import { useOutletContext } from 'react-router-dom';

const payments = [
    { id: 1, scholarship: 'Global STEM Fellows', amount: '$85', status: 'paid', date: '03/12/2025' },
    { id: 2, scholarship: 'Creative Arts Talent', amount: '$45', status: 'unpaid', date: 'Pending' },
];

const statusColor = {
    paid: 'text-emerald-600',
    unpaid: 'text-red-500',
};

const PaymentHistory = () => {
    const { role } = useOutletContext();

    if (role !== 'student') {
        return <p className="text-sm text-slate-500">Payment history is only relevant for student accounts.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Payment History</h1>
                <p className="text-sm text-slate-500">Track all application fees and service charges.</p>
            </header>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Scholarship</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id} className="border-t border-slate-100 text-slate-600">
                                <td className="px-4 py-4 font-semibold text-slate-900">{payment.scholarship}</td>
                                <td className="px-4 py-4">{payment.amount}</td>
                                <td className={`px-4 py-4 font-semibold ${statusColor[payment.status]}`}>
                                    {payment.status}
                                </td>
                                <td className="px-4 py-4">{payment.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default PaymentHistory;
