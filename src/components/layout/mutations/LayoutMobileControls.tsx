import React from "react";

interface LayoutMobileControlsProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  scale: number;
  onToggleSidebar: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

const LayoutMobileControls: React.FC<LayoutMobileControlsProps> = ({
  isMobile,
  isSidebarOpen,
  scale,
  onToggleSidebar,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden fixed top-20 right-4 z-50 p-3 bg-main hover:bg-main/90 text-white rounded-full shadow-lg transition-all duration-200"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Zoom Controls */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-2 border border-slate-300 dark:border-slate-600">
          <button
            onClick={onZoomIn}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Zoom In"
          >
            <svg
              className="w-5 h-5 text-slate-700 dark:text-slate-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
              />
            </svg>
          </button>
          <button
            onClick={onResetZoom}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors text-xs font-medium text-slate-700 dark:text-slate-200"
            title="Reset Zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={onZoomOut}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Zoom Out"
          >
            <svg
              className="w-5 h-5 text-slate-700 dark:text-slate-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default LayoutMobileControls;
