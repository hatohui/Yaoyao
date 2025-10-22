import useFoods from "@/hooks/food/useFoods";
import usePagination from "@/hooks/common/usePagination";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FiInbox, FiSearch } from "react-icons/fi";
import FoodGalleryHeader from "./FoodGalleryHeader";
import FoodGalleryGrid from "./FoodGalleryGrid";
import FoodGalleryLoading from "./FoodGalleryLoading";
import FoodGalleryEmpty from "./FoodGalleryEmpty";
import Pagination from "../../common/Pagination";

export type FoodGalleryProps = {
  className?: string;
};

const FoodGallery = ({ className }: FoodGalleryProps) => {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");
  const searchQuery = searchParams?.get("search") || "";
  const t = useTranslations("menu");

  const { currentPage, goToPage, resetPage } = usePagination();

  const { data, isLoading } = useFoods({
    category,
    page: currentPage,
    search: searchQuery,
  });

  // Reset to page 1 when category or search changes
  useEffect(() => {
    if (currentPage !== 1) {
      resetPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, searchQuery]);

  if (isLoading) {
    return <FoodGalleryLoading message={t("loading")} />;
  }

  if (!data || data.foods.length === 0) {
    if (searchQuery) {
      return (
        <FoodGalleryEmpty
          icon={FiSearch}
          title={t("noSearchResults") || "No results found"}
          message={
            t("tryDifferentSearch") ||
            `No dishes found matching "${searchQuery}"`
          }
        />
      );
    }

    return (
      <FoodGalleryEmpty
        icon={FiInbox}
        title={t("noFoodsTitle")}
        message={t("noFoodsMessage")}
      />
    );
  }

  const { foods, pagination } = data;
  const headerTitle = searchQuery
    ? `${t("searchResults") || "Search Results"} (${pagination.total})`
    : category
    ? t("categoryMenu")
    : t("allMenu");

  const itemLabel = pagination.total === 1 ? t("dish") : t("dishes");

  return (
    <div className={className}>
      <FoodGalleryHeader
        title={headerTitle}
        itemCount={pagination.total}
        itemLabel={itemLabel}
        className="mb-4 sm:mb-6"
      />

      <FoodGalleryGrid foods={foods} t={t} />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={goToPage}
        className="mt-6"
      />
    </div>
  );
};

export default FoodGallery;
