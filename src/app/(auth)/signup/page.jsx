'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Form } from '@heroui/react';
import { Eye, EyeSlash, Check, TriangleExclamation } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault(); // পেজ রিলোড বন্ধ করার জন্য
    setLoading(true);
    setError('');
    setSuccess('');

    // ফর্ম থেকে ডেটা সংগ্রহের সঠিক নিয়ম
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      password: userData.password,
      email: userData.email,
    });

    try {
      if (data) {
        setSuccess('Account created successfully!');
        router.push('/login');
      } else {
        alert(`${error}`);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      {/* glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/20 blur-3xl rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        {/* card */}
        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400 mt-3 text-sm">
              Join the platform and start your journey
            </p>
          </div>

          {/* success message */}
          {success && (
            <div className="mb-5 flex items-center gap-2 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              <Check className="w-4 h-4" />
              {success}
            </div>
          )}

          {/* error message */}
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <TriangleExclamation className="w-4 h-4" />
              {error}
            </div>
          )}

          {/* form */}
          <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* name */}
            <Input
              name="name"
              type="text"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter your name"
              autoComplete="name" // DOM warning সমাধান
              radius="lg"
              variant="bordered"
              isRequired
              classNames={{
                label: 'text-gray-300 mb-2',
                input: 'text-white placeholder:text-gray-500',
                inputWrapper: 'bg-white/[0.03] border border-white/10 h-14',
              }}
            />

            {/* email */}
            <Input
              name="email"
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder="john@example.com"
              autoComplete="email" // DOM warning সমাধান
              radius="lg"
              variant="bordered"
              isRequired
              classNames={{
                label: 'text-gray-300 mb-2',
                input: 'text-white placeholder:text-gray-500',
                inputWrapper: 'bg-white/[0.03] border border-white/10 h-14',
              }}
            />

            {/* password */}
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              autoComplete="new-password" // DOM warning সমাধান
              radius="lg"
              variant="bordered"
              isRequired
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-white transition focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlash className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              }
              classNames={{
                label: 'text-gray-300 mb-2',
                input: 'text-white placeholder:text-gray-500',
                inputWrapper: 'bg-white/[0.03] border border-white/10 h-14',
              }}
            />

            <p className="text-xs text-gray-500 -mt-2">
              Password must contain 8 characters, one uppercase and one number
            </p>

            <Button
              type="submit"
              isLoading={loading}
              radius="full"
              className="w-full h-14 bg-white text-black font-semibold text-base mt-2 hover:scale-[1.02] transition-all duration-300"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-violet-400 hover:text-violet-300 font-medium transition no-underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
