import React from "react";
import Area from "../DragAndDropKit/Area";

const FirstFloor = () => {
  return (
    <section className="absolute grid grid-cols-[1fr_4fr] grid-rows-3 h-full w-full">
      <Area full noBottom />
      <Area full noBottom />
      <Area full noTop noBottom />
      <Area full noTop noBottom />
      <Area full noTop />
      <Area full noTop />
    </section>
  );
};

export default FirstFloor;
