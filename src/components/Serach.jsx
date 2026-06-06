'use client';

import { MapPin, Search } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Serach = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [jobTitle, setJobTitle] = useState(searchParams.get('jobTitle') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');

  const handleSearch = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');

      if (jobTitle.trim()) {
        params.set('jobTitle', jobTitle.trim());
      } else {
        params.delete('jobTitle');
      }

      if (location.trim()) {
        params.set('location', location.trim());
      } else {
        params.delete('location');
      }

      const query = params.toString();
      router.push(query ? `/browsejobs?${query}` : '/browsejobs');
    });
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-5xl px-4 md:px-0">
      <div className="bg-slate-50/90 dark:bg-[#111118]/80 border border-black/10 dark:border-white/10 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] overflow-hidden">
        <div className="flex items-center w-full h-16 px-5">
          <Search size={20} className="text-slate-400 dark:text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="search"
            placeholder="Job title, keyword, or company"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-500 outline-none border-none text-sm md:text-base"
          />
        </div>

        <div className="hidden md:block w-px h-10 bg-black/10 dark:bg-white/10" />

        <div className="flex items-center w-full h-16 px-5">
          <MapPin size={20} className="text-slate-400 dark:text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="search"
            placeholder="Location or Remote"
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-500 outline-none border-none text-sm md:text-base"
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          aria-label="Search jobs"
          className="m-2 h-12 w-12 min-w-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center shadow-lg shadow-blue-600/20"
        >
          <Search size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Serach;
