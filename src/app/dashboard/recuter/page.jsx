'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  Filter,
  LayoutDashboard,
  Mail,
  MapPin,
  MessageSquareText,
  Plus,
  Search,
  Send,
  Sparkles,
  Star,
  UsersRound,
  Video,
} from 'lucide-react';

const initialJobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    department: 'Product Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$95k - $125k',
    applicants: 42,
    interviews: 8,
    status: 'Active',
    posted: '2 days ago',
  },
  {
    id: 2,
    title: 'Product Designer',
    department: 'Design',
    location: 'New York',
    type: 'Contract',
    salary: '$70/hr',
    applicants: 28,
    interviews: 5,
    status: 'Active',
    posted: '5 days ago',
  },
  {
    id: 3,
    title: 'Growth Marketing Lead',
    department: 'Marketing',
    location: 'Austin',
    type: 'Full-time',
    salary: '$88k - $110k',
    applicants: 19,
    interviews: 3,
    status: 'Paused',
    posted: '1 week ago',
  },
];

const initialApplicants = [
  {
    id: 1,
    name: 'Avery Johnson',
    role: 'Senior Frontend Engineer',
    location: 'Seattle, WA',
    stage: 'New',
    rating: 4.7,
    experience: '6 years',
    email: 'avery@example.com',
    note: 'React, accessibility, design systems',
    shortlisted: true,
  },
  {
    id: 2,
    name: 'Maya Chen',
    role: 'Product Designer',
    location: 'Brooklyn, NY',
    stage: 'Interview',
    rating: 4.9,
    experience: '8 years',
    email: 'maya@example.com',
    note: 'Strong portfolio and research background',
    shortlisted: true,
  },
  {
    id: 3,
    name: 'Liam Carter',
    role: 'Growth Marketing Lead',
    location: 'Austin, TX',
    stage: 'Reviewed',
    rating: 4.3,
    experience: '5 years',
    email: 'liam@example.com',
    note: 'Performance marketing and lifecycle campaigns',
    shortlisted: false,
  },
  {
    id: 4,
    name: 'Nora Patel',
    role: 'Senior Frontend Engineer',
    location: 'Remote',
    stage: 'Hired',
    rating: 5,
    experience: '9 years',
    email: 'nora@example.com',
    note: 'Accepted offer for platform team',
    shortlisted: true,
  },
];

const interviews = [
  {
    id: 1,
    candidate: 'Maya Chen',
    role: 'Product Designer',
    time: 'Today, 2:30 PM',
    format: 'Video call',
    interviewer: 'Design Lead',
  },
  {
    id: 2,
    candidate: 'Avery Johnson',
    role: 'Senior Frontend Engineer',
    time: 'Tomorrow, 11:00 AM',
    format: 'Technical screen',
    interviewer: 'Frontend Team',
  },
  {
    id: 3,
    candidate: 'Liam Carter',
    role: 'Growth Marketing Lead',
    time: 'Fri, 4:00 PM',
    format: 'Panel review',
    interviewer: 'Marketing Ops',
  },
];

const activity = [
  'Maya Chen moved to Interview',
  'Senior Frontend Engineer received 6 new applicants',
  'Nora Patel marked as Hired',
  'Product Designer interview scheduled for today',
];

const stages = ['New', 'Reviewed', 'Interview', 'Hired', 'Rejected'];
const filters = ['All', 'Active', 'Paused', 'Closed'];

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'jobs', label: 'Jobs', icon: BriefcaseBusiness },
  { id: 'applicants', label: 'Applicants', icon: UsersRound },
  { id: 'interviews', label: 'Interviews', icon: CalendarClock },
];

const statusStyles = {
  Active: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  Paused: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
  Closed: 'border-zinc-400/20 bg-zinc-500/10 text-zinc-300',
  New: 'border-sky-400/30 bg-sky-500/10 text-sky-200',
  Reviewed: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
  Interview: 'border-orange-400/30 bg-orange-500/10 text-orange-200',
  Hired: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  Rejected: 'border-rose-400/30 bg-rose-500/10 text-rose-200',
};

const emptyJob = {
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  salary: '',
};

const StatCard = ({ icon: Icon, label, value, hint, tone }) => (
  <article className="rounded-2xl border border-white/10 bg-[#111118] p-5 shadow-xl shadow-black/20">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-zinc-400">{label}</p>
        <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      </div>
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}
      >
        <Icon size={21} />
      </div>
    </div>
    <p className="mt-4 text-sm text-zinc-500">{hint}</p>
  </article>
);

const SectionHeader = ({ eyebrow, title, action }) => (
  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-2xl font-bold text-white">{title}</h2>
    </div>
    {action}
  </div>
);

const Pill = ({ children, tone = 'Closed' }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[tone]}`}
  >
    {children}
  </span>
);

export default function RecruiterPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs, setJobs] = useState(initialJobs);
  const [applicants, setApplicants] = useState(initialApplicants);
  const [jobFilter, setJobFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [newJob, setNewJob] = useState(emptyJob);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch applications from API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/applications');
        if (response.ok) {
          const data = await response.json();
          const applicationsData = data.applications || [];

          // Transform applications to applicants format
          const transformedApplicants = applicationsData.map((app, index) => ({
            id: index + 1,
            name: app.applicant.name,
            role: app.job.name || 'Unknown Role',
            location: app.job.location || 'Unknown',
            stage: app.status === 'new' ? 'New' : 'Reviewed',
            rating: 4 + Math.random() * 1,
            experience: '5 years',
            email: app.applicant.email,
            note: app.applicant.message.substring(0, 50) + '...',
            shortlisted: false,
          }));

          setApplicants(transformedApplicants);

          // Group applications by job to create dynamic jobs
          const jobMap = new Map();
          applicationsData.forEach(app => {
            const jobKey = app.job.name || 'Unknown Job';
            if (!jobMap.has(jobKey)) {
              jobMap.set(jobKey, {
                name: jobKey,
                location: app.job.location || 'Unknown',
                applicantCount: 0,
                interviewCount: 0,
              });
            }
            jobMap.get(jobKey).applicantCount += 1;
          });

          // Create dynamic jobs from grouped applications
          const dynamicJobs = Array.from(jobMap.values()).map((job, index) => ({
            id: index + 1,
            title: job.name,
            department: 'Engineering',
            location: job.location,
            type: 'Full-time',
            salary: 'Competitive',
            applicants: job.applicantCount,
            interviews: Math.floor(job.applicantCount * 0.3),
            status: 'Active',
            posted: '2 days ago',
          }));

          if (dynamicJobs.length > 0) {
            setJobs(dynamicJobs);
          }
        }
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredJobs = useMemo(() => {
    const search = query.trim().toLowerCase();

    return jobs.filter(job => {
      const matchesFilter = jobFilter === 'All' || job.status === jobFilter;
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search) ||
        job.department.toLowerCase().includes(search) ||
        job.location.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [jobFilter, jobs, query]);

  const metrics = useMemo(() => {
    const activeJobs = jobs.filter(job => job.status === 'Active').length;
    const totalApplicants = applicants.length;
    const hired = applicants.filter(person => person.stage === 'Hired').length;
    const interviewCount = applicants.filter(
      person => person.stage === 'Interview',
    ).length;

    return {
      activeJobs,
      totalApplicants,
      interviews: interviewCount,
      hired,
    };
  }, [applicants, jobs]);

  const updateApplicantStage = (id, stage) => {
    setApplicants(current =>
      current.map(person => (person.id === id ? { ...person, stage } : person)),
    );
  };

  const toggleJobStatus = id => {
    setJobs(current =>
      current.map(job =>
        job.id === id
          ? { ...job, status: job.status === 'Active' ? 'Paused' : 'Active' }
          : job,
      ),
    );
  };

  const handleJobSubmit = event => {
    event.preventDefault();

    const trimmedTitle = newJob.title.trim();
    const trimmedDepartment = newJob.department.trim();
    const trimmedLocation = newJob.location.trim();

    if (!trimmedTitle || !trimmedDepartment || !trimmedLocation) return;

    setJobs(current => [
      {
        id: Date.now(),
        title: trimmedTitle,
        department: trimmedDepartment,
        location: trimmedLocation,
        type: newJob.type,
        salary: newJob.salary.trim() || 'Competitive',
        applicants: 0,
        interviews: 0,
        status: 'Active',
        posted: 'Just now',
      },
      ...current,
    ]);
    setNewJob(emptyJob);
    setActiveTab('jobs');
  };

  return (
    <main className="min-h-screen bg-[#0B0B0F] px-4 py-28 text-white md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row">
        <aside className="lg:sticky lg:top-28 lg:h-fit lg:w-64">
          <div className="rounded-2xl border border-white/10 bg-[#111118]/90 p-4 shadow-2xl shadow-black/30">
            <div className="mb-5 flex items-center gap-3 rounded-xl bg-white/[0.04] p-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-200">
                <Building2 size={22} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  HireLoop Recruit
                </p>
                <p className="text-xs text-zinc-500">Workspace</p>
              </div>
            </div>

            <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex min-w-max items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all lg:min-w-0 ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-950/30'
                        : 'text-zinc-400 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#111118] p-6 shadow-2xl shadow-black/30 md:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-100">
                  <Sparkles size={16} />
                  Recruiter dashboard
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                  Manage hiring from one responsive workspace
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
                  Track open roles, review candidates, schedule interviews, and
                  publish new opportunities with fast front-end interactions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('jobs')}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
              >
                <Plus size={18} />
                Post a job
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl border border-white/10 bg-[#111118] p-5 shadow-xl shadow-black/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-full">
                      <div className="h-4 w-20 rounded bg-white/10" />
                      <div className="mt-2 h-8 w-16 rounded bg-white/10" />
                    </div>
                    <div className="h-11 w-11 rounded-xl bg-white/10" />
                  </div>
                  <div className="mt-4 h-4 w-32 rounded bg-white/10" />
                </div>
              ))
            ) : (
              <>
                <StatCard
                  icon={BriefcaseBusiness}
                  label="Active jobs"
                  value={metrics.activeJobs}
                  hint="Live openings across teams"
                  tone="bg-orange-500/15 text-orange-200"
                />
                <StatCard
                  icon={UsersRound}
                  label="Applicants"
                  value={metrics.totalApplicants}
                  hint="Candidates in the pipeline"
                  tone="bg-sky-500/15 text-sky-200"
                />
                <StatCard
                  icon={CalendarClock}
                  label="Interviews"
                  value={metrics.interviews}
                  hint="Upcoming scheduled sessions"
                  tone="bg-violet-500/15 text-violet-200"
                />
                <StatCard
                  icon={BadgeCheck}
                  label="Hired"
                  value={metrics.hired}
                  hint="Accepted candidates this cycle"
                  tone="bg-emerald-500/15 text-emerald-200"
                />
              </>
            )}
          </div>

          {(activeTab === 'overview' || activeTab === 'jobs') && (
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
              <section className="rounded-2xl border border-white/10 bg-[#111118] p-5 shadow-xl shadow-black/20 md:p-6">
                <SectionHeader
                  eyebrow="Open roles"
                  title="Job management"
                  action={
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <label className="relative block">
                        <Search
                          size={17}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                        />
                        <input
                          value={query}
                          onChange={event => setQuery(event.target.value)}
                          placeholder="Search jobs"
                          className="h-11 w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-orange-400/60 sm:w-56"
                        />
                      </label>
                      <label className="relative block">
                        <Filter
                          size={17}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                        />
                        <select
                          value={jobFilter}
                          onChange={event => setJobFilter(event.target.value)}
                          className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-black/20 pl-10 pr-8 text-sm text-white outline-none transition-colors focus:border-orange-400/60 sm:w-36"
                        >
                          {filters.map(filter => (
                            <option key={filter} value={filter}>
                              {filter}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  }
                />

                <div className="space-y-4">
                  {filteredJobs.map(job => (
                    <article
                      key={job.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-orange-400/40"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-bold text-white">
                              {job.title}
                            </h3>
                            <Pill tone={job.status}>{job.status}</Pill>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-400">
                            <span className="inline-flex items-center gap-1.5">
                              <Building2 size={15} />
                              {job.department}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin size={15} />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <CircleDollarSign size={15} />
                              {job.salary}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleJobStatus(job.id)}
                          className="h-10 rounded-xl border border-white/10 px-4 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/10"
                        >
                          {job.status === 'Active' ? 'Pause' : 'Activate'}
                        </button>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                        <div className="rounded-xl bg-black/20 p-3">
                          <p className="text-zinc-500">Applicants</p>
                          <p className="mt-1 font-bold text-white">
                            {job.applicants}
                          </p>
                        </div>
                        <div className="rounded-xl bg-black/20 p-3">
                          <p className="text-zinc-500">Interviews</p>
                          <p className="mt-1 font-bold text-white">
                            {job.interviews}
                          </p>
                        </div>
                        <div className="rounded-xl bg-black/20 p-3">
                          <p className="text-zinc-500">Posted</p>
                          <p className="mt-1 font-bold text-white">
                            {job.posted}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-[#111118] p-5 shadow-xl shadow-black/20 md:p-6">
                <SectionHeader eyebrow="Create" title="Post a job" />
                <form onSubmit={handleJobSubmit} className="space-y-4">
                  <input
                    value={newJob.title}
                    onChange={event =>
                      setNewJob(current => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Job title"
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-orange-400/60"
                  />
                  <input
                    value={newJob.department}
                    onChange={event =>
                      setNewJob(current => ({
                        ...current,
                        department: event.target.value,
                      }))
                    }
                    placeholder="Department"
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-orange-400/60"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      value={newJob.location}
                      onChange={event =>
                        setNewJob(current => ({
                          ...current,
                          location: event.target.value,
                        }))
                      }
                      placeholder="Location"
                      className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-orange-400/60"
                    />
                    <select
                      value={newJob.type}
                      onChange={event =>
                        setNewJob(current => ({
                          ...current,
                          type: event.target.value,
                        }))
                      }
                      className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none focus:border-orange-400/60"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <input
                    value={newJob.salary}
                    onChange={event =>
                      setNewJob(current => ({
                        ...current,
                        salary: event.target.value,
                      }))
                    }
                    placeholder="Salary range"
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-orange-400/60"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-bold text-white transition-colors hover:bg-orange-600"
                  >
                    <Send size={17} />
                    Publish locally
                  </button>
                </form>
              </section>
            </div>
          )}

          {(activeTab === 'overview' || activeTab === 'applicants') && (
            <section className="mt-6 rounded-2xl border border-white/10 bg-[#111118] p-5 shadow-xl shadow-black/20 md:p-6">
              <SectionHeader eyebrow="Pipeline" title="Applicant review" />
              <div className="grid gap-4 lg:grid-cols-2">
                {applicants.map(person => (
                  <article
                    key={person.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-white">
                            {person.name}
                          </h3>
                          {person.shortlisted && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-200">
                              <Star size={13} fill="currentColor" />
                              Shortlist
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">
                          {person.role}
                        </p>
                      </div>
                      <Pill tone={person.stage}>{person.stage}</Pill>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-zinc-400 sm:grid-cols-2">
                      <span className="inline-flex items-center gap-2">
                        <MapPin size={15} />
                        {person.location}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <BarChart3 size={15} />
                        {person.experience}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Mail size={15} />
                        {person.email}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Star size={15} />
                        {person.rating.toFixed(1)} rating
                      </span>
                    </div>

                    <p className="mt-4 rounded-xl bg-black/20 p-3 text-sm text-zinc-300">
                      {person.note}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {stages.map(stage => (
                        <button
                          key={stage}
                          type="button"
                          onClick={() => updateApplicantStage(person.id, stage)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                            person.stage === stage
                              ? 'bg-white text-black'
                              : 'bg-white/[0.06] text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          {stage}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {(activeTab === 'overview' || activeTab === 'interviews') && (
            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.85fr]">
              <section className="rounded-2xl border border-white/10 bg-[#111118] p-5 shadow-xl shadow-black/20 md:p-6">
                <SectionHeader eyebrow="Schedule" title="Upcoming interviews" />
                <div className="space-y-4">
                  {interviews.map(item => (
                    <article
                      key={item.id}
                      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200">
                          <Video size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">
                            {item.candidate}
                          </h3>
                          <p className="mt-1 text-sm text-zinc-400">
                            {item.role} with {item.interviewer}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-zinc-300 sm:text-right">
                        <p className="inline-flex items-center gap-2 font-semibold text-white">
                          <Clock3 size={15} />
                          {item.time}
                        </p>
                        <p className="mt-1 text-zinc-500">{item.format}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-[#111118] p-5 shadow-xl shadow-black/20 md:p-6">
                <SectionHeader eyebrow="Updates" title="Recent activity" />
                <div className="space-y-3">
                  {activity.map(item => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3 text-sm text-zinc-300"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-200">
                        <CheckCircle2 size={17} />
                      </div>
                      <span className="min-w-0 flex-1">{item}</span>
                      <ChevronRight size={16} className="text-zinc-600" />
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <FileText size={20} className="text-orange-200" />
                    <p className="mt-3 text-sm font-semibold text-white">
                      Offer docs
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      2 drafts ready for review.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <MessageSquareText size={20} className="text-sky-200" />
                    <p className="mt-3 text-sm font-semibold text-white">
                      Team notes
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      5 candidate comments added.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
