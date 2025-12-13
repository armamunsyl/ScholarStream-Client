import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const faqData = [
  {
    id: 'faq-1',
    question: 'What is ScholarStream?',
    answer:
      'ScholarStream is a platform where students can search, filter, and apply for scholarships with a clean and organized interface.',
  },
  {
    id: 'faq-2',
    question: 'How can I find scholarships?',
    answer: 'Use the search bar or apply filters such as category, degree, and location on the All Scholarships page.',
  },
  {
    id: 'faq-3',
    question: 'Do I need to pay any application fee?',
    answer:
      'If a university requires an application fee, it is displayed clearly on the scholarship card and details page.',
  },
  {
    id: 'faq-4',
    question: 'What happens after I apply?',
    answer:
      'Your payment is processed and the application status becomes “Pending” until a Moderator reviews it and updates it to “Processing” or “Completed.”',
  },
  {
    id: 'faq-5',
    question: 'How does the payment system work?',
    answer:
      'Payments are handled through Stripe. Successful payments are labeled “paid,” while failed payments remain “unpaid” until retried.',
  },
  {
    id: 'faq-6',
    question: 'Can I edit or delete my application?',
    answer:
      'Yes, while the application is still “Pending.” Once it moves into review stages, editing and deleting are disabled.',
  },
  {
    id: 'faq-7',
    question: 'Who manages the scholarship applications?',
    answer:
      'Moderators review applications and update statuses, while Admins manage scholarships, users, and overall platform data.',
  },
  {
    id: 'faq-8',
    question: 'When can I submit a review?',
    answer: 'Reviews can be submitted only after your application reaches the “Completed” status.',
  },
  {
    id: 'faq-9',
    question: 'Where does the scholarship card information come from?',
    answer:
      'All card information—including university details, location, category, and fees—comes from the Scholarships Collection stored in the database.',
  },
  {
    id: 'faq-10',
    question: 'How do I log in or register?',
    answer:
      'Login requires your email and password. Registration needs your name, email, photo URL, and password. Google Login is also available.',
  },
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-slate-400"
  >
    <polyline points="9 5 16 12 9 19" />
  </svg>
);

const Faq = () => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const columns = [faqData.slice(0, 5), faqData.slice(5)];

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#092867] to-[#0b397f] px-4 py-16 text-slate-900">
      <div className="w-full max-w-5xl rounded-[32px] bg-white p-8 shadow-[0_30px_80px_rgba(10,24,60,0.25)] md:p-12">
        <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          FAQ
        </span>

        <div className="mt-6 space-y-4">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Frequently Asked Questions</h1>
          <p className="max-w-3xl text-base text-slate-500 md:text-lg">
            Quickly find the answers you need about scholarships, applications, and how ScholarStream keeps everything
            organized.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <div key={`column-${columnIndex}`} className="divide-y divide-slate-200">
              {column.map((item) => {
                const isOpen = openItems.includes(item.id);

                return (
                  <div key={item.id} className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="text-base font-semibold text-slate-900 md:text-lg">{item.question}</span>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ArrowIcon />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-sm text-slate-600 md:text-base">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
