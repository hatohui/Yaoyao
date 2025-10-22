import { FiSearch } from "react-icons/fi";

type FoodSelectorSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const FoodSelectorSearch = ({
  value,
  onChange,
  placeholder,
}: FoodSelectorSearchProps) => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400 dark:text-slate-500" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-main/50 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
      />
    </div>
  );
};

export default FoodSelectorSearch;
