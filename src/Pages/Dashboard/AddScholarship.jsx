import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { apiClient } from '../../utils/userApi';
import { toast } from 'react-toastify';

const fields = [
    { name: 'scholarshipName', label: 'Scholarship Name', type: 'text' },
    { name: 'universityName', label: 'University Name', type: 'text' },
    { name: 'image', label: 'Image URL', type: 'url' },
    { name: 'country', label: 'Country', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'worldRank', label: 'World Rank', type: 'number' },
    { name: 'subjectCategory', label: 'Subject Category', type: 'text' },
    { name: 'degree', label: 'Degree', type: 'text' },
    { name: 'tuitionFees', label: 'Tuition Fees', type: 'number' },
    { name: 'applicationFees', label: 'Application Fees', type: 'number' },
    { name: 'serviceCharge', label: 'Service Charge', type: 'number' },
    { name: 'deadline', label: 'Deadline', type: 'date' },
];

const createInitialState = () =>
    fields.reduce(
        (acc, field) => {
            acc[field.name] = '';
            return acc;
        },
        { description: '', scholarshipCategory: 'Full Fund' }
    );

const AddScholarship = () => {
    const { role } = useOutletContext();
    const [formData, setFormData] = useState(() => createInitialState());
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            await apiClient.post('/scholarships', {
                ...formData,
                createdAt: new Date().toISOString(),
            });
            toast.success('Scholarship created successfully!');
            setFormData(createInitialState());
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to create scholarship.');
        } finally {
            setSubmitting(false);
        }
    };

    if (role !== 'admin') {
        return <p className="text-sm text-slate-500">Only admins can add scholarships.</p>;
    }

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">Add Scholarship</h1>
                <p className="text-sm text-slate-500">Publish new opportunities to the platform.</p>
            </header>

            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit} id="add-scholarship-form">
                {fields.map((field) => (
                    <label key={field.name} className="text-sm font-semibold text-slate-600">
                        {field.label}
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-normal text-slate-800 focus:border-[#1B3C73] focus:outline-none"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                    </label>
                ))}
                <label className="text-sm font-semibold text-slate-600">
                    Scholarship Category
                    <select
                        name="scholarshipCategory"
                        value={formData.scholarshipCategory}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-normal text-slate-800 focus:border-[#1B3C73] focus:outline-none"
                    >
                        <option value="Full Fund">Full Fund</option>
                        <option value="Pertial Fund">Pertial Fund</option>
                    </select>
                </label>
                <label className="text-sm font-semibold text-slate-600 md:col-span-2">
                    Description
                    <textarea
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-normal text-slate-800 focus:border-[#1B3C73] focus:outline-none"
                        placeholder="Scholarship overview, eligibility, etc."
                    />
                </label>
            </form>
            <div className="flex justify-end">
                <button
                    type="submit"
                    form="add-scholarship-form"
                    className="rounded-2xl bg-[#1B3C73] px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                    disabled={submitting}
                >
                    {submitting ? 'Saving...' : 'Save Scholarship'}
                </button>
            </div>
        </section>
    );
};

export default AddScholarship;
