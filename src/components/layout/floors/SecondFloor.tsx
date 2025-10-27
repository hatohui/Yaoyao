import React from "react";
import Area from "../DragAndDropKit/Area";
import { useTranslations } from "next-intl";

const SecondFloor = () => {
  const t = useTranslations("layout");

  return (
    <section className="absolute grid grid-cols-[1fr_4fr] grid-rows-1 h-full w-full">
      <div className="grid grid-rows-3 border-r-2 border-[#94A3B8]">
        <Area full noLeft noTop noRight label={t("fishTank")} />
        <div className="grid grid-cols-4">
          <div className="col-span-3" />
          <div className="grid grid-rows-3">
            <div />
            <Area full noBottom noRight />
            <Area full noTop noRight />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5">
        <div />
        <div className="grid col-span-2 ">
          <div className="grid grid-rows-6">
            <div className="row-span-4" />
            <div className="grid grid-cols-8">
              <div />
              <Area full />
            </div>
          </div>
          <div className="grid grid-rows-4">
            <div className="row-span-3" />
            <Area full noBottom />
          </div>
        </div>
        <div className="grid grid-rows-2 col-span-2">
          <Area full label={t("kitchen")} noTop />
          <div className="grid grid-rows-[3fr_2fr]">
            <div className="grid grid-cols-5">
              <div className="col-span-3" />
              <Area full noTop />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondFloor;
