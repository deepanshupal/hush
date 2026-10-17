import React from "react";

interface WaveIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

/** Two stacked sound waves: the Hush "dictation" glyph. */
const WaveIcon: React.FC<WaveIconProps> = ({
  width = 24,
  height = 24,
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M2 7 Q5.5 4 9 7 Q12.5 10 16 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M2 11 Q5.5 8 9 11 Q12.5 14 16 11"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export default WaveIcon;
