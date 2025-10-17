"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useThemeStore } from "./ThemeProvider";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useThemeStore((state) => state);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-transparent hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? (
        <FiMoon className="w-5 h-5 text-main" />
      ) : (
        <FiSun className="w-5 h-5 text-main" />
      )}
    </button>
  );
}
