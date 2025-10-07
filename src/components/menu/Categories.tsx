"use client";
import useCategories from "@/hooks/useCategories";
import { setNewParamString } from "@/utils/setParams";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Categories = ({ className }: { className?: string }) => {
  const { data: categories, isLoading } = useCategories();
  const router = useRouter();
  const params = useSearchParams();

  if (isLoading) return <div>Loading...</div>;

  const handleCategoryClick = (category: string) => {
    const query = category.split(" ")[0].toLowerCase();
    router.push(setNewParamString(params, "category", query));
  };

  return (
    <div className={className}>
      {categories?.map((category) => (
        <button
          key={category.id}
          className="p-4 border rounded mb-2"
          onClick={() => handleCategoryClick(category.key)}
        >
          <h2>{category.name}</h2>
        </button>
      ))}
    </div>
  );
};

export default Categories;
