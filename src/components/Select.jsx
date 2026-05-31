'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Select = ({ categories = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
  }, [searchParams]);

  const handleCategoryChange = value => {
    setSelectedCategory(value);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set('category', value);
      } else {
        params.delete('category');
      }

      const query = params.toString();
      router.push(query ? `/browsejobs?${query}` : '/browsejobs');
    });
  };

  return (
    <div className="mb-6">
      <label htmlFor="industry-filter" className="text-white font-semibold mb-3 block">
        Filter by Industry
      </label>
      <select
        id="industry-filter"
        value={selectedCategory}
        onChange={e => handleCategoryChange(e.target.value)}
        className="select select-info w-full bg-[#111118] border border-white/10 text-white"
      >
        <option value="">All Industries</option>
        {categories.length > 0 ? (
          categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))
        ) : (
          <option disabled>No categories available</option>
        )}
      </select>
    </div>
  );
};

export default Select;
