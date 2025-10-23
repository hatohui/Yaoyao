import DragObject from "@/components/layout/components/DragControls/DragObject";
import DragZone from "@/components/layout/components/DragControls/DragZone";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import React from "react";

const LayoutPage = () => {
  return (
    <div className="nav-spacer">
      <RestaurantLayout />
      <DragZone id="restaurant" width={800} height={600}>
        <DragObject id="table-1" x={100} y={100} enabled />
        <DragObject id="table-2" x={300} y={150} enabled />
        <DragObject id="table-3" x={200} y={300} enabled />
      </DragZone>
    </div>
  );
};

export default LayoutPage;
