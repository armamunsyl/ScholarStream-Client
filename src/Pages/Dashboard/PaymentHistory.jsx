import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import secureApi from '../../utils/secureApi';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const PaymentHistory = () => {
    const { role, authUser } = useOutletContext();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (role !== 'student' || !authUser?.email) {
            setPayments([]);
            setLoading(false);
            return;
        }
        let isMounted = true;

        const loadPayments = async () => {
            try {
                setLoading(true);
                setError('');
                const { data } = await secureApi.get('/payments', { params: { email: authUser.email } });
                if (!isMounted) return;
                const list = Array.isArray(data) ? data : [];
                setPayments(list);
            } catch (err) {
                if (isMounted) {
                    setError(err?.response?.data?.message || 'Failed to load payments.');
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
    }, [role, authUser?.email]);

    if (role !== 'student') {
        return <p className="text-sm text-slate-500">Payment history is only relevant for student accounts.</p>;
    }

    if (loading) {
        return <LoadingSkeleton variant="table" />;
    }

    if (error) {
        return (
            <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
                {error}
            </section>
        );
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Payment History</h1>
                <p className="text-sm text-slate-500">Track all application fees and service charges.</p>
            </header>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                {payments.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">No payment records yet.</div>
                ) : (
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Scholarship</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Transaction</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment._id} className="border-t border-slate-100 text-slate-600">
                                    <td className="px-4 py-4 font-semibold text-slate-900">
                                        {payment.scholarshipName || 'Scholarship'}
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-emerald-600">
                                        ${Number(payment.amount || 0).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-4 text-xs text-slate-500">{payment.transactionId || '—'}</td>
                                    <td className="px-4 py-4">
                                        {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A'}
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

export default PaymentHistory;
