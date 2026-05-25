'use client';

import { Button, Card, Chip, Input } from '@heroui/react';
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Building2,
  Users,
  Star,
} from 'lucide-react';

export default function Banner() {
  return (
    <section className="pt-10 md:pt-20 relative min-h-screen overflow-hidden bg-black text-white font-sans">
      {/* Responsive Background Image Container */}
      <div
        className={`
          absolute z-0 
          /* Mobile/Small: Full size */
          inset-0 w-full h-full 
          /* Medium: Full size but centered */
          md:inset-0 md:w-full md:h-full 
          /* Large: Smaller size and centered */
          lg:w-[80%] lg:h-[80%] lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
          bg-center bg-cover bg-no-repeat
        `}
        style={{ backgroundImage: "url('/globe.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Top Subtle Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-blue-600/20 blur-[120px] rounded-full z-0" />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-20 flex flex-col items-center">
        {/* Badge */}
        <div className="mb-6">
          <Chip
            variant="flat"
            className="bg-white/10 text-white/80 border border-white/10 px-4 py-1.5 backdrop-blur-md"
            radius="full"
          >
            💼 50,000+ NEW JOBS THIS MONTH
          </Chip>
        </div>

        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>
        </div>

        {/* Modern Search Bar */}
        <div className="w-full max-w-4xl mb-8 px-4 md:px-0">
          <div className="bg-[#111118]/80 border border-white/10 p-2 md:p-1.5 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center gap-2 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center w-full px-4">
              <Search size={18} className="text-gray-500 mr-3 shrink-0" />
              <Input
                placeholder="Job title, skill or company"
                variant="flat"
                className={
                  'w-full bg-transparent border-none shadow-none outline-none focus:border-none  '
                }
              />
            </div>

            <div className="hidden md:block w-px h-8 bg-white/10" />

            <div className="flex items-center w-full px-4">
              <MapPin size={18} className="text-gray-500 mr-3 shrink-0" />
              <Input
                placeholder="Location or Remote"
                variant="flat"
                className={
                  'w-full bg-transparent border-none shadow-none outline-none focus:border-none  '
                }
              />
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto rounded-xl md:rounded-full px-6 py-6 h-12 font-medium transition-all shrink-0">
              <Search size={20} />
            </Button>
          </div>
        </div>

        {/* Trending Section */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-24">
          <span className="text-gray-500 text-sm font-medium">
            Trending Position
          </span>
          {['Product Designer', 'AI Engineering', 'Dev-ops Engineer'].map(
            item => (
              <Chip
                key={item}
                className="bg-white/5 text-gray-300 border border-white/10 rounded-full px-3 py-1 text-xs"
              >
                {item}
              </Chip>
            ),
          )}
        </div>

        {/* Globe and Stats Section */}
        <div className="relative w-full max-w-6xl mt-10 md:mt-20">
          <div className="relative w-full h-[300px] md:h-[450px] rounded-t-full overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:30px_30px]" />
            <div className="absolute inset-0 flex items-center justify-center text-center px-6">
              <h2 className="text-2xl md:text-4xl font-medium leading-tight text-white/90">
                Assisting over{' '}
                <span className="text-white font-bold">15,000 job seekers</span>
                <br />
                find their dream positions.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 -mt-20 relative z-20">
            <StatCard
              icon={<BriefcaseBusiness size={20} />}
              value="50K"
              label="Active Jobs"
            />
            <StatCard
              icon={<Building2 size={20} />}
              value="12K"
              label="Companies"
            />
            <StatCard
              icon={<Users size={20} />}
              value="2M"
              label="Job Seekers"
            />
            <StatCard
              icon={<Star size={20} />}
              value="97%"
              label="Satisfaction Rate"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <Card className="bg-[#0f0f14]/80 backdrop-blur-md border border-white/10 p-6 h-full group hover:border-blue-500/50 transition-all duration-300">
      <div className="text-gray-400 mb-8 group-hover:text-blue-400 transition-colors">
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-500 text-sm">{label}</p>
    </Card>
  );
}
