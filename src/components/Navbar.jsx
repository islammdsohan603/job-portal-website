'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Avatar, Tooltip } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code } from '@gravity-ui/icons';
import Image from 'next/image';

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user = false;  

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Browse Jobs', href: '/jobs' },
    { name: 'Company', href: '/company' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 border-none outline-none ${
        scrolled 
          ? 'bg-[#0a0a0a] backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <header className=" w-10/12 mx-auto flex items-center justify-between px-6">
        {/* LEFT: Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group outline-none border-none">
            <div className="relative">
               <Image src={'/logo.png'} alt='logo' width={140} height={40} className='object-contain transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.3)] w-auto h-8 md:h-10' priority />
            </div>
          </Link>
        </div>

        {/* CENTER & RIGHT: Desktop Navigation & Auth */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 bg-[#1a1a1a] px-2 py-2 rounded-full border border-white/5 ">
          <ul className="flex items-center px-4 gap-1 lg:gap-2">
            {navLinks.map(item => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="relative px-4 py-2 text-[14px] font-medium text-zinc-300 transition-all duration-300 hover:text-white hover:bg-white/10 rounded-full border-none outline-none no-underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="w-px h-5 bg-white/10"></div>

          <div className="flex items-center gap-2 pr-2">
            <Link
              href="/login"
              className="px-4 py-2 text-[14px] font-semibold text-violet-400 hover:text-violet-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] border-none outline-none no-underline"
            >
              Sign In
            </Link>
            <Button
              className="bg-linear-to-r from-zinc-100 to-white text-black font-semibold px-6 h-10 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] border-none outline-none"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* RIGHT: Mobile Toggle */}
        <button
          className="md:hidden p-3 rounded-full text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all active:scale-95 border-none outline-none shadow-inner"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span
              className={`w-full h-[2px] rounded-full bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
            />
            <span
              className={`w-full h-[2px] rounded-full bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`w-full h-[2px] rounded-full bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
            />
          </div>
        </button>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-3xl md:hidden overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
          >
            <ul className="flex flex-col gap-1 p-6">
              {navLinks.map((item, i) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-2xl px-5 py-4 text-base font-medium text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white hover:translate-x-2 border-none outline-none no-underline"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex flex-col gap-3"
              >
                <Button
                  as={Link}
                  href="/login"
                  className="w-full bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 font-semibold h-14 rounded-2xl transition-all duration-300 border-none outline-none shadow-inner"
                >
                  Sign In
                </Button>
                <Button
                  className="w-full bg-linear-to-r from-zinc-100 to-white text-black font-semibold h-14 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 border-none outline-none hover:scale-[1.02]"
                >
                  Get Started
                </Button>
              </motion.div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

