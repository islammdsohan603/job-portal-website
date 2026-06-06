import Link from 'next/link';
import React from 'react';
import CompanyLogo from './CompanyLogo';

const CompanyCard = ({ company }) => {
  const { _id, name, logo, website } = company;

  return (
    <div className="group bg-slate-50 dark:bg-[#111118] border border-black/10 dark:border-white/10 rounded-2xl p-5 hover:border-orange-500/40 hover:-translate-y-2 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <CompanyLogo name={name} logo={logo} website={website} />

        <div>
          <h2 className="text-slate-900 dark:text-white font-bold text-lg">{name}</h2>
        </div>
      </div>

      <Link href={`/details/${_id}`}>
        <button className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition-all">
          View Company
        </button>
      </Link>
    </div>
  );
};

export default CompanyCard;
