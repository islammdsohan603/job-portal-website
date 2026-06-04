import Link from 'next/link';
import { CheckCircle2, LayoutDashboard } from 'lucide-react';

export const metadata = {
  title: 'Payment Successful | HireLoop',
  description: 'Your payment was completed successfully.',
};

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0F] px-4 py-28 text-white">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center rounded-3xl border border-white/10 bg-[#111118] p-8 text-center shadow-2xl shadow-black/30 md:p-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
          <CheckCircle2 size={34} />
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
          Payment successful
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
          Thanks for your order. Your subscription checkout has been completed
          successfully.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/dashboard/recuter"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
          >
            <LayoutDashboard size={18} />
            Go to dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}
