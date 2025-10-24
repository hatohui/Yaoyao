import React from "react";

type PageNumbersProps = {
  pageNumbers: (number | string)[];
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PageNumbers = ({
  pageNumbers,
  currentPage,
  onPageChange,
}: PageNumbersProps) => {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 sm:px-2 py-2 text-slate-500 dark:text-slate-400 text-xs sm:text-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`min-w-[32px] sm:min-w-[40px] cursor-pointer h-[32px] sm:h-[36px] px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-colors text-xs sm:text-sm font-medium touch-manipulation flex items-center justify-center ${
              currentPage === page
                ? "bg-main text-white border-main shadow-sm"
                : "border-slate-300 dark:border-slate-600 hover:bg-main/10 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default PageNumbers;
