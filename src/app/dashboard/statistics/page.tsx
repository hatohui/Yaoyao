"use client";
import MostOrderedFoods from "@/components/dashboard/MostOrderedFoods";
import { useTranslations } from "next-intl";

const StatisticsPage = () => {
  const t = useTranslations("dashboard");

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold mb-4">
        {t("statistics") || "Statistics"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MostOrderedFoods limit={5} />
      </div>
    </div>
  );
};

export default StatisticsPage;
