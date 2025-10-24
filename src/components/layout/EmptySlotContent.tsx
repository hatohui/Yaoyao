import React from "react";
import { FiGrid } from "react-icons/fi";
import { useTranslations } from "next-intl";

type EmptySlotContentProps = {
  slotId: number;
};

/**
 * Content displayed for empty slots without tables
 */
const EmptySlotContent = ({ slotId }: EmptySlotContentProps) => {
  const t = useTranslations("layout");

  return (
    <>
      {/* Empty Slot */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FiGrid className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {t("emptySlot")}
          </span>
        </div>
      </div>
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {t("slotNumber", { number: slotId })}
      </div>
    </>
  );
};

export default EmptySlotContent;
