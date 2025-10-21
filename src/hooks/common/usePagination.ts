"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

const usePagination = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname() || "/";

  const currentPage = parseInt(searchParams?.get("page") || "1", 10);

  const goToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams();

      searchParams?.forEach((value, key) => {
        params.set(key, value);
      });

      params.set("page", page.toString());

      const queryString = params.toString();
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const resetPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  return {
    currentPage,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
  };
};

export default usePagination;
