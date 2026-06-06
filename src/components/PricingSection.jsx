'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FaCrown,
  FaBolt,
  FaRocket,
  FaCheck,
  FaArrowRight,
} from 'react-icons/fa';

const pricingPlans = [
  {
    name: 'Starter',
    monthly: 0,
    yearly: 0,
    icon: FaRocket,
    features: [
      'Daily AI match brief (top 5)',
      'Verified salary bands',
      'Company insight dashboards',
      '1-click apply, unlimited',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    monthly: 17,
    yearly: 13,
    icon: FaCrown,
    features: [
      'Daily AI match brief (top 5)',
      'Verified salary bands',
      'Company insight dashboards',
      '1-click apply, unlimited',
    ],
    featured: true,
  },
  {
    name: 'Premium',
    monthly: 99,
    yearly: 79,
    icon: FaBolt,
    features: [
      'Everything in Pro',
      'Multi-profile career portfolios',
      'Shared talent rooms',
      'Recruit view (read-only)',
    ],
    featured: false,
  },
];

const getApiUrl = () =>
  (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(
    /\/$/,
    '',
  );

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleCheckout = async plan => {
    const price = isYearly ? plan.yearly : plan.monthly;
    const interval = isYearly ? 'Yearly' : 'Monthly';

    if (price === 0) {
      toast.info('Starter plan is free. No payment is needed.');
      return;
    }

    const planKey = `${plan.name}-${interval}`;
    setLoadingPlan(planKey);

    try {
      const origin = window.location.origin;
      const response = await fetch(`${getApiUrl()}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            name: `${plan.name} ${interval}`,
            price,
            image: `${origin}/logo.png`,
          },
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Unable to create checkout session.');
      }

      if (!data.url) {
        throw new Error('Checkout URL was not returned by the server.');
      }

      toast.success('Checkout ready. Redirecting to Stripe...');
      window.location.assign(data.url);
    } catch (error) {
      toast.error(error.message || 'Payment could not start. Try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="bg-white dark:bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <p className="uppercase text-xs tracking-[3px] text-slate-500 dark:text-gray-400">
              Pricing
            </p>
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          </div>

          <h2 className="text-slate-900 dark:text-white text-4xl md:text-6xl font-bold">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </motion.div>

        {/* Toggle */}

        <div className="flex justify-center mb-14">
          <div className="bg-slate-100 dark:bg-[#161616] p-1 rounded-full flex items-center border border-black/5 dark:border-0">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                !isYearly ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow' : 'text-slate-600 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                isYearly ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow' : 'text-slate-600 dark:text-gray-400'
              }`}
            >
              Yearly
            </button>

            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full ml-2">
              25%
            </span>
          </div>
        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const planKey = `${plan.name}-${isYearly ? 'Yearly' : 'Monthly'}`;
            const isLoading = loadingPlan === planKey;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className={`rounded-3xl border p-8 transition-all duration-300 ${
                  plan.featured
                    ? 'border-black/10 dark:border-white/20 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-zinc-900 dark:to-zinc-950 shadow-[0_0_40px_rgba(0,0,0,0.03)] dark:shadow-[0_0_40px_rgba(255,255,255,0.08)]'
                    : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#0d0d0d]'
                }`}
              >
                {/* Top */}

                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-200/50 dark:bg-[#161616] flex items-center justify-center">
                      <Icon className="text-violet-600 dark:text-violet-300" />
                    </div>

                    <h3 className="text-slate-900 dark:text-white text-xl font-semibold">
                      {plan.name}
                    </h3>
                  </div>

                  <div>
                    <span className="text-slate-900 dark:text-white text-5xl font-bold">
                      ${isYearly ? plan.yearly : plan.monthly}
                    </span>

                    <span className="text-slate-500 dark:text-gray-400 text-sm">/month</span>
                  </div>
                </div>

                <p className="text-slate-700 dark:text-gray-300 mb-6 font-medium">
                  Start building your insights hub:
                </p>

                {/* Features */}

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-slate-650 dark:text-gray-400"
                    >
                      <div className="w-5 h-5 rounded bg-slate-200 dark:bg-[#1a1a1a] flex items-center justify-center text-slate-700 dark:text-white">
                        <FaCheck size={10} />
                      </div>

                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}

                <button
                  type="button"
                  onClick={() => handleCheckout(plan)}
                  disabled={Boolean(loadingPlan)}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-medium transition ${
                    plan.featured
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-black hover:scale-[1.02]'
                      : 'bg-slate-200/80 hover:bg-slate-300/80 text-slate-900 dark:bg-[#1b1b1b] dark:text-white dark:hover:bg-[#242424]'
                  } ${loadingPlan ? 'cursor-not-allowed opacity-70' : ''}`}
                >
                  {isLoading ? 'Preparing Checkout...' : 'Choose This Plan'}
                  <FaArrowRight className={isLoading ? 'animate-pulse' : ''} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
