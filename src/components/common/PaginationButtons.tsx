import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

type PaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationButtons = ({
  currentPage,
  onPageChange,
}: PaginationButtonsProps) => {
  const buttonClass =
    "p-1.5 sm:p-2.5 rounded-lg border border-slate-300 cursor-pointer dark:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-main/10 dark:hover:bg-slate-700 transition-colors touch-manipulation min-w-[32px] sm:min-w-[40px] h-[32px] sm:h-[36px] flex items-center justify-center";
  const iconClass =
    "w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300";

  return (
    <>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={buttonClass}
        aria-label="First page"
      >
        <FiChevronsLeft className={iconClass} />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonClass}
        aria-label="Previous page"
      >
        <FiChevronLeft className={iconClass} />
      </button>
    </>
  );
};

export const PaginationNextButtons = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationButtonsProps) => {
  const buttonClass =
    "p-1.5 sm:p-2.5 rounded-lg border cursor-pointer border-slate-300 dark:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-main/10 dark:hover:bg-slate-700 transition-colors touch-manipulation min-w-[32px] sm:min-w-[40px] h-[32px] sm:h-[36px] flex items-center justify-center";
  const iconClass =
    "w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300";

  return (
    <>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonClass}
        aria-label="Next page"
      >
        <FiChevronRight className={iconClass} />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={buttonClass}
        aria-label="Last page"
      >
        <FiChevronsRight className={iconClass} />
      </button>
    </>
  );
};

export default PaginationButtons;
