'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@heroui/react';

import { motion, AnimatePresence } from 'framer-motion';

import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const getProfileImage = user =>
  user?.image || user?.picture || user?.avatar || user?.photoURL || null;

function UserAvatar({ user, size = 'sm' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const name = user?.name || 'User';
  const image = getProfileImage(user);
  const initial = name.charAt(0).toUpperCase();
  const avatarSize = size === 'md' ? 'h-10 w-10 text-lg' : 'h-8 w-8 text-sm';

  return (
    <div
      className={`${avatarSize} flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-500/20 font-bold text-violet-300 ring-1 ring-white/10`}
    >
      {image && !imageFailed ? (
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
}

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      name: 'Browse Jobs',
      href: '/browsejobs',
    },
    {
      name: 'Company',
      href: '/company',
    },
    {
      name: 'ApplyList',
      href: '/applylist',
    },
  ];

  const { data: sesson, isPending } = authClient.useSession();

  const user = sesson?.user;

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success('Signed out successfully!');
      setIsMenuOpen(false);
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error(error?.message || 'Unable to sign out. Please try again.');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-11/12 max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={40}
            priority
            className="w-auto h-9 md:h-10 object-contain"
          />
        </Link>

        {/* DESKTOP MENU */}
        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 bg-white/[0.03] border border-white/10 px-2 py-2 rounded-full backdrop-blur-xl">
          {/* NAV LINKS */}
          <ul className="flex items-center gap-1">
            {navLinks.map(item => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="px-3 lg:px-5 py-2 rounded-full text-sm lg:text-base font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300 no-underline whitespace-nowrap"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="hidden lg:block w-px h-6 bg-white/10" />

          {/* USER AREA */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link
                  href="/profile"
                  aria-label="Open profile"
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 transition-colors hover:bg-white/10"
                >
                  <UserAvatar user={user} />
                </Link>

                <Link
                  href="/dashboard/recuter"
                  className="hidden md:block px-3 py-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-all duration-300 no-underline whitespace-nowrap"
                >
                  Recruiter
                </Link>

                <Button
                  onClick={handleSignOut}
                  radius="full"
                  className="bg-red-500/10 text-red-400 font-semibold px-3 lg:px-4 h-10 hover:bg-red-500/20 transition-all duration-300 whitespace-nowrap"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-all duration-300 no-underline whitespace-nowrap"
                >
                  Sign In
                </Link>

                <Link href="/signup">
                  <Button
                    radius="full"
                    className="bg-white text-black font-semibold px-4 lg:px-6 h-11 hover:scale-105 transition-all duration-300 whitespace-nowrap"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
        >
          {isMenuOpen ? (
            <HiOutlineX size={24} />
          ) : (
            <HiOutlineMenuAlt3 size={24} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.3,
            }}
            className="md:hidden absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-3xl border-t border-white/10"
          >
            <div className="w-11/12 mx-auto py-6">
              {/* nav links */}
              <ul className="flex flex-col gap-3">
                {navLinks.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300 no-underline"
                    >
                      {item.name}

                      <span className="text-white/30">→</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* buttons */}
              <div className="mt-6 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 bg-white/[0.03] border border-white/5 p-4 rounded-2xl transition-colors hover:bg-white/10 no-underline"
                    >
                      <UserAvatar user={user} size="md" />
                      <div className="flex flex-col">
                        <span className="text-base font-medium text-white">
                          {user.name}
                        </span>
                        <span className="text-xs text-zinc-400">
                          {user.email}
                        </span>
                      </div>
                    </Link>
                    <Link
                      href="/dashboard/recuter"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300 no-underline"
                    >
                      Recruiter Dashboard
                      <span className="text-white/30">→</span>
                    </Link>
                    <Button
                      onClick={handleSignOut}
                      radius="lg"
                      className="w-full h-14 bg-red-500/10 text-red-400 font-semibold hover:bg-red-500/20"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        radius="lg"
                        className="w-full h-14 bg-violet-500/10 text-violet-400 font-semibold hover:bg-violet-500/20"
                      >
                        Sign In
                      </Button>
                    </Link>

                    <Link href={'/signup'}>
                      <Button
                        radius="lg"
                        className="w-full h-14 bg-white text-black font-semibold"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
