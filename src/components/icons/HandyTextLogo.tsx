import React from "react";
import hushWordmark from "../../assets/hush-wordmark.png";

interface HandyTextLogoProps {
  width?: number;
  size?: "sm" | "md";
}

export const HandyTextLogo = ({ width, size = "md" }: HandyTextLogoProps) => {
  const resolvedWidth = width ?? (size === "sm" ? 120 : 180);
  return (
    <img
      src={hushWordmark}
      alt="Hush"
      style={{ width: resolvedWidth, height: "auto" }}
    />
  );
};

export default HandyTextLogo;
