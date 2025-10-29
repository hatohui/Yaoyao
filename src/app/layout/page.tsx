"use client";

import StaticRestaurantLayout from "@/components/layout/public/StaticRestaurantLayout";
import { LAYOUT_PUBLIC_ENABLED } from "@/config/app";
import NotFound from "../not-found";

const LayoutPage = () => {
  if (!LAYOUT_PUBLIC_ENABLED) {
    return <NotFound />;
  }

  return (
    <div className="nav-spacer">
      <StaticRestaurantLayout />
    </div>
  );
};

export default LayoutPage;
