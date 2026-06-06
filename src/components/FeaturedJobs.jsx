'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
    link: '/browsejobs',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
    link: '/browsejobs',
  },
  {
    id: 3,
    title: 'Frontend Developer',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
    link: '/browsejobs',
  },
  {
    id: 4,
    title: 'Frontend Developer',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
    link: '/browsejobs',
  },
  {
    id: 5,
    title: 'Frontend Developer',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
    link: '/browsejobs',
  },
  {
    id: 6,
    title: 'Frontend Developer',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
    link: '/browsejobs',
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
    },
  }),
};

export default function FeaturedJobs() {
  return (
    <section className="bg-white dark:bg-black py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>

            <p className="uppercase tracking-[4px] text-xs text-slate-500 dark:text-gray-400">
              Smart Job Discovery
            </p>

            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          </div>

          <h2 className="text-slate-900 dark:text-white text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight">
            The roles you&apos;d never find by searching
          </h2>
        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="group bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#222] rounded-3xl p-8 transition-all duration-300 hover:border-blue-600/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.05)] dark:hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]"
            >
              <h3 className="text-slate-900 dark:text-white text-3xl font-semibold mb-4">
                {job.title}
              </h3>

              <p className="text-slate-600 dark:text-gray-400 text-sm leading-7 mb-8">
                Showcase your commitment to diversity and inclusion by
                highlighting initiatives.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="flex items-center gap-2 bg-slate-200/55 dark:bg-[#1A1A1A] text-slate-700 dark:text-gray-300 px-3 py-2 rounded-full text-sm">
                  <FaMapMarkerAlt className="text-violet-500 dark:text-violet-400" />
                  {job.location}
                </span>

                <span className="flex items-center gap-2 bg-slate-200/55 dark:bg-[#1A1A1A] text-slate-700 dark:text-gray-300 px-3 py-2 rounded-full text-sm">
                  <FaBriefcase className="text-violet-500 dark:text-violet-400" />
                  {job.type}
                </span>

                <span className="flex items-center gap-2 bg-slate-200/55 dark:bg-[#1A1A1A] text-slate-700 dark:text-gray-300 px-3 py-2 rounded-full text-sm">
                  <span className="text-violet-500 dark:text-violet-400">●</span>
                  {job.salary}
                </span>
              </div>

              <button className="group/btn flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                {job.link ? (
                  <Link href={job.link}>
                    <span>Apply Now</span>
                  </Link>
                ) : (
                  <span>Apply Now</span>
                )}

                <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-2" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Button */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-16"
        >
          <Link href="/browsejobs">
            <button className="bg-slate-900 text-white dark:bg-white dark:text-black px-8 py-4 rounded-xl font-medium hover:scale-105 transition duration-300">
              View all job open
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
