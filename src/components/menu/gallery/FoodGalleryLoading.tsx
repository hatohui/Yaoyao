import React from "react";

type FoodGalleryLoadingProps = {
  message: string;
};

const FoodGalleryLoading = ({ message }: FoodGalleryLoadingProps) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main border-r-transparent"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          {message}
        </p>
      </div>
    </div>
  );
};

export default FoodGalleryLoading;
