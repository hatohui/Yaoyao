import React from "react";

interface LayoutAddModeButtonProps {
  isAddMode: boolean;
  onToggle: () => void;
}

const LayoutAddModeButton: React.FC<LayoutAddModeButtonProps> = ({
  isAddMode,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-20 left-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2 ${
        isAddMode
          ? "bg-green-600 hover:bg-green-700 text-white"
          : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600"
      }`}
      title={isAddMode ? "Exit Add Mode" : "Enter Add Mode"}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isAddMode ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        )}
      </svg>
      <span className="font-medium">
        {isAddMode ? "Exit Add Mode" : "Add Slot"}
      </span>
    </button>
  );
};

export default LayoutAddModeButton;
