import React from 'react';

const stories = [
    {
        id: 1,
        name: 'Joan Santons',
        country: 'Australia',
        quote: 'Thanks to ScholarStream I got my bachelor scholarship!',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 2,
        name: 'Fain Errauberg',
        country: 'Australia',
        quote: 'Thanks to ScholarStream I got my bachelor scholarship!',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 3,
        name: 'Anbea Catter',
        country: 'Australia',
        quote: 'Thanks to ScholarStream I got my bachelor scholarship!',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80'
    }
];

const SuccessStory = () => {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Success Stories</h2>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {stories.map((story) => (
                        <article
                            key={story.id}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <img src={story.avatar} alt={story.name} className="h-14 w-14 rounded-full object-cover" />
                                <div>
                                    <p className="text-lg font-semibold text-slate-900">{story.name}</p>
                                    <p className="text-sm text-[#1C4E94]">{story.country}</p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-slate-600">{story.quote}</p>
                            <div className="mt-5 flex gap-1 text-[#F5A524]">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <svg
                                        key={idx}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path d="m12 2 3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.77 5.82 21l1.18-6.87-5-4.87 6.91-1z" />
                                    </svg>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStory;
