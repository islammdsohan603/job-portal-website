'use client';

import { getSingleData } from '@/db/data';
import {
  MapPin,
  Building2,
  Users,
  Star,
  Globe,
  Mail,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import ApplyModal from '@/components/ApplyModal';

const JobDetailsPage = ({ params }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getSingleData(resolvedParams.id);
        setData(result);
      } catch (err) {
        setError('Failed to load job details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center ">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {error || 'Job not found'}
          </h1>
          <button
            onClick={() => router.back()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const {
    _id,
    name,
    logo,
    industry,
    location,
    founded,
    rating,
    employees,
    description,
    website,
    email,
    phone,
  } = data;

  return (
    <div className="  min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a24] to-[#0a0a0f] py-28 px-4 md:px-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-orange-500 mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Jobs</span>
      </button>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#111118] border border-white/10 rounded-3xl p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src={logo}
                alt={name}
                width={120}
                height={120}
                className="rounded-2xl bg-white p-3 object-contain"
              />
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {name}
              </h1>
              <p className="text-orange-500 text-lg font-semibold mb-4">
                {industry}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin size={18} className="text-orange-500" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Building2 size={18} className="text-orange-500" />
                  <span>Founded {founded}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users size={18} className="text-orange-500" />
                  <span>{employees?.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <span className="font-semibold">{rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}

          <ApplyModal
            jobId={_id || resolvedParams.id}
            jobName={name}
            industry={industry}
            location={location}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-[#111118] border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-orange-500 rounded"></div>
                About Company
              </h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                {description || 'No description available for this company.'}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="bg-[#111118] border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-orange-500 rounded"></div>
                Why Join Us?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Competitive Salary',
                  'Career Growth',
                  'Flexible Work',
                  'Health Benefits',
                  'Team Culture',
                  'Innovation Focus',
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-orange-500/10 transition-colors"
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-[#111118] border border-white/10 rounded-2xl p-8 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe size={20} className="text-orange-500" />
                Contact Info
              </h3>

              <div className="space-y-4">
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-orange-500/10 transition-colors group"
                  >
                    <Globe
                      size={18}
                      className="text-orange-500 flex-shrink-0 mt-1"
                    />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Website
                      </p>
                      <p className="text-gray-300 group-hover:text-orange-500 transition-colors break-all text-sm">
                        {website}
                      </p>
                    </div>
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-orange-500/10 transition-colors group"
                  >
                    <Mail
                      size={18}
                      className="text-orange-500 flex-shrink-0 mt-1"
                    />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Email
                      </p>
                      <p className="text-gray-300 group-hover:text-orange-500 transition-colors break-all text-sm">
                        {email}
                      </p>
                    </div>
                  </a>
                )}

                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-orange-500/10 transition-colors group"
                  >
                    <Phone
                      size={18}
                      className="text-orange-500 flex-shrink-0 mt-1"
                    />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Phone
                      </p>
                      <p className="text-gray-300 group-hover:text-orange-500 transition-colors text-sm">
                        {phone}
                      </p>
                    </div>
                  </a>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                  ✨ Join this amazing team
                </p>
              </div>
            </div>

            {/* Share Card */}
            <div className="bg-[#111118] border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4">Share</h3>
              <div className="flex gap-3">
                <button className="flex-1 bg-white/10 hover:bg-orange-500/20 text-gray-300 py-3 rounded-lg transition-colors font-medium text-sm">
                  Share
                </button>
                <button className="flex-1 bg-white/10 hover:bg-orange-500/20 text-gray-300 py-3 rounded-lg transition-colors font-medium text-sm">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
