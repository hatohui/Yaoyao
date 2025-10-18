"use client";

import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useThemeStore } from "./ThemeProvider";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useThemeStore((state) => state);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions during SSR
    return (
      <div className="p-2 w-9 h-9 rounded-lg bg-transparent" aria-hidden="true">
        <div className="w-5 h-5" />
      </div>
    );
  }

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
