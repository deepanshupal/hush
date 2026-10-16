import React from "react";
import hushWordmark from "../../assets/hush-wordmark.png";

interface HushTextLogoProps {
  width?: number;
  className?: string;
}

/** The Hush keycap wordmark. Raster artwork, so it reads on light and dark. */
const HushTextLogo: React.FC<HushTextLogoProps> = ({
  width = 160,
  className,
}) => (
  <img
    src={hushWordmark}
    alt="Hush"
    width={width}
    className={`h-auto select-none ${className ?? ""}`}
    draggable={false}
  />
);

export default HushTextLogo;
