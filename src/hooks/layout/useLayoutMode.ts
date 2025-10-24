import { useState } from "react";

export const useLayoutMode = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleAddMode = () => setIsAddMode((prev) => !prev);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return {
    isAddMode,
    isSidebarOpen,
    toggleAddMode,
    toggleSidebar,
    closeSidebar,
  };
};
