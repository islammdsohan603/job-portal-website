import ApplyListCard from '@/components/ApplyListCard';
import { getApplyListData } from '@/db/data';
import React from 'react';

const ApplyListPage = async () => {
  const data = await getApplyListData();

  return (
    <div className="  min-h-screen bg-[#0B0B0F]  py-28 px-4 md:px-8">
      <div className="w-10/12 mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12">
          My Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map(application => (
            <ApplyListCard key={application._id} application={application} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplyListPage;
