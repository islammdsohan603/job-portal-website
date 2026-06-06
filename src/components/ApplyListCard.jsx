import Link from 'next/link';
import {
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Building2,
  FileText,
  User,
} from 'lucide-react';

const ApplyListCard = ({ application }) => {
  const {
    candidateName,
    email,
    phone,
    currentRole,
    availability,
    resumeUrl,
    message,
    portfolioUrl,
    jobName,
    industry,
    location,
  } = application;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#111118] p-6 shadow-xl transition-all duration-300 hover:border-orange-500/40 hover:shadow-orange-500/5 dark:hover:shadow-orange-500/10">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/20">
          <User className="text-orange-500" size={28} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{candidateName}</h2>
          <p className="text-sm text-slate-500 dark:text-gray-400">Job Applicant</p>
        </div>
      </div>

      {/* Applicant Info */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
          <Mail size={18} className="text-orange-500" />
          <span>{email}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
          <Phone size={18} className="text-orange-500" />
          <span>{phone}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
          <Briefcase size={18} className="text-orange-500" />
          <span>{currentRole || 'Not Provided'}</span>
        </div>
      </div>

      {/* Job Info */}
      <div className="mt-6 rounded-2xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4">
        <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
          Applied Position
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
            <Building2 size={18} className="text-orange-500" />
            <span>{jobName}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
            <Briefcase size={18} className="text-orange-500" />
            <span>{industry}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
            <MapPin size={18} className="text-orange-500" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="mt-4">
        <span className="rounded-full bg-green-500/10 dark:bg-green-500/20 px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400">
          {availability}
        </span>
      </div>

      {/* Message */}
      <div className="mt-6">
        <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">Cover Message</h4>

        <p className="line-clamp-4 text-sm text-slate-600 dark:text-gray-400">{message}</p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 font-medium text-white transition hover:bg-orange-600"
        >
          <FileText size={18} />
          Resume
        </a>

        {portfolioUrl && (
          <Link
            href={portfolioUrl}
            target="_blank"
            className="flex flex-1 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 font-medium text-slate-800 dark:text-white transition hover:bg-black/10 dark:hover:bg-white/10"
          >
            Portfolio
          </Link>
        )}
      </div>
    </div>
  );
};

export default ApplyListCard;
