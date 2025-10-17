"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "zustand";

import {
  type ThemeStore,
  createThemeStore,
  initThemeStore,
  getResolvedTheme,
} from "@/stores/useThemeStore";

export type ThemeStoreApi = ReturnType<typeof createThemeStore>;

export const ThemeStoreContext = createContext<ThemeStoreApi | undefined>(
  undefined
);

export interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const storeRef = useRef<ThemeStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createThemeStore(initThemeStore());
  }

  // Get the theme preference from store
  const theme = useStore(storeRef.current, (state) => state.theme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Resolve theme (handle 'system' preference)
  useEffect(() => {
    setResolvedTheme(getResolvedTheme(theme));
  }, [theme]);

  // Listen for system theme changes when theme is 'system'
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  // Apply resolved theme to document
  useEffect(() => {
    const root = document.documentElement;

    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme]);

  return (
    <ThemeStoreContext.Provider value={storeRef.current}>
      {children}
    </ThemeStoreContext.Provider>
  );
}

export const useThemeStore = <T,>(selector: (store: ThemeStore) => T): T => {
  const themeStoreContext = useContext(ThemeStoreContext);

  if (!themeStoreContext) {
    throw new Error(`useThemeStore must be used within ThemeProvider`);
  }

  return useStore(themeStoreContext, selector);
};
