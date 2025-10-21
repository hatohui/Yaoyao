import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* First Page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-main/20 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-main/10 dark:hover:bg-slate-700 transition-colors"
        aria-label="First page"
      >
        <FiChevronsLeft className="w-4 h-4 text-slate-700 dark:text-slate-300" />
      </button>

      {/* Previous Page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-main/20 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-main/10 dark:hover:bg-slate-700 transition-colors"
        aria-label="Previous page"
      >
        <FiChevronLeft className="w-4 h-4 text-slate-700 dark:text-slate-300" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-slate-500 dark:text-slate-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                currentPage === page
                  ? "bg-main text-white border-main"
                  : "border-main/20 dark:border-slate-600 hover:bg-main/10 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-main/20 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-main/10 dark:hover:bg-slate-700 transition-colors"
        aria-label="Next page"
      >
        <FiChevronRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
      </button>

      {/* Last Page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-main/20 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-main/10 dark:hover:bg-slate-700 transition-colors"
        aria-label="Last page"
      >
        <FiChevronsRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
      </button>
    </div>
  );
};

export default Pagination;
