import React from "react";

const LayoutLoadingState: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex-1 overflow-auto p-8">
        <div className="wall relative max-w-7xl aspect-[2/1] mx-auto">
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main mx-auto mb-4"></div>
              <div className="text-slate-600 dark:text-slate-400">
                Loading layout...
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-80 bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-24 animate-pulse"></div>
        </div>
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutLoadingState;
