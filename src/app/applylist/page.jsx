import ApplyListCard from '@/components/ApplyListCard';
import { getApplyListData } from '@/db/data';
import Link from 'next/link';
import React from 'react';

const ApplyListPage = async () => {
  const data = await getApplyListData();

  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-white px-4 py-28 transition-colors duration-300 dark:bg-[#0B0B0F] md:px-8">
        <div className="w-10/12 mx-auto">
          <h2 className="mb-12 text-center text-4xl font-bold text-slate-900 dark:text-white md:text-6xl">
            My Applications
          </h2>

          <p className="text-center text-lg text-slate-600 dark:text-gray-400">
            You haven&apos;t applied to any jobs yet.
          </p>
          <Link
            href="/browsejobs"
            className="block w-max mx-auto mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-medium transition-all"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-28 transition-colors duration-300 dark:bg-[#0B0B0F] md:px-8">
      <div className="w-10/12 mx-auto">
        <h2 className="mb-12 text-center text-4xl font-bold text-slate-900 dark:text-white md:text-6xl">
          My Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map(application => (
            <ApplyListCard key={application._id} application={application} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplyListPage;
