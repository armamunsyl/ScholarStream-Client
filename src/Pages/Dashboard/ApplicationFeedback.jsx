import { useOutletContext } from 'react-router-dom';

const ApplicationFeedback = () => {
    const { role } = useOutletContext();

    if (role !== 'moderator') {
        return <p className="text-sm text-slate-500">Feedback center is exclusive to moderators.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Feedback Center</h1>
                <p className="text-sm text-slate-500">Send quick notes or follow ups to applicants.</p>
            </header>

            <div className="rounded-2xl border border-slate-100 p-6">
                <form className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-slate-600">Applicant Email</label>
                        <input
                            type="email"
                            placeholder="applicant@email.com"
                            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#1B3C73] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-600">Feedback</label>
                        <textarea
                            rows={4}
                            placeholder="Write actionable feedback..."
                            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#1B3C73] focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" className="rounded-2xl border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-600">
                            Cancel
                        </button>
                        <button type="submit" className="rounded-2xl bg-[#1B3C73] px-6 py-2 text-sm font-semibold text-white">
                            Send Feedback
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ApplicationFeedback;
