import JobCards from '@/components/JobCards';
import { getData } from '@/db/data';
import React from 'react';

const JobsDataPage = async () => {
  const data = await getData();

  return (
    <div className=" min-h-screen bg-[#0B0B0F] pt-28">
      <div className="w-10/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map(company => (
            <JobCards key={company.id} data={company} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsDataPage;
