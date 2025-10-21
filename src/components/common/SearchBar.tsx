import useSearch from "@/hooks/common/useSearch";
import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const {
    searchInput,
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    handleClearSearch,
  } = useSearch();

  // Show loading indicator when input differs from URL query (debouncing)
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const isDebouncing = searchInput.trim() !== searchQuery;
    setIsSearching(isDebouncing);
  }, [searchInput, searchQuery]);

  return (
    <form onSubmit={handleSearchSubmit} className="mt-4">
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 pl-10 pr-10 text-sm border border-main/20 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {isSearching ? (
            <div className="w-4 h-4 border-2 border-main border-t-transparent rounded-full animate-spin" />
          ) : (
            <FiSearch className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          )}
        </div>
        {searchInput && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
