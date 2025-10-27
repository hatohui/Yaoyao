import React from "react";
import Area from "../DragAndDropKit/Area";
import { useTranslations } from "next-intl";

const FirstFloor = () => {
  const t = useTranslations("layout");

  return (
    <section className="absolute grid grid-cols-[1fr_4fr] grid-rows-3 h-full w-full">
      <Area full noBottom noRight noTop noLeft />
      <Area full noBottom noRight noTop />
      <Area full noTop noBottom noRight noLeft />
      <div className="grid grid-cols-3">
        <Area full noTop noBottom noRight />
        <div />
        <div className="grid grid-cols-2">
          <div className="grid grid-rows-[4fr_1fr]">
            <Area full label={t("bar")} />
            <div className="grid grid-cols-3">
              <div />
              <div />
              <Area full noTop />
            </div>
          </div>
          <Area full noLeft />
        </div>
      </div>
      <Area full noTop noRight noLeft />
      <div className="grid grid-cols-3">
        <Area full noTop noRight />
        <div />
        <div className="grid grid-rows-[1fr_3fr]">
          <div />
          <div className="grid grid-cols-[1fr_2fr]">
            <div />
            <Area full label={t("v4")} />
          </div>
        </div>
      </div>
      <Area full noBottom />
    </section>
  );
};

export default FirstFloor;
