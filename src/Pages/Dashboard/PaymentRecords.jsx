import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import secureApi from '../../utils/secureApi';

const PaymentRecords = () => {
    const { role } = useOutletContext();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (role !== 'admin') {
            setRecords([]);
            setLoading(false);
            return;
        }
        let isMounted = true;
        const loadPayments = async () => {
            try {
                setLoading(true);
                setError('');
                const { data } = await secureApi.get('/payments');
                if (!isMounted) return;
                setRecords(Array.isArray(data) ? data : []);
            } catch (err) {
                if (isMounted) {
                    setError(err?.response?.data?.message || 'Failed to load payment records.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        loadPayments();
        return () => {
            isMounted = false;
        };
    }, [role]);

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
                {loading ? (
                    <div className="p-6 text-center text-sm text-slate-500">Loading payment records...</div>
                ) : error ? (
                    <div className="p-6 text-center text-sm text-red-500">{error}</div>
                ) : records.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">No payment records found.</div>
                ) : (
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Applicant</th>
                                <th className="px-4 py-3">Scholarship</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Method</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3 text-right">Transaction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => (
                                <tr key={record._id} className="border-t border-slate-100 text-slate-600">
                                    <td className="px-4 py-4 font-semibold text-slate-900">{record.userName || 'Student'}</td>
                                    <td className="px-4 py-4">{record.scholarshipName || 'Scholarship'}</td>
                                    <td className="px-4 py-4 font-semibold text-emerald-600">
                                        ${Number(record.amount || 0).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-4 capitalize">{record.paymentMethod || 'card'}</td>
                                    <td className="px-4 py-4">
                                        {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-4 py-4 text-right text-xs font-semibold">
                                        {record.transactionId || '—'}
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

export default PaymentRecords;
