import CompanyCard from '@/components/CompanyCard';
import { getCompanyData } from '@/db/data';

const CompanyPage = async () => {
  const data = await getCompanyData();

  return (
    <div className="  min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a24] to-[#0a0a0f] py-28 px-4 md:px-8">
      <div className="w-10/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map(company => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
