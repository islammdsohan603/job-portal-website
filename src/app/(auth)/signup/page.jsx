'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@heroui/react';
import { Eye, EyeOff } from 'lucide-react';

import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import SocialSignUp from '@/components/SocialSignUp';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      password: userData.password,
      email: userData.email,
    });

    try {
      if (data) {
        toast.success('Account created successfully!');
        router.push('/login');
      } else {
        toast.error(error?.message || 'Unable to create account.');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="  relative min-h-screen overflow-hidden bg-[#050816] px-4 py-28 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_30%)]" />
      <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="mb-8 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-300">
              Welcome
            </p>
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="mt-3 text-sm text-gray-400">
              Join the platform and start your journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-gray-300">
            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                required
                id="name"
                name="name"
                placeholder="Enter your name"
                type="text"
                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-500 outline-none transition hover:border-white/20 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50"
              />
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                required
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-500 outline-none transition hover:border-white/20 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50"
              />
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
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
                  minLength={6}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-3 pr-10 text-white placeholder-zinc-500 outline-none transition hover:border-white/20 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50"
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
              type="submit"
              isLoading={loading}
              className="mt-4 h-14 w-full rounded-2xl bg-violet-600 text-white font-semibold shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign In
              </Link>
            </p>
          </div>

          <SocialSignUp />
        </div>
      </div>
    </section>
  );
}
