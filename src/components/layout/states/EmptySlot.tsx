import React from "react";

const EmptySlot = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center p-8 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl shadow-lg">
        <p className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-mon">
          No slots created yet
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Click the &quot;Add Slot&quot; button to start
        </p>
      </div>
    </div>
  );
};

export default EmptySlot;
