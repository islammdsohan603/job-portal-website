import { MapPin, Star, Building2, Users } from 'lucide-react';
import Link from 'next/link';
import CompanyLogo from './CompanyLogo';

const JobCards = ({ data }) => {
  const { name, logo, website, industry, location, founded, rating, employees, _id } =
    data;

  return (
    <div className="group bg-[#111118] border border-white/10 rounded-2xl p-5 hover:border-orange-500/40 hover:-translate-y-2 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <CompanyLogo name={name} logo={logo} website={website} />

        <div>
          <h2 className="text-white font-bold text-lg">{name}</h2>

          <p className="text-gray-400 text-sm">{industry}</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          <MapPin size={16} />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <Building2 size={16} />
          <span>Founded {founded}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <Users size={16} />
          <span>{employees?.toLocaleString()} Employees</span>
        </div>

        <div className="flex items-center gap-2 text-yellow-400">
          <Star size={16} fill="currentColor" />
          <span>{rating}</span>
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

export default JobCards;
