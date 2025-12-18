import MostOrderedFoods from "@/components/dashboard/MostOrderedFoods";
import React from "react";

const StatisticPage = () => {
  return (
    <div className="m-6">
      <MostOrderedFoods limit={60} />
    </div>
  );
};

export default StatisticPage;
