import CompanyCard from '@/components/CompanyCard';
import PaginationControls from '@/components/PaginationControls';
import Serach from '@/components/Serach';
import { getCompanyData } from '@/db/data';

const ITEMS_PER_PAGE = 8;

const getCurrentPage = (page, totalPages) => {
  const parsedPage = Number.parseInt(page, 10);

  if (!Number.isInteger(parsedPage) || parsedPage < 1 || parsedPage > totalPages) {
    return 1;
  }

  return parsedPage;
};

const CompanyPage = async ({ searchParams }) => {
  const params = await searchParams;
  const data = await getCompanyData();
  const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));
  const currentPage = getCurrentPage(params?.page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white px-4 py-28 transition-colors duration-300 dark:bg-gradient-to-br dark:from-[#0a0a0f] dark:via-[#1a1a24] dark:to-[#0a0a0f] md:px-8">
      <div className="w-10/12 mx-auto">
        <h2 className="mb-12 text-center text-4xl font-bold text-slate-900 dark:text-white md:text-6xl">
          Top Companies Hiring Now
        </h2>

        <div className="mb-8 mx-auto w-full max-w-5xl">
          <Serach />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedData.map(company => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>

        <PaginationControls
          basePath="/company"
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={params}
        />
      </div>
    </div>
  );
};

export default CompanyPage;
