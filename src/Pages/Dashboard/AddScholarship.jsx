import { useOutletContext } from 'react-router-dom';

const fields = [
    { name: 'scholarshipName', label: 'Scholarship Name', type: 'text' },
    { name: 'universityName', label: 'University Name', type: 'text' },
    { name: 'image', label: 'Image URL', type: 'url' },
    { name: 'country', label: 'Country', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'worldRank', label: 'World Rank', type: 'number' },
    { name: 'subjectCategory', label: 'Subject Category', type: 'text' },
    { name: 'scholarshipCategory', label: 'Scholarship Category', type: 'text' },
    { name: 'degree', label: 'Degree', type: 'text' },
    { name: 'tuitionFees', label: 'Tuition Fees', type: 'number' },
    { name: 'applicationFees', label: 'Application Fees', type: 'number' },
    { name: 'serviceCharge', label: 'Service Charge', type: 'number' },
    { name: 'deadline', label: 'Deadline', type: 'date' },
];

const AddScholarship = () => {
    const { role } = useOutletContext();

    if (role !== 'admin') {
        return <p className="text-sm text-slate-500">Only admins can add scholarships.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Add Scholarship</h1>
                <p className="text-sm text-slate-500">Publish new opportunities to the platform.</p>
            </header>

            <form className="grid gap-4 md:grid-cols-2">
                {fields.map((field) => (
                    <label key={field.name} className="text-sm font-semibold text-slate-600">
                        {field.label}
                        <input
                            type={field.type}
                            name={field.name}
                            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-normal text-slate-800 focus:border-[#1B3C73] focus:outline-none"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                    </label>
                ))}
                <label className="text-sm font-semibold text-slate-600 md:col-span-2">
                    Description
                    <textarea
                        rows={4}
                        className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-normal text-slate-800 focus:border-[#1B3C73] focus:outline-none"
                        placeholder="Scholarship overview, eligibility, etc."
                    />
                </label>
            </form>
            <div className="flex justify-end">
                <button type="submit" className="rounded-2xl bg-[#1B3C73] px-6 py-2.5 text-sm font-semibold text-white">
                    Save Scholarship
                </button>
            </div>
        </section>
    );
};

export default AddScholarship;
