import Link from 'next/link';

const buildPageHref = ({ basePath, searchParams = {}, page }) => {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === 'page' || value === undefined || value === null || value === '') {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(item => params.append(key, item));
      return;
    }

    params.set(key, value);
  });

  if (page > 1) {
    params.set('page', String(page));
  }

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
};

const PageLink = ({ href, disabled, active, children }) => {
  const className = `flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors ${
    active
      ? 'border-orange-500 bg-orange-500 text-white'
      : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-orange-500/60 hover:text-white'
  } ${disabled ? 'pointer-events-none opacity-40' : ''}`;

  return (
    <Link href={href} className={className} aria-disabled={disabled}>
      {children}
    </Link>
  );
};

const PaginationControls = ({
  basePath,
  currentPage,
  totalPages,
  searchParams,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-3"
    >
      <PageLink
        href={buildPageHref({
          basePath,
          searchParams,
          page: Math.max(currentPage - 1, 1),
        })}
        disabled={currentPage === 1}
      >
        Previous
      </PageLink>

      {pages.map(page => (
        <PageLink
          key={page}
          href={buildPageHref({ basePath, searchParams, page })}
          active={page === currentPage}
        >
          {page}
        </PageLink>
      ))}

      <PageLink
        href={buildPageHref({
          basePath,
          searchParams,
          page: Math.min(currentPage + 1, totalPages),
        })}
        disabled={currentPage === totalPages}
      >
        Next
      </PageLink>
    </nav>
  );
};

export default PaginationControls;
