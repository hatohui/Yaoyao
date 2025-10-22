import React from "react";
import { getPageNumbers } from "@/utils/pagination";
import PageNumbers from "./PageNumbers";
import PaginationButtons, { PaginationNextButtons } from "./PaginationButtons";

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

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className={`px-1 sm:px-4 py-2 ${className}`}>
      <div className="flex items-center justify-center gap-0.5 sm:gap-1.5">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <PageNumbers
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        <PaginationNextButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Pagination;
