import React from "react";
import { FiGrid } from "react-icons/fi";

type EmptySlotContentProps = {
  slotId: number;
};

/**
 * Content displayed for empty slots without tables
 */
const EmptySlotContent = ({ slotId }: EmptySlotContentProps) => {
  return (
    <>
      {/* Empty Slot */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FiGrid className="w-6 h-6 text-slate-300 dark:text-slate-600 mx-auto mb-1" />
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Empty
          </span>
        </div>
      </div>
      <div className="text-xs text-slate-400 dark:text-slate-500">
        Slot #{slotId}
      </div>
    </>
  );
};

export default EmptySlotContent;
