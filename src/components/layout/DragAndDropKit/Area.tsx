import React from "react";

const Area = ({
  full = false,
  height,
  width,
  noBottom = false,
  noTop = false,
  noRight = false,
  noLeft = false,
  spanX,
  spanY,
  label,
}: {
  height?: number;
  width?: number;
  full?: boolean;
  label?: string;
  noBottom?: boolean;
  noTop?: boolean;
  noRight?: boolean;
  noLeft?: boolean;
  spanX?: number;
  spanY?: number;
}) => {
  const getStyle = () => {
    let style: React.CSSProperties = {
      height: "auto",
      width: "auto",
    };

    if (!full) {
      style = { ...style, height, width };
    }

    if (spanX) {
      style = { ...style, gridColumn: `span ${spanX}` };
    }

    if (spanY) {
      style = { ...style, gridRow: `span ${spanY}` };
    }

    return style;
  };

  const buildClassName = () => {
    let className = "wall flex items-center justify-center font-serif ";
    if (full) {
      className += "h-full w-full ";
    } else {
      className += "max-h-full max-w-full ";
    }
    if (noBottom) className += "no-border-bottom ";
    if (noTop) className += "no-border-top ";
    if (noRight) className += "no-border-right ";
    if (noLeft) className += "no-border-left ";
    return className.slice(0, -1);
  };

  return (
    <div className={buildClassName()} style={getStyle()}>
      {label}
    </div>
  );
};

export default Area;
