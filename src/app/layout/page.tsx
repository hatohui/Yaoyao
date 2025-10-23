import DragDemo from "@/components/layout/components/demo/DragDemo";
import DragControlsDemo from "@/components/layout/components/DragControls/DragControlsDemo";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import React from "react";

const LayoutPage = () => {
  return (
    <div className="nav-spacer">
      <RestaurantLayout />

      <DragControlsDemo />
    </div>
  );
};

export default LayoutPage;
