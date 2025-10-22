"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { SEARCH_DEBOUNCE_DELAY } from "@/config/app";
import {
  getPageSearch,
  savePageSearch,
  clearPageSearch,
} from "@/utils/params/pageSearchKey";

const useSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname() || "/";

  // Get search from URL first, then localStorage as fallback
  const urlSearch = searchParams?.get("search") || "";
  const storedSearch = getPageSearch(pathname);
  const initialSearch = urlSearch || storedSearch;

  const [searchInput, setSearchInput] = useState(initialSearch);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const searchQuery = searchInput;

  // Load search from localStorage on mount/pathname change
  useEffect(() => {
    const saved = getPageSearch(pathname);
    if (saved && !urlSearch) {
      setSearchInput(saved);
    } else if (urlSearch) {
      setSearchInput(urlSearch);
      // Sync URL search to localStorage
      savePageSearch(pathname, urlSearch);
    }
  }, [pathname, urlSearch]);

  // Debounced update function that saves to localStorage
  const updateSearch = useCallback(
    (value: string) => {
      // Save to localStorage for this page
      savePageSearch(pathname, value);

      // Update URL with search param
      const params = new URLSearchParams();

      searchParams?.forEach((v, key) => {
        if (key !== "search" && key !== "page") {
          params.set(key, v);
        }
      });

      if (value.trim()) {
        params.set("search", value.trim());
      }

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [searchParams, router, pathname]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchInput(newValue);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for debounced update
    debounceTimerRef.current = setTimeout(() => {
      updateSearch(newValue);
    }, SEARCH_DEBOUNCE_DELAY);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear debounce timer and update immediately on submit
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    updateSearch(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");

    // Clear from localStorage
    clearPageSearch(pathname);

    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const params = new URLSearchParams();

    searchParams?.forEach((value, key) => {
      if (key !== "search" && key !== "page") {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

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
