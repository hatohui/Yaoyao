import { createStore } from "zustand/vanilla";

export type Theme = "light" | "dark" | "system";

export type ThemeState = {
  theme: Theme;
};

export type ThemeActions = {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export type ThemeStore = ThemeState & ThemeActions;

export const defaultInitState: ThemeState = {
  theme: "system",
};

// Get the actual theme to apply (resolves 'system' to 'light' or 'dark')
export const getResolvedTheme = (theme: Theme): "light" | "dark" => {
  if (theme === "system") {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  }
  return theme;
};

export const initThemeStore = (): ThemeState => {
  // Check localStorage for saved theme
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme-storage");
    if (stored) {
      try {
        const { theme } = JSON.parse(stored);
        // Validate the theme value
        if (theme === "light" || theme === "dark" || theme === "system") {
          return { theme };
        }
      } catch {
        return defaultInitState;
      }
    }
  }
  return defaultInitState;
};

export const createThemeStore = (initState: ThemeState = defaultInitState) => {
  return createStore<ThemeStore>()((set) => ({
    ...initState,
    setTheme: (theme) => {
      set({ theme });
      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme-storage", JSON.stringify({ theme }));
      }
    },
    toggleTheme: () => {
      set((state) => {
        const newTheme = state.theme === "dark" ? "light" : "dark";
        // Persist to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "theme-storage",
            JSON.stringify({ theme: newTheme })
          );
        }
        return { theme: newTheme };
      });
    },
  }));
};
