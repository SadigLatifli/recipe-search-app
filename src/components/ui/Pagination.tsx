import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}) {
  const createPaginationArray = () => {
    const pages: (number | string)[] = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue;
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    if (searchParams.query) params.append("query", searchParams.query);
    if (searchParams.cuisine) params.append("cuisine", searchParams.cuisine);
    if (searchParams.maxReadyTime)
      params.append("maxReadyTime", searchParams.maxReadyTime);

    params.set("page", page.toString());

    return `/recipes?${params.toString()}`;
  };

  const pages = createPaginationArray();

  return (
    <div className="mt-8 flex justify-center">
      <nav className="inline-flex rounded-md shadow" aria-label="Pagination">
        <Link
          href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
          className={`flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 ${
            currentPage > 1
              ? "bg-white text-amber-700 hover:bg-amber-50"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-disabled={currentPage <= 1}
          tabIndex={currentPage <= 1 ? -1 : 0}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only md:not-sr-only md:ml-1">Previous</span>
        </Link>

        {/* Page numbers */}
        {pages.map((page, index) =>
          typeof page === "number" ? (
            <Link
              key={index}
              href={createPageUrl(page)}
              className={`hidden sm:flex items-center justify-center px-4 py-2 border ${
                page === currentPage
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white text-amber-700 border-gray-300 hover:bg-amber-50"
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          ) : (
            <span
              key={index}
              className="hidden sm:flex items-center justify-center px-4 py-2 border border-gray-300 bg-white text-gray-700"
            >
              {page}
            </span>
          )
        )}

        <span className="sm:hidden flex items-center justify-center px-4 py-2 border border-gray-300 bg-amber-500 text-white">
          {currentPage} of {totalPages}
        </span>

        <Link
          href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
          className={`flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 ${
            currentPage < totalPages
              ? "bg-white text-amber-700 hover:bg-amber-50"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-disabled={currentPage >= totalPages}
          tabIndex={currentPage >= totalPages ? -1 : 0}
        >
          <span className="sr-only md:not-sr-only md:mr-1">Next</span>
          <ChevronRight className="h-5 w-5" />
        </Link>
      </nav>
    </div>
  );
}

export default Pagination;
