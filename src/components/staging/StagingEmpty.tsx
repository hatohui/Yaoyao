import React from "react";
import { FiClock, FiSearch } from "react-icons/fi";

type StagingEmptyProps = {
  hasSearchQuery: boolean;
  searchQuery?: string;
};

const StagingEmpty = ({ hasSearchQuery, searchQuery }: StagingEmptyProps) => {
  if (hasSearchQuery) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
          <FiSearch className="w-8 h-8 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-dark-text mb-2">
          No staging tables found
        </h3>
        <p className="text-slate-600 dark:text-dark-text-secondary mb-4">
          No tables matching &quot;{searchQuery}&quot;
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Try adjusting your search query
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-main/10 dark:bg-main/20 mb-4">
        <FiClock className="w-8 h-8 text-main dark:text-dark-main" />
      </div>
      <h3 className="text-lg font-medium text-slate-900 dark:text-dark-text mb-2">
        No staging tables
      </h3>
      <p className="text-slate-600 dark:text-dark-text-secondary mb-4">
        Copy from production to start planning
      </p>
    </div>
  );
};

export default StagingEmpty;
