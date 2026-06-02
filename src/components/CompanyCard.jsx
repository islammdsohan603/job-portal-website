import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CompanyCard = ({ company }) => {
  const { _id, companyName, hiringStatus, companyLogo } = company;

  return (
    <div className="group bg-[#111118] border border-white/10 rounded-2xl p-5 hover:border-orange-500/40 hover:-translate-y-2 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={companyLogo}
          alt={companyName}
          width={60}
          height={60}
          className="rounded-xl bg-white p-2"
        />

        <div>
          <h2 className="text-white font-bold text-lg">{companyName}</h2>

          <p className="text-gray-400 text-sm">{hiringStatus}</p>
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
