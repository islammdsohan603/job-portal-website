'use client';

import { useState } from 'react';
import { Link, Button, Avatar } from '@heroui/react';

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // demo user
  const user = true;

  const navLinks = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Find Jobs',
      href: '/jobs',
    },
    {
      name: 'Companies',
      href: '/companies',
    },
    {
      name: 'Recruiters',
      href: '/recruiters',
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-200 bg-background/70 backdrop-blur-xl">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white font-bold text-xl">
              H
            </div>

            <div>
              <h1 className="text-lg font-bold leading-none">HireHub</h1>
            </div>
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map(item => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-medium text-default-600 transition hover:text-primary"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <div className="flex items-center gap-3">
              <Button
                as={Link}
                href="/post-job"
                color="primary"
                variant="flat"
                radius="full"
              >
                Post Job
              </Button>

              <Avatar
                isBordered
                color="primary"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </div>
          ) : (
            <>
              <Link href="/login">Login</Link>

              <Button color="primary" radius="full">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-default-200 bg-background md:hidden">
          <ul className="flex flex-col gap-1 p-4">
            {navLinks.map(item => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-2 font-medium text-default-700 transition hover:bg-default-100 hover:text-primary"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <div className="mt-4 border-t border-default-200 pt-4">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <Link href="/login" className="block px-3 py-2">
                    Login
                  </Link>

                  <Button color="primary" className="w-full">
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button color="primary" variant="flat" className="w-full">
                    Post Job
                  </Button>

                  <Button color="danger" variant="light" className="w-full">
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
