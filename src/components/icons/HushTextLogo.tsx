import React from "react";
import hushWordmark from "../../assets/hush-wordmark.png";

interface HushTextLogoProps {
  width?: number;
  size?: "sm" | "md";
}

export const HushTextLogo = ({ width, size = "md" }: HushTextLogoProps) => {
  const resolvedWidth = width ?? (size === "sm" ? 120 : 180);
  return (
    <img
      src={hushWordmark}
      alt="Hush"
      style={{ width: resolvedWidth, height: "auto" }}
    />
  );
};

export default HushTextLogo;
