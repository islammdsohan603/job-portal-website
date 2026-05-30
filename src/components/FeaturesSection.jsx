'use client';

import { motion } from 'framer-motion';

import { HiOutlineMagnifyingGlass, HiOutlineBookmark } from 'react-icons/hi2';

import {
  FaChartLine,
  FaBuilding,
  FaFileLines,
  FaBullseye,
  FaArrowTrendUp,
} from 'react-icons/fa6';

const features = [
  {
    icon: HiOutlineMagnifyingGlass,
    title: 'Smart Search',
    description: 'Find your ideal job with advanced filters.',
  },
  {
    icon: FaChartLine,
    title: 'Salary Insights',
    description: 'Get real salary data to negotiate confidently.',
  },
  {
    icon: FaBuilding,
    title: 'Top Companies',
    description: 'Apply to vetted companies that are hiring.',
  },
  {
    icon: HiOutlineBookmark,
    title: 'Saved Jobs',
    description: 'Manage applications & favorites from your dashboard.',
  },
  {
    icon: FaArrowTrendUp,
    title: 'One-Click Apply',
    description: 'Simplify your job applications for an easier process.',
  },
  {
    icon: FaFileLines,
    title: 'Resume Builder',
    description: 'Create professional resumes with modern templates.',
  },
  {
    icon: FaBullseye,
    title: 'Skill-Based Matching',
    description: 'Discover jobs that match your skills and experience.',
  },
  {
    icon: FaArrowTrendUp,
    title: 'Career Growth Resources',
    description: 'Boost your career with quick interview tips.',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0F] py-24">
      {/* Background Blur */}

      <div className="absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />

            <span className="uppercase tracking-[3px] text-xs text-gray-400">
              Features Job
            </span>

            <span className="h-2 w-2 rounded-full bg-blue-500" />
          </div>

          <h2 className="text-white text-4xl md:text-6xl font-bold leading-tight">
            Everything you need
            <br />
            to succeed
          </h2>
        </motion.div>

        {/* Features Grid */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="group flex gap-4"
              >
                {/* Icon Box */}

                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-violet-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="relative flex items-center justify-center h-12 w-12 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl">
                    <Icon size={20} className="text-violet-300" />
                  </div>
                </div>

                {/* Content */}

                <div>
                  <h3 className="text-white font-semibold mb-2 text-lg">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-6">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
