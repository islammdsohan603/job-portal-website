import Link from 'next/link';
import { CircleX, RefreshCw } from 'lucide-react';

export const metadata = {
  title: 'Payment Cancelled | HireLoop',
  description: 'Your payment checkout was cancelled.',
};

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0B0F] px-4 py-28 text-slate-900 dark:text-white transition-colors duration-300">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center rounded-3xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#111118] p-8 text-center shadow-2xl shadow-black/5 dark:shadow-black/30 md:p-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-300">
          <CircleX size={34} />
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
          Payment cancelled
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-zinc-400">
          Your checkout was cancelled before payment. You can return to pricing
          and try again whenever you are ready.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/#pricing"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black px-5 text-sm font-bold transition-transform hover:scale-[1.02]"
          >
            <RefreshCw size={18} />
            Try again
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 px-5 text-sm font-bold text-slate-800 dark:text-white transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}
