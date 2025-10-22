"use client";
import React from "react";
import SearchBar from "@/components/common/SearchBar";
import { useTranslations } from "next-intl";

type FoodSearchBarProps = {
  placeholder?: string;
};

const FoodSearchBar = ({ placeholder }: FoodSearchBarProps) => {
  const t = useTranslations("menu");

  return (
    <div className="flex-1 min-w-0">
      <SearchBar
        placeholder={
          placeholder || t("searchPlaceholder") || "Search dishes..."
        }
      />
    </div>
  );
};

export default FoodSearchBar;
