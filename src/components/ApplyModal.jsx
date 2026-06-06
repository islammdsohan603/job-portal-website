'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Link as LinkIcon,
  Loader2,
  Mail,
  Phone,
  Send,
  User,
  X,
} from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 outline-none transition-all focus:border-orange-500 focus:bg-black/[0.08] dark:focus:bg-white/[0.07] focus:ring-2 focus:ring-orange-500/20';

const labelClass = 'mb-2 block text-sm font-medium text-slate-700 dark:text-gray-300';

const ApplyModal = ({ jobId, jobName, industry, location }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const closeTimerRef = useRef(null);

  const openModal = () => {
    setError('');
    setSuccess(false);
    setIsOpen(true);
  };

  const closeModal = useCallback(() => {
    if (loading) return;
    setIsOpen(false);
    setError('');
    setSuccess(false);
  }, [loading]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:5000/job-seeker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateName: formData.name,
          email: formData.email,
          phone: formData.phone,
          currentRole: formData.currentRole,
          expectedSalary: formData.expectedSalary,
          availability: formData.availability,
          resumeUrl: formData.resumeUrl,
          portfolioUrl: formData.portfolioUrl,
          message: formData.message,
          jobId: jobId,
          jobName: jobName,
          industry: industry,
          location: location,
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccess(true);
      setFormData(initialFormData);
      closeTimerRef.current = window.setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (err) {
      setError('Failed to submit application. Please try again later.');
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="w-full rounded-xl bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-orange-600 active:translate-y-0 md:w-auto"
      >
        Apply Now
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
          onMouseDown={closeModal}
          role="presentation"
        >
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111118] shadow-2xl shadow-black/10 dark:shadow-black/40"
            onMouseDown={event => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-modal-title"
          >
            <div className="flex items-start justify-between gap-4 border-b border-black/10 dark:border-white/10 p-5 md:p-6">
              <div className="flex gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-500">
                  <BriefcaseBusiness size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-500">
                    Job application
                  </p>
                  <h2
                    id="apply-modal-title"
                    className="mt-1 text-2xl font-bold text-slate-900 dark:text-white"
                  >
                    Apply for {jobName || 'this job'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                    {industry || 'Share your details'}{' '}
                    {location ? `- ${location}` : ''}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                className="rounded-lg p-2 text-slate-500 dark:text-gray-400 transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close application form"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-h-[calc(92vh-92px)] overflow-y-auto p-5 md:p-6"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full name <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
                    />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email address <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone number <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
                    />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1XXX XXXXXX"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="currentRole" className={labelClass}>
                    Current role/company
                  </label>
                  <input
                    id="currentRole"
                    name="currentRole"
                    type="text"
                    value={formData.currentRole}
                    onChange={handleChange}
                    placeholder="Frontend Developer at Company"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="expectedSalary" className={labelClass}>
                    Expected salary
                  </label>
                  <input
                    id="expectedSalary"
                    name="expectedSalary"
                    type="text"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    placeholder="Example: 60,000 BDT"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="availability" className={labelClass}>
                    Availability
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className={`${inputClass} text-slate-800 dark:text-white bg-white dark:bg-[#111118]`}
                  >
                    <option className="bg-white dark:bg-[#111118] text-slate-850 dark:text-white" value="">
                      Select availability
                    </option>
                    <option className="bg-white dark:bg-[#111118] text-slate-850 dark:text-white" value="Immediately">
                      Immediately
                    </option>
                    <option className="bg-white dark:bg-[#111118] text-slate-850 dark:text-white" value="Within 2 weeks">
                      Within 2 weeks
                    </option>
                    <option className="bg-white dark:bg-[#111118] text-slate-850 dark:text-white" value="Within 1 month">
                      Within 1 month
                    </option>
                    <option className="bg-white dark:bg-[#111118] text-slate-850 dark:text-white" value="Negotiable">
                      Negotiable
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="resumeUrl" className={labelClass}>
                    Resume/CV URL <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
                    />
                    <input
                      id="resumeUrl"
                      name="resumeUrl"
                      type="url"
                      required
                      value={formData.resumeUrl}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/..."
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="portfolioUrl" className={labelClass}>
                    Portfolio/LinkedIn URL
                  </label>
                  <div className="relative">
                    <LinkIcon
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
                    />
                    <input
                      id="portfolioUrl"
                      name="portfolioUrl"
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="message" className={labelClass}>
                  Cover message <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Briefly tell the hiring team why you are a strong fit..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {(error || success) && (
                <div
                  className={`mt-5 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                    success
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                      : 'border-red-500/30 bg-red-500/10 text-red-650 dark:text-red-300'
                  }`}
                >
                  {success && <CheckCircle2 size={18} />}
                  <span>
                    {success ? 'Application submitted successfully.' : error}
                  </span>
                </div>
              )}

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-black/10 dark:border-white/10 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="rounded-xl border border-black/10 dark:border-white/10 px-5 py-3 font-semibold text-slate-650 dark:text-gray-300 transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  currentRole: '',
  expectedSalary: '',
  availability: '',
  resumeUrl: '',
  portfolioUrl: '',
  message: '',
};

export default ApplyModal;
