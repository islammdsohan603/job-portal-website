'use client';

import { useEffect, useState } from 'react';
import {
  CalendarClock,
  Fingerprint,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const formatDate = value => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const getProfileImage = user =>
  user?.image || user?.picture || user?.avatar || user?.photoURL || null;

const UserAvatar = ({ name, image }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const initial = name?.charAt(0)?.toUpperCase() || 'U';
  const shouldShowImage = image && !imageFailed;

  return (
    <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-500/20 text-4xl font-bold text-violet-600 dark:text-violet-100 ring-4 ring-black/10 dark:ring-white/10">
      {shouldShowImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
};

const DetailRow = ({ icon: Icon, label, value }) => {
  if (!value) return null;

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-5 transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.06]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-300">
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-zinc-500">
          {label}
        </p>
        <p className="mt-1 break-words text-base font-medium text-slate-800 dark:text-zinc-100">
          {value}
        </p>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="min-h-screen bg-white dark:bg-[#0B0B0F] px-4 py-28 transition-colors duration-300">
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#111118]/80 p-6 shadow-2xl shadow-black/5 dark:shadow-black/30 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="h-28 w-28 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
          <div className="flex-1 space-y-4">
            <div className="h-7 w-48 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            <div className="h-5 w-72 max-w-full animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            <div className="h-10 w-36 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map(item => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03]"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MyProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace('/login');
    }
  }, [isPending, router, user]);

  if (isPending || !user) {
    return <ProfileSkeleton />;
  }

  const displayName = user.name || 'User';
  const profileImage = getProfileImage(user);
  const createdAt = formatDate(user.createdAt);
  const updatedAt = formatDate(user.updatedAt);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0B0F] px-4 py-28 text-slate-800 dark:text-white transition-colors duration-300">
      <section className="mx-auto w-full max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#111118]/90 p-6 shadow-2xl shadow-black/5 dark:shadow-black/30 md:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <UserAvatar
                key={profileImage || displayName}
                name={displayName}
                image={profileImage}
              />

              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-700 dark:text-violet-200">
                  <ShieldCheck size={16} />
                  My Profile
                </div>
                <h1 className="break-words text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                  {displayName}
                </h1>
                {user.email && (
                  <p className="mt-3 break-words text-base text-slate-650 dark:text-zinc-400 md:text-lg">
                    {user.email}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-orange-400/20 bg-orange-500/10 px-5 py-4 text-orange-700 dark:text-orange-100">
              <div className="flex items-center gap-3">
                <Sparkles size={20} className="text-orange-500 dark:text-orange-300" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-200/70">
                    Account
                  </p>
                  <p className="text-sm font-semibold">Profile details</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 h-px bg-black/10 dark:bg-white/10" />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <DetailRow icon={UserRound} label="Full Name" value={user.name} />
            <DetailRow icon={Mail} label="Email Address" value={user.email} />
            <DetailRow
              icon={Fingerprint}
              label="User ID"
              value={user.id || user._id}
            />
            <DetailRow
              icon={CalendarClock}
              label="Joined"
              value={createdAt}
            />
            <DetailRow
              icon={CalendarClock}
              label="Last Updated"
              value={updatedAt}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyProfilePage;
