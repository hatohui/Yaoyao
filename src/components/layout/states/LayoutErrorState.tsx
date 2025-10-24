import React from "react";

interface LayoutErrorStateProps {
  isError: boolean;
  error: Error | null;
}

const LayoutErrorState: React.FC<LayoutErrorStateProps> = ({
  isError,
  error,
}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900">
      <div className="text-center max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <div className="text-slate-600 dark:text-slate-400 mb-4">
          {isError ? "Error loading layout" : "No layout data available."}
        </div>
        {isError && error && (
          <div className="text-sm text-red-500 dark:text-red-400 mb-4">
            {error instanceof Error ? error.message : "Unknown error"}
          </div>
        )}
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Click the &quot;Add Slot&quot; button, then click on the layout to
          create your first slot.
        </p>
      </div>
    </div>
  );
};

export default LayoutErrorState;
