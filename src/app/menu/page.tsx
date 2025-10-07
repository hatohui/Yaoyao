"use client";
import Categories from "@/components/menu/Categories";
import FoodGallery from "@/components/menu/FoodGallery";
import { useSearchParams } from "next/navigation";
import React from "react";

const MenuPage = () => {
  const category = useSearchParams()?.get("category");

  return (
    <div className="flex flex-col gap-4 p-4">
      <Categories className="bg-white shadow rounded" />
      <FoodGallery category={category} />
    </div>
  );
};

export default MenuPage;
