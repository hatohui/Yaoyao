"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const useSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchQuery = searchParams?.get("search") || "";
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Update search input when URL changes
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchInput(newValue);

    // Update URL immediately for client-side filtering
    const params = new URLSearchParams();

    searchParams?.forEach((value, key) => {
      if (key !== "search") {
        params.set(key, value);
      }
    });

    if (newValue.trim()) {
      params.set("search", newValue.trim());
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No need to do anything on submit since we're filtering on change
  };

  const handleClearSearch = () => {
    setSearchInput("");
    const params = new URLSearchParams();

    searchParams?.forEach((value, key) => {
      if (key !== "search") {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return {
    searchQuery,
    params: searchParams,
    searchInput,
    setSearchInput,
    handleSearchChange,
    handleSearchSubmit,
    handleClearSearch,
  };
};

export default useSearch;
