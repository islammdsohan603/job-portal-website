'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const LookSection = () => {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[900px] w-[1400px] -translate-x-1/2 rounded-t-full border border-violet-500/20 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.45),transparent_65%)]" />
      </div>

      {/* Content */}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
      >
        <h1 className="text-slate-900 dark:text-white text-4xl md:text-6xl font-bold leading-tight">
          Your next role is
          <br />
          already looking for you
        </h1>

        <p className="mt-6 text-slate-600 dark:text-gray-400 text-lg">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <button className="px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-black rounded-xl font-medium hover:scale-105 transition duration-300">
              Create a free account
            </button>
          </Link>

          <button className="px-8 py-4 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-sm text-slate-800 dark:text-white rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition duration-300">
            View pricing
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default LookSection;
