import JobCards from '@/components/JobCards';
import PaginationControls from '@/components/PaginationControls';
import Select from '@/components/Select';
import Serach from '@/components/Serach';
import { getData } from '@/db/data';
import { Suspense } from 'react';

const ITEMS_PER_PAGE = 8;

const getCurrentPage = (page, totalPages) => {
  const parsedPage = Number.parseInt(page, 10);

  if (
    !Number.isInteger(parsedPage) ||
    parsedPage < 1 ||
    parsedPage > totalPages
  ) {
    return 1;
  }

  return parsedPage;
};

function SearchFallback() {
  return (
    <div className="w-full max-w-5xl px-4 md:px-0">
      <div className="h-16 md:h-20 bg-[#111118]/80 border border-white/10 rounded-2xl md:rounded-full animate-pulse" />
    </div>
  );
}

function FilterFallback() {
  return (
    <div className="mb-6">
      <div className="h-5 w-32 bg-white/10 rounded mb-3 animate-pulse" />
      <div className="h-12 bg-[#111118] border border-white/10 rounded-lg animate-pulse" />
    </div>
  );
}

const JobsDataPage = async ({ searchParams }) => {
  const params = await searchParams;
  const data = await getData();

  const jobTitle = params?.jobTitle || '';
  const location = params?.location || '';
  const category = params?.category || '';
  const categories = [...new Set(data.map(item => item.industry))].filter(
    Boolean,
  );

  const filteredData = data.filter(item => {
    const normalizedTitle = jobTitle.toLowerCase().trim();
    const normalizedLocation = location.toLowerCase().trim();

    const matchesJobTitle =
      !normalizedTitle ||
      item.name?.toLowerCase().includes(normalizedTitle) ||
      item.industry?.toLowerCase().includes(normalizedTitle);

    const matchesLocation =
      !normalizedLocation ||
      item.location?.toLowerCase().includes(normalizedLocation);

    const matchesCategory = !category || item.industry === category;

    return matchesJobTitle && matchesLocation && matchesCategory;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / ITEMS_PER_PAGE),
  );
  const currentPage = getCurrentPage(params?.page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  const hasActiveFilters = Boolean(jobTitle || location || category);

  return (
    <div className="min-h-screen bg-[#0B0B0F] py-28">
      <div className="w-10/12 mx-auto">
        <div className="mb-8 mx-auto w-full max-w-5xl">
          <Suspense fallback={<SearchFallback />}>
            <Serach />
          </Suspense>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-5 gap-8">
          <div className="col-span-1">
            <div className="sticky top-32">
              <h3 className="text-white text-lg font-bold mb-4">Filters</h3>
              <Suspense fallback={<FilterFallback />}>
                <Select categories={categories} />
              </Suspense>

              {hasActiveFilters && (
                <a
                  href="/browsejobs"
                  className="block w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-all text-center"
                >
                  Clear Filters
                </a>
              )}
            </div>
          </div>

          <div className="col-span-4">
            {filteredData.length === 0 ? (
              <div className="flex justify-center items-center h-96">
                <div className="text-gray-400 text-center">
                  <p className="text-lg font-semibold">No jobs found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {paginatedData.map(company => (
                  <JobCards key={company._id} data={company} />
                ))}
              </div>
            )}

            <PaginationControls
              basePath="/browsejobs"
              currentPage={currentPage}
              totalPages={totalPages}
              searchParams={params}
            />
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p>
            Showing {paginatedData.length} of {filteredData.length} matching
            jobs
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobsDataPage;
