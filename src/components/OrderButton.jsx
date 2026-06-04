'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

const getApiUrl = () =>
  (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(
    /\/$/,
    '',
  );

const getNumberPrice = value => {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return Number.NaN;

  return Number(value.replace(/[$,\s]/g, ''));
};

const getCheckoutImage = value => {
  if (typeof value !== 'string' || !value.trim()) return undefined;

  try {
    return new URL(value).toString();
  } catch {
    if (value.startsWith('/')) {
      return `${window.location.origin}${value}`;
    }

    return undefined;
  }
};

const OrderButton = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOrder = async () => {
    const name = userData?.courseName?.trim();
    const price = getNumberPrice(userData?.coursePrice);
    const image = getCheckoutImage(userData?.courseImage);

    if (!name) {
      toast.error('Course name is missing.');
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      toast.error('Course price is not valid.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${getApiUrl()}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            name,
            price,
            image,
          },
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Unable to create checkout session.');
      }

      if (!data.url) {
        throw new Error('Stripe checkout URL was not returned.');
      }

      toast.success('Checkout ready. Redirecting to Stripe...');
      window.location.assign(data.url);
    } catch (error) {
      toast.error(error.message || 'Unable to start payment. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleOrder}
        disabled={isLoading}
        className={`mt-6 flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-violet-600 text-sm font-black text-white transition hover:bg-violet-700 ${
          isLoading ? 'cursor-not-allowed opacity-70' : ''
        }`}
      >
        {isLoading ? 'Preparing checkout...' : 'Secure Order'}
      </button>
    </div>
  );
};

export default OrderButton;
