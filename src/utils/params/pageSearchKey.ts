"use client";
import { usePathname } from "next/navigation";

/**
 * LocalStorage-based search state management per page
 * Stores search queries separately for each page path
 */

const SEARCH_STORAGE_PREFIX = "page_search_";

/**
 * Get the localStorage key for a specific page path
 */
export const getPageSearchStorageKey = (pathname: string): string => {
  const cleanPath =
    pathname.replace(/^\/|\/$/g, "").replace(/\//g, "_") || "home";
  return `${SEARCH_STORAGE_PREFIX}${cleanPath}`;
};

/**
 * Save search query for a specific page
 */
export const savePageSearch = (pathname: string, query: string): void => {
  if (typeof window === "undefined") return;
  const key = getPageSearchStorageKey(pathname);
  if (query.trim()) {
    sessionStorage.setItem(key, query);
  } else {
    sessionStorage.removeItem(key);
  }
};

/**
 * Get saved search query for a specific page
 */
export const getPageSearch = (pathname: string): string => {
  if (typeof window === "undefined") return "";
  const key = getPageSearchStorageKey(pathname);
  return sessionStorage.getItem(key) || "";
};

/**
 * Clear search query for a specific page
 */
export const clearPageSearch = (pathname: string): void => {
  if (typeof window === "undefined") return;
  const key = getPageSearchStorageKey(pathname);
  sessionStorage.removeItem(key);
};

/**
 * Hook to get the current page's search storage key
 */
export const usePageSearchKey = (): string => {
  const pathname = usePathname() || "/";
  return getPageSearchStorageKey(pathname);
};
