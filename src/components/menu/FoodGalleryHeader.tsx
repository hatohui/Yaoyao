import React from "react";

type FoodGalleryHeaderProps = {
  title: string;
  itemCount: number;
  itemLabel: string;
  className?: string;
};

const FoodGalleryHeader = ({
  title,
  itemCount,
  itemLabel,
  className = "",
}: FoodGalleryHeaderProps) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-darkest dark:text-slate-100">
        {title}
      </h2>
      <span className="text-xs sm:text-sm text-main dark:text-main font-medium">
        {itemCount} {itemLabel}
      </span>
    </div>
  );
};

export default FoodGalleryHeader;
