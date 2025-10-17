import useSearch from "@/hooks/common/useSearch";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const {
    searchInput,
    handleSearchChange,
    handleSearchSubmit,
    handleClearSearch,
  } = useSearch();

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
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
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
