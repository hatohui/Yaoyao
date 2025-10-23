import React from "react";
import "./style.css";
import DragBox from "./components/DragBox";

const RestaurantLayout = () => {
  return (
    <div className="grid grid-cols-[1fr_4fr] grid-rows-3 wall max-w-7xl aspect-[2/1] mx-2 lg:mx-36 overflow-auto">
      <DragBox full noBottom />
      <DragBox full noBottom />
      <DragBox full noTop noBottom />
      <DragBox full noTop noBottom />
      <DragBox full noTop />
      <DragBox full noTop />
    </div>
  );
};

export default RestaurantLayout;
