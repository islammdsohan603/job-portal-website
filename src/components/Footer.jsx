'use client';

import Image from 'next/image';
import Link from 'next/link';

import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-white/10">
      <div className="w-10/12 mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* left side */}
          <div>
            {/* logo */}
            <div className="flex items-center gap-3">
              <Image src={'/logo.png'} alt="logo" width={100} height={80} />
            </div>

            {/* description */}
            <p className="text-slate-600 dark:text-gray-500 text-sm leading-7 mt-6 max-w-xs">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            {/* social icons */}
            <div className="flex items-center gap-3 mt-10">
              <Link href="#">
                <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-violet-600 hover:text-white group transition-all duration-300">
                  <FaFacebookF size={18} className="text-slate-700 dark:text-white group-hover:text-white transition-colors" />
                </div>
              </Link>

              <Link href="#">
                <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center">
                  <HiLocationMarker size={18} className="text-white" />
                </div>
              </Link>

              <Link href="#">
                <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-violet-600 hover:text-white group transition-all duration-300">
                  <FaLinkedinIn size={18} className="text-slate-700 dark:text-white group-hover:text-white transition-colors" />
                </div>
              </Link>
            </div>
          </div>

          {/* product */}
          <div>
            <h3 className="text-violet-600 dark:text-violet-500 text-sm font-medium mb-6">
              Product
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition"
                >
                  Job discovery
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition"
                >
                  Worker AI
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition"
                >
                  Salary data
                </Link>
              </li>
            </ul>
          </div>

          {/* navigations */}
          <div>
            <h3 className="text-violet-600 dark:text-violet-500 text-sm font-medium mb-6">
              Navigations
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition"
                >
                  Help center
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition"
                >
                  Career library
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* resources */}
          <div>
            <h3 className="text-violet-600 dark:text-violet-500 text-sm font-medium mb-6">
              Resources
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition"
                >
                  Brand Guideline
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom */}
        <div className="border-t border-slate-200 dark:border-white/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 dark:text-gray-500 text-sm">
            Copyright 2024 —Programming Hero
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-slate-600 dark:text-gray-500 text-sm hover:text-slate-900 dark:hover:text-white transition"
            >
              Terms & Policy
            </Link>

            <Link
              href="#"
              className="text-slate-600 dark:text-gray-500 text-sm hover:text-slate-900 dark:hover:text-white transition"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
