import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const fetchScholarships = async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}data/scholarships.json`);
  if (!response.ok) {
    throw new Error('Unable to load scholarships');
  }
  return response.json();
};

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-slate-500">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 9c0 7.5-7.5 12-7.5 12S4.5 16.5 4.5 9a7.5 7.5 0 1115 0z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-blue-500">
    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-slate-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6M9 13h6M9 17h3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 3h8l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
  </svg>
);

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1 text-amber-400">
    {Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        viewBox="0 0 24 24"
        fill={index < rating ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        className={`h-4 w-4 ${index < rating ? 'text-amber-400' : 'text-slate-300'}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.5l2.05 4.15 4.58.67-3.32 3.24.78 4.57-4.09-2.15-4.08 2.15.78-4.57-3.32-3.24 4.58-.67 2.04-4.15z"
        />
      </svg>
    ))}
  </div>
);

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [scholarship, setScholarship] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await fetchScholarships();
        if (!isMounted) return;
        const found = data.find((item) => item.id?.toString() === id);
        setScholarship(found ?? null);
      } catch (err) {
        setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [id]);

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
          <p className="text-xl font-semibold mb-4">Scholarship not found</p>
          <p className="text-slate-500 mb-6">
            The scholarship you are looking for may have been removed or the link is incorrect.
          </p>
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

  const { title, location, coverImage, tags, deadline, applicationFee, overview, tuition, degreeDetails, documents, requirements, university, testimonials } =
    scholarship;

  return (
    <section className="mt-4 -mb-24 min-h-screen bg-white px-4 pb-0 pt-0 text-slate-900 md:mb-0 md:px-0 ">
      <div className="mx-auto max-w-6xl bg-white ">
        <div className="relative h-64 w-full overflow-hidden">
          <img src={coverImage} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="space-y-10 p-6 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Featured Scholarship
              </div>
              <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h1>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <LocationIcon />
                <span>{location}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-600">
                    {tag}
                  </span>
                ))}
                <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-600">{deadline}</span>
                <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-600">
                  Application Fee: {applicationFee === 0 ? '$0' : `$${applicationFee}`}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 text-right">
              <div>
                <p className="text-sm text-slate-500">Tuition / year</p>
                <p className="text-3xl font-semibold text-slate-900">{tuition}</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-[#0F2C60] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#0c224a]"
              >
                Apply Now
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-5">
              <div className="border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
                <p className="mt-3 text-slate-600">{overview}</p>
              </div>

              <div className="border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Degree Details</h2>
                <dl className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-slate-900">Degree Level</dt>
                    <dd>{degreeDetails.level}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Study Mode</dt>
                    <dd>{degreeDetails.studyMode}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Funding Type</dt>
                    <dd>{degreeDetails.fundingType}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Location</dt>
                    <dd>{degreeDetails.location}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Duration</dt>
                    <dd>{degreeDetails.duration}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Deadline</dt>
                    <dd>{degreeDetails.deadline}</dd>
                  </div>
                </dl>
              </div>

              <div className="border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Documents Needed</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {documents.map((doc) => (
                    <li key={doc} className="flex items-center gap-3">
                      <DocumentIcon />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Apply Now</h2>
                  <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    Write a review
                  </button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border border-slate-100 p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{testimonial.name}</p>
                          <p className="text-sm text-slate-500">{testimonial.country}</p>
                        </div>
                        <StarRating rating={testimonial.rating} />
                      </div>
                      <p className="mt-3 text-sm text-slate-600">“{testimonial.quote}”</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Requirements</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckIcon />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">About the University</h2>
                <div className="mt-4 flex items-center gap-3">
                  <img src={university.logo} alt={university.name} className="h-14 w-14 rounded-full border border-slate-100 bg-white object-contain p-2" />
                  <div>
                    <p className="font-semibold text-slate-900">{university.name}</p>
                    <p className="text-sm text-slate-500">{university.rank}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">{university.about}</p>
                <a
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20"
                  href={university.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Website
                </a>
              </div>

              <button
                type="button"
                className="w-full rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
                onClick={() => navigate('/scholarships')}
              >
                Back to all scholarships
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipDetails;
