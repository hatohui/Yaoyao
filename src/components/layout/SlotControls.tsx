import React from "react";
import { FiUnlock, FiX, FiTrash2 } from "react-icons/fi";

type SlotControlsProps = {
  controlsRef: React.RefObject<HTMLDivElement | null>;
  isLocked: boolean;
  hasTable: boolean;
  onLock: (e: React.MouseEvent) => void;
  onUnassign: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
};

/**
 * Control buttons for slot operations (lock, unassign, delete)
 */
const SlotControls = ({
  controlsRef,
  isLocked,
  hasTable,
  onLock,
  onUnassign,
  onDelete,
}: SlotControlsProps) => {
  return (
    <div
      ref={controlsRef}
      style={{ display: "none" }}
      className="absolute top-1 right-1 flex gap-1 z-10 animate-fadeIn"
    >
      <button
        onClick={onLock}
        className={`p-1 rounded shadow-md transition-all duration-200 ${
          isLocked
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300"
        }`}
        title={isLocked ? "Unlock" : "Lock"}
      >
        <FiUnlock className="w-3 h-3" />
      </button>

      {hasTable && (
        <button
          onClick={onUnassign}
          disabled={isLocked}
          className={`p-1 rounded shadow-md transition-all duration-200 ${
            isLocked
              ? "bg-slate-300 dark:bg-slate-600 cursor-not-allowed opacity-50"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
          title="Unassign Table"
        >
          <FiX className="w-3 h-3 text-white" />
        </button>
      )}

      <button
        onClick={onDelete}
        disabled={isLocked}
        className={`p-1 rounded shadow-md transition-all duration-200 ${
          isLocked
            ? "bg-slate-300 dark:bg-slate-600 cursor-not-allowed opacity-50"
            : "bg-red-500 hover:bg-red-600"
        }`}
        title="Delete Slot"
      >
        <FiTrash2 className="w-3 h-3 text-white" />
      </button>
    </div>
  );
};

export default SlotControls;
