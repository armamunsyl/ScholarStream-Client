import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient, getUserProfile } from '../utils/userApi';
import secureApi from '../utils/secureApi';
import { AuthContext } from '../Provider/AuthProvider';

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-slate-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9c0 7.5-7.5 12-7.5 12S4.5 16.5 4.5 9a7.5 7.5 0 1115 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-blue-500">
    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const formatCurrency = (value) => {
  if (value === 0) return '$0';
  if (!value && value !== 0) return 'Not specified';
  const amount = Number(value);
  return Number.isNaN(amount) ? value : `$${amount.toLocaleString()}`;
};

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const initialScholarship = routeLocation.state?.scholarship ?? null;
  const { user } = useContext(AuthContext);
  const [scholarship, setScholarship] = useState(initialScholarship);
  const [loading, setLoading] = useState(!initialScholarship);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [adminEditing, setAdminEditing] = useState(false);
  const [adminSaving, setAdminSaving] = useState(false);
  const [adminEditData, setAdminEditData] = useState({
    scholarshipName: '',
    universityName: '',
    scholarshipCategory: '',
    country: '',
    tuitionFees: '',
    status: '',
  });
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        if (!initialScholarship) {
          setLoading(true);
        }
        setError('');
        const { data } = await apiClient.get('/scholarships');
        if (!isMounted) return;
        const result = Array.isArray(data) ? data.find((item) => (item._id || item.id)?.toString() === id) : null;
        setScholarship(result ?? null);
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load scholarship.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [id, initialScholarship]);

  useEffect(() => {
    let isMounted = true;
    const loadReviews = async () => {
      try {
        const { data } = await apiClient.get('/reviews');
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : [];
        const matched = list
          .filter((review) => review.scholarshipName === (initialScholarship?.scholarshipName || scholarship?.scholarshipName))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setReviews(matched);
      } catch (err) {
        console.error('Failed to load reviews', err);
      }
    };
    loadReviews();
    return () => {
      isMounted = false;
    };
  }, [initialScholarship?.scholarshipName, scholarship?.scholarshipName]);

  useEffect(() => {
    let isMounted = true;
    const loadRole = async () => {
      if (!user?.email) {
        if (isMounted) setUserRole('');
        return;
      }
      try {
        const profile = await getUserProfile(user.email);
        if (isMounted) {
          setUserRole(profile?.role?.toLowerCase?.() || '');
        }
      } catch (err) {
        if (isMounted) setUserRole('');
      }
    };
    loadRole();
    return () => {
      isMounted = false;
    };
  }, [user?.email]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login', { state: { from: routeLocation.pathname } });
      return;
    }
    if (!scholarship) return;
    try {
      setApplying(true);
      await secureApi.post('/applications', {
        studentEmail: user.email,
        studentName: user.displayName || user.email?.split('@')[0] || 'ScholarStream Student',
        universityName: scholarship.universityName,
        universityAddress: [scholarship.city, scholarship.country].filter(Boolean).join(', '),
        scholarshipName: scholarship.scholarshipName,
        applicationFees: scholarship.applicationFees ?? 0,
        scholarshipId: scholarship._id || scholarship.id || id,
        dashboardScholarshipId: scholarship._id || scholarship.id || id,
      });
      toast.success('Application submitted successfully!');
      setApplied(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to submit application.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        <p className="text-lg font-medium">Loading scholarship details...</p>
      </section>
    );
  }

  if (error || !scholarship) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900">
        <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-lg">
          <p className="mb-4 text-xl font-semibold">Scholarship not found</p>
          <p className="mb-6 text-slate-500">The scholarship you are looking for may have been removed or the link is incorrect.</p>
          <button
            type="button"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20"
            onClick={() => navigate('/scholarships')}
          >
            Back to Scholarships
          </button>
        </div>
      </section>
    );
  }

  const {
    scholarshipName,
    universityName,
    description,
    city,
    country,
    image,
    subjectCategory,
    scholarshipCategory,
    degree,
    worldRank,
    tuitionFees,
    applicationFees,
    serviceCharge,
    deadline,
  } = scholarship;

  const formattedLocation = useMemo(() => {
    const parts = [city, country].filter(Boolean);
    return parts.length ? parts.join(', ') : 'Location not specified';
  }, [city, country]);

  const badges = [scholarshipCategory, subjectCategory].filter(Boolean);
  const stats = [
    { label: 'Degree', value: degree || 'Not specified' },
    { label: 'World Rank', value: worldRank || 'Not specified' },
    { label: 'Application Fee', value: formatCurrency(applicationFees) },
    { label: 'Service Charge', value: formatCurrency(serviceCharge) },
    { label: 'Tuition per year', value: formatCurrency(tuitionFees) },
    { label: 'Deadline', value: deadline ? new Date(deadline).toLocaleDateString() : 'Not specified' },
  ];

  return (
    <section className="mt-4 -mb-24 min-h-screen bg-white px-4 pb-0 pt-0 text-slate-900 md:mb-0 md:px-0">
      <div className="mx-auto max-w-6xl bg-white">
        <div className="relative h-64 w-full overflow-hidden">
          <img src={image || 'https://i.ibb.co/D9Q5g3m/scholarship-placeholder.jpg'} alt={scholarshipName} className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="space-y-10 p-6 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Featured Scholarship
              </div>
              <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">{universityName}</h1>
              <p className="text-sm font-semibold text-slate-600">{scholarshipName }</p>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <LocationIcon />
                <span>{formattedLocation}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {badges.map((badge, index) => (
                  <span
                    key={badge}
                    className={`rounded-full px-4 py-1 text-sm font-medium ${
                      index === 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {badge}
                  </span>
                ))}
                {deadline && (
                  <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-600">
                    Deadline: {new Date(deadline).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 text-right">
              <div>
                <p className="text-sm text-slate-500">Application Fee</p>
                <p className="text-3xl font-semibold text-slate-900">{formatCurrency(applicationFees)}</p>
              </div>
              {userRole === 'admin' ? (
                <button
                  type="button"
                  onClick={() => {
                    if (!scholarship) return;
                    setAdminEditData({
                      scholarshipName: scholarship.scholarshipName || '',
                      universityName: scholarship.universityName || '',
                      scholarshipCategory: scholarship.scholarshipCategory || '',
                      country: scholarship.country || '',
                      tuitionFees: scholarship.tuitionFees || '',
                      status: scholarship.status || '',
                    });
                    setAdminEditing(true);
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-[#0F2C60] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#0c224a]"
                >
                  Edit
                </button>
              ) : userRole === 'moderator' ? (
                <button
                  type="button"
                  onClick={() => navigate('/dashboard/review-applications')}
                  className="inline-flex items-center justify-center rounded-full bg-[#0F2C60] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#0c224a]"
                >
                  See Applied
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={applied || applying}
                  className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition ${
                    applied
                      ? 'bg-emerald-500/80 cursor-not-allowed'
                      : 'bg-[#0F2C60] hover:bg-[#0c224a] disabled:cursor-not-allowed disabled:opacity-60'
                  }`}
                >
                  {applied ? 'Applied' : applying ? 'Applying...' : 'Apply Now'}
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-5 md:col-span-2">
              <div className="border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
                <p className="mt-3 text-slate-600">{description || 'No description provided for this scholarship yet.'}</p>
              </div>

              <div className="border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Scholarship Facts</h2>
                <dl className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                  {stats.map((fact) => (
                    <div key={fact.label}>
                      <dt className="font-semibold text-slate-900">{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Highlights</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Available for {degree || 'multiple degree levels'} applicants.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Focus on {subjectCategory || 'diverse subjects'} with strong academic potential.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Hosted by {universityName || 'a reputed institution'} offering global exposure.
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-5">
              <div className="border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold">University Details</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">{universityName}</p>
                  <p>{formattedLocation}</p>
                  {worldRank && (
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">World Rank</p>
                      <p className="font-semibold text-slate-900">{worldRank}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Fees & Charges</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Application Fee</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(applicationFees)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Service Charge</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(serviceCharge)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tuition Fees</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(tuitionFees)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {reviews.length > 0 && (
          <div className="mt-10 space-y-4 mb-10">
            <h2 className="text-xl font-semibold text-slate-900">Latest Reviews</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {reviews.map((review) => (
                <div key={review._id} className="rounded-2xl border border-slate-100 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                      {review.userPhotoURL ? (
                        <img src={review.userPhotoURL} alt={review.userName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#1B3C73]">
                          {(review.userName || 'S')[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{review.userName}</p>
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span key={index} className={`text-lg ${index < Number(review.rating || 0) ? 'text-amber-400' : 'text-slate-200'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {adminEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-semibold text-slate-900">Update Scholarship</h3>
              <button
                type="button"
                className="text-sm font-semibold text-slate-500"
                onClick={() => setAdminEditing(false)}
                disabled={adminSaving}
              >
                Close
              </button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-slate-600">
                Scholarship Name
                <input
                  type="text"
                  className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                  value={adminEditData.scholarshipName}
                  onChange={(event) => setAdminEditData((prev) => ({ ...prev, scholarshipName: event.target.value }))}
                />
              </label>
              <label className="text-sm text-slate-600">
                University Name
                <input
                  type="text"
                  className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                  value={adminEditData.universityName}
                  onChange={(event) => setAdminEditData((prev) => ({ ...prev, universityName: event.target.value }))}
                />
              </label>
              <label className="text-sm text-slate-600">
                Category
                <input
                  type="text"
                  className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                  value={adminEditData.scholarshipCategory}
                  onChange={(event) => setAdminEditData((prev) => ({ ...prev, scholarshipCategory: event.target.value }))}
                />
              </label>
              <label className="text-sm text-slate-600">
                Country
                <input
                  type="text"
                  className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                  value={adminEditData.country}
                  onChange={(event) => setAdminEditData((prev) => ({ ...prev, country: event.target.value }))}
                />
              </label>
              <label className="text-sm text-slate-600">
                Tuition Fees
                <input
                  type="number"
                  className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                  value={adminEditData.tuitionFees}
                  onChange={(event) => setAdminEditData((prev) => ({ ...prev, tuitionFees: event.target.value }))}
                />
              </label>
              <label className="text-sm text-slate-600">
                Status
                <select
                  className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 capitalize text-slate-700 focus:border-[#1B3C73] focus:outline-none"
                  value={adminEditData.status}
                  onChange={(event) => setAdminEditData((prev) => ({ ...prev, status: event.target.value }))}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="draft">Draft</option>
                </select>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600"
                onClick={() => setAdminEditing(false)}
                disabled={adminSaving}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-full bg-[#1B3C73] px-5 py-2 text-sm font-semibold text-white disabled:opacity-70"
                onClick={async () => {
                  if (!scholarship?._id && !scholarship?.id) return;
                  try {
                    setAdminSaving(true);
                    const targetId = (scholarship._id || scholarship.id || '').toString();
                    await secureApi.patch(`/scholarships/${targetId}`, adminEditData);
                    setScholarship((prev) => (prev ? { ...prev, ...adminEditData } : prev));
                    toast.success('Scholarship updated successfully.');
                    setAdminEditing(false);
                  } catch (err) {
                    toast.error(err?.response?.data?.message || 'Failed to update scholarship.');
                  } finally {
                    setAdminSaving(false);
                  }
                }}
                disabled={adminSaving}
              >
                {adminSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScholarshipDetails;
