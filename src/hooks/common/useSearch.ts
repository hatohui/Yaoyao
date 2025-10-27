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

  const urlSearch = searchParams?.get("search") || "";
  const storedSearch = getPageSearch(pathname);
  const initialSearch = urlSearch || storedSearch;

  const [searchInput, setSearchInput] = useState(initialSearch);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const searchQuery = urlSearch || "";

  useEffect(() => {
    const saved = getPageSearch(pathname);
    const currentUrlSearch = searchParams?.get("search") || "";

    if (saved && !currentUrlSearch) {
      setSearchInput(saved);

      const params = new URLSearchParams();
      searchParams?.forEach((v, key) => {
        if (key !== "search" && key !== "page") {
          params.set(key, v);
        }
      });
      params.set("search", saved);

      const queryString = params.toString();
      router.replace(`${pathname}?${queryString}`, { scroll: false });
    } else if (currentUrlSearch) {
      setSearchInput(currentUrlSearch);
      savePageSearch(pathname, currentUrlSearch);
    } else if (!saved && !currentUrlSearch) {
      setSearchInput("");
    }
  }, [pathname, searchParams, router]);

  const updateSearch = useCallback(
    (value: string) => {
      savePageSearch(pathname, value);

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

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      updateSearch(newValue);
    }, SEARCH_DEBOUNCE_DELAY);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    updateSearch(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");

    clearPageSearch(pathname);

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
