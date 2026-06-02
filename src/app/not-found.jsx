'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6">
      <div className="max-w-lg text-center">
        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-white">404</h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-400 text-lg">
          Sorry, the page you are looking for doesn t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300"
          >
            <Home size={18} />
            Back Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-medium transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Decorative Circle */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
