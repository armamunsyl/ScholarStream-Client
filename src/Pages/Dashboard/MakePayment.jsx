import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import secureApi from '../../utils/secureApi';
import { stripePromise } from '../../utils/stripe';

const PaymentForm = ({ application, amount, authUser, clientSecret, loadingIntent, setGlobalError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) return;
        setProcessing(true);
        setLocalError('');
        setGlobalError('');
        try {
            const { error: submitError } = await elements.submit();
            if (submitError) {
                setLocalError(submitError.message || 'Payment form validation failed.');
                setProcessing(false);
                return;
            }

            const { error: confirmationError, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: 'if_required',
                confirmParams: {
                    payment_method_data: {
                        billing_details: {
                            name: authUser?.displayName || application.studentName || 'ScholarStream Student',
                            email: authUser?.email || application.studentEmail,
                        },
                    },
                },
            });

            if (confirmationError) {
                setLocalError(confirmationError.message || 'Payment failed.');
                setProcessing(false);
                return;
            }

            if (paymentIntent?.status === 'succeeded') {
                const applicationId = application._id || application.id;
                await Promise.all([
                    secureApi.post('/payments', {
                        userEmail: authUser?.email || application.studentEmail,
                        userName: authUser?.displayName || application.studentName,
                        scholarshipId: application.scholarshipId || application.dashboardScholarshipId || application._id,
                        scholarshipName: application.scholarshipName,
                        amount,
                        transactionId: paymentIntent.id,
                        paymentMethod: paymentIntent.payment_method || 'card',
                    }),
                    applicationId ? secureApi.patch(`/applications/${applicationId}`, { payment: 'paid' }) : Promise.resolve(),
                ]);
                setSuccessMessage('Payment completed successfully!');
                toast.success('Payment completed successfully!');
                setTimeout(() => {
                    navigate('/dashboard/payment-history', { replace: true });
                }, 1200);
            }
        } catch (err) {
            const message = err?.response?.data?.message || 'Payment failed.';
            setLocalError(message);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="rounded-2xl border border-slate-200 px-4 py-3">
                <PaymentElement options={{ layout: 'tabs' }} />
            </div>
            {(localError) && <p className="text-sm text-red-500">{localError}</p>}
            {successMessage && <p className="text-sm text-emerald-600">{successMessage}</p>}
            <button
                type="submit"
                className="w-full rounded-full bg-[#1B3C73] py-2 text-sm font-semibold text-white disabled:opacity-60"
                disabled={!stripe || !clientSecret || processing || loadingIntent}
            >
                {processing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

const MakePayment = () => {
    const { role, authUser } = useOutletContext();
    const location = useLocation();
    const application = location.state?.application;

    const [clientSecret, setClientSecret] = useState('');
    const [loadingIntent, setLoadingIntent] = useState(false);
    const [error, setError] = useState('');

    const amount = useMemo(() => {
        const base = Number(application?.applicationFees ?? 0);
        return Number.isNaN(base) ? 0 : Math.max(base, 0);
    }, [application?.applicationFees]);

    useEffect(() => {
        if (role !== 'student' || !application || amount <= 0) return;
        let isMounted = true;
        const fetchIntent = async () => {
            try {
                setLoadingIntent(true);
                setError('');
                const { data } = await secureApi.post('/create-payment-intent', {
                    amount,
                    currency: application.currency || 'usd',
                });
                if (isMounted && data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err?.response?.data?.message || 'Failed to initiate payment.');
                }
            } finally {
                if (isMounted) {
                    setLoadingIntent(false);
                }
            }
        };
        fetchIntent();
        return () => {
            isMounted = false;
        };
    }, [role, application, amount]);

    if (role !== 'student') {
        return <p className="text-sm text-slate-500">Payments are accessible only to students.</p>;
    }

    if (!application) {
        return (
            <section className="rounded-2xl border border-slate-100 p-6 text-center text-sm text-slate-500">
                No payment session found. Please open payment from your application details.
            </section>
        );
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Complete Payment</h1>
                <p className="text-sm text-slate-500">Securely pay your application fees using Stripe.</p>
            </header>

            <div className="rounded-2xl border border-slate-100 p-6">
                <div className="space-y-2 text-sm text-slate-600">
                    <p>
                        <span className="font-semibold text-slate-900">Scholarship:</span> {application.scholarshipName}
                    </p>
                    <p>
                        <span className="font-semibold text-slate-900">University:</span> {application.universityName}
                    </p>
                    <p>
                        <span className="font-semibold text-slate-900">Amount:</span> ${amount.toFixed(2)}
                    </p>
                </div>
                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
                {clientSecret ? (
                    <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret,
                            appearance: {
                                theme: 'flat',
                            },
                        }}
                    >
                        <PaymentForm
                            application={application}
                            amount={amount}
                            authUser={authUser}
                            clientSecret={clientSecret}
                            loadingIntent={loadingIntent}
                            setGlobalError={setError}
                        />
                    </Elements>
                ) : (
                    <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                        Preparing secure payment...
                    </div>
                )}
            </div>
        </section>
    );
};

export default MakePayment;
