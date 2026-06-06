'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Form, Input } from '@heroui/react';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SocialSignUp from '@/components/SocialSignUp';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const credentials = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
      });

      if (data) {
        toast.success('Logged in successfully!');
        router.push('/');
      } else {
        toast.error(error?.message || 'Unable to sign in.');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-4 py-28 text-slate-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-10 dark:opacity-25"
        style={{ backgroundImage: "url('/globe.png')" }}
      />
      <div className="absolute inset-0 bg-white/80 dark:bg-black/75" />
      <div className="absolute left-1/2 top-12 h-[420px] w-[min(90vw,640px)] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-600/20" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-14rem)] w-full max-w-md items-center">
        <div className="w-full rounded-2xl border border-black/10 bg-slate-50/90 p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0f0f14]/80 dark:shadow-black/40 sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-blue-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-blue-400">
              <LockKeyhole size={22} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sign In
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">
              Welcome back! Sign in to your account
            </p>
          </div>

          <Form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-5 text-slate-700 dark:text-zinc-300"
          >
            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700 dark:text-zinc-300"
              >
                Email
              </label>
              <input
                required
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                className="w-full rounded-lg border border-black/10 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-black/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-zinc-500 dark:hover:border-white/20"
              />
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700 dark:text-zinc-300"
              >
                Password
              </label>
              <div className="relative flex w-full items-center">
                <input
                  required
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-lg border border-black/10 bg-white p-3 pr-10 text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-black/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-zinc-500 dark:hover:border-white/20"
                />
                <button
                  type="button"
                  className="absolute right-3 text-slate-500 hover:text-slate-700 focus:outline-none dark:text-zinc-400 dark:hover:text-zinc-300"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              className="mt-2 h-12 w-full bg-blue-600 font-semibold text-white rounded-lg shadow-lg shadow-blue-950/30 transition hover:bg-blue-700"
              isDisabled={loading}
              isLoading={loading}
              radius="lg"
              type="submit"
            >
              Sign In
            </Button>
          </Form>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-600">
              HireLoop
            </span>
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-medium text-violet-600 no-underline transition hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <SocialSignUp />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
