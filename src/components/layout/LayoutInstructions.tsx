"use client";
import React, { useState } from "react";
import { FiX, FiHelpCircle } from "react-icons/fi";

const LayoutInstructions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-main hover:bg-main/90 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        title="Show Instructions"
      >
        <FiHelpCircle className="w-6 h-6" />
      </button>

      {/* Instructions Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Layout Management Guide
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <FiX className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Creating Slots */}
              <section>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Creating Slots
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Click anywhere on the restaurant layout to create a new table
                  slot. Empty slots appear in gray.
                </p>
              </section>

              {/* Assigning Tables */}
              <section>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Assigning Tables
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>
                    • <strong>Drag from sidebar:</strong> Drag an available
                    table from the sidebar and drop it on an empty slot
                  </li>
                  <li>
                    • <strong>Move between slots:</strong> Drag a slot to
                    another empty slot to move the table
                  </li>
                  <li>
                    • <strong>Swap tables:</strong> Drag a slot to another
                    occupied slot to swap tables
                  </li>
                  <li>
                    • <strong>Unassign:</strong> Drag a slot back to the sidebar
                    or click the yellow X button
                  </li>
                </ul>
              </section>

              {/* Slot Controls */}
              <section>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Slot Controls
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Hover over any slot to reveal control buttons:
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>
                    • <strong>Lock/Unlock:</strong> Lock a slot to prevent
                    dragging and editing (turns red when locked)
                  </li>
                  <li>
                    • <strong>Unassign (Yellow X):</strong> Remove the table
                    from this slot
                  </li>
                  <li>
                    • <strong>Delete (Red Trash):</strong> Delete the slot
                    entirely
                  </li>
                </ul>
              </section>

              {/* Color Coding */}
              <section>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Color Coding
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border-2 border-slate-200 rounded"></div>
                    <span className="text-slate-600 dark:text-slate-400">
                      White - Empty slot
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-50 border-2 border-emerald-300 rounded"></div>
                    <span className="text-slate-600 dark:text-slate-400">
                      Emerald - Occupied slot
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-indigo-50 border-2 border-indigo-300 rounded"></div>
                    <span className="text-slate-600 dark:text-slate-400">
                      Indigo - Linked tables
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border-2 border-slate-300 rounded ring-2 ring-red-400"></div>
                    <span className="text-slate-600 dark:text-slate-400">
                      Red ring - Locked slot
                    </span>
                  </li>
                </ul>
              </section>

              {/* Tips */}
              <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  💡 Pro Tips
                </h3>
                <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                  <li>
                    • Click &quot;Add Slot&quot; button to enter stamp mode
                  </li>
                  <li>
                    • On mobile: use pinch to zoom and drag to pan the layout
                  </li>
                  <li>
                    • Lock slots when your layout is finalized to prevent
                    accidental changes
                  </li>
                  <li>
                    • Linked tables (from table management) are shown in indigo
                  </li>
                </ul>
              </section>
            </div>

            <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2 bg-main hover:bg-main/90 text-white rounded-lg transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutInstructions;
