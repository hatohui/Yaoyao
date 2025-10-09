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
          className="w-full px-4 py-2.5 pl-10 pr-10 text-sm border border-main/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        {searchInput && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
