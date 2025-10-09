import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main border-r-transparent"></div>
        <p className="mt-4 text-slate-600 text-sm sm:text-base">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
