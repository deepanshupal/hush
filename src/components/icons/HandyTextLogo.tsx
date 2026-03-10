import React from "react";

interface HandyTextLogoProps {
  width?: number;
}

export const HandyTextLogo = ({ width }: HandyTextLogoProps) => (
  <span style={{
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: "28px",
    fontWeight: "600",
    letterSpacing: "-1px",
    color: "#00C9B1",
  }}>
    flow<span style={{ opacity: 0.4 }}>·</span>y
  </span>
);

export default HandyTextLogo;
