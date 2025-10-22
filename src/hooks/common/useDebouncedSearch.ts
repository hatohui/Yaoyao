"use client";
import { useState } from "react";
import { useDebouncedValue } from "./useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "@/config/app";

export const useDebouncedSearch = (initialValue: string = "") => {
  const [searchInput, setSearchInput] = useState(initialValue);
  const debouncedSearch = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_DELAY);

  return {
    searchInput,
    setSearchInput,
    debouncedSearch,
    isSearching: searchInput !== debouncedSearch,
  };
};
