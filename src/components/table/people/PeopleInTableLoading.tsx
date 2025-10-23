"use client";
import React from "react";

const PeopleInTableLoading = () => {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 animate-pulse"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600" />
            <div className="space-y-1">
              <div className="h-4 w-24 bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="w-7 h-7 bg-slate-300 dark:bg-slate-600 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleInTableLoading;
