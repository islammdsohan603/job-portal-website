'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Form, Input } from '@heroui/react';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const credentials = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: credentials.email,
      password: credentials.password,
    });

    try {
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
    <section className="relative min-h-screen overflow-hidden bg-black px-4 py-28 text-white">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-25"
        style={{ backgroundImage: "url('/globe.png')" }}
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute left-1/2 top-12 h-[420px] w-[min(90vw,640px)] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-violet-600/10 blur-[100px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-14rem)] w-full max-w-md items-center">
        <div className="w-full rounded-2xl border border-white/10 bg-[#0f0f14]/80 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-blue-400">
              <LockKeyhole size={22} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Sign In
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Welcome back! Sign in to your account
            </p>
          </div>

          <Form onSubmit={handleSubmit} className="flex w-full flex-col gap-5 text-zinc-300">
            <div className="flex w-full flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                required
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-500 outline-none transition hover:border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
              />
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-zinc-300">
                Password
              </label>
              <div className="relative flex w-full items-center">
                <input
                  required
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-3 pr-10 text-white placeholder-zinc-500 outline-none transition hover:border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
                />
                <button
                  type="button"
                  className="absolute right-3 text-zinc-400 hover:text-zinc-300 focus:outline-none"
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
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              HireLoop
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-medium text-violet-400 no-underline transition hover:text-violet-300"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
