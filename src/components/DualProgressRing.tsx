import React from "react";

/**
 * DualProgressRing
 *
 * Props:
 * - p1: number // percentage for the first segment (0-100)
 * - p2: number // percentage for the second segment (0-100)
 * - size?: number // diameter in px (default 220)
 * - thickness?: number // ring thickness in px (default 22)
 * - color1?: string // first segment color (default '#22c55e' - green)
 * - color2?: string // second segment color (default '#ef4444' - red)
 * - trackColor?: string // track color (default 'rgba(255,255,255,0.08)')
 * - startAngle?: number // in degrees, default -90 (12 o'clock)
 * - className?: string
 * - children?: React.ReactNode // centered content
 *
 * Notes:
 * - Segments are drawn in order: segment #1 then segment #2.
 * - Values do not need to sum to 100; any remainder will show as track.
 */
export function DualProgressRing({
  p1,
  p2,
  size = 220,
  thickness = 22,
  color1 = "#22c55e",
  color2 = "#ef4444",
  trackColor = "rgba(255,255,255,0.08)",
  startAngle = -90,
  className = "",
  children,
}: {
  p1: number;
  p2: number;
  size?: number;
  thickness?: number;
  color1?: string;
  color2?: string;
  trackColor?: string;
  startAngle?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const clamped1 = Math.max(0, Math.min(100, p1));
  const clamped2 = Math.max(0, Math.min(100, p2));

  const r = (size - thickness) / 2; // radius
  const C = 2 * Math.PI * r; // circumference

  // helpers to compute dasharray and offsets for each segment
  const len1 = (C * clamped1) / 100;
  const len2 = (C * clamped2) / 100;

  // SVG uses dash pattern: [visible, gap]. Using a large gap hides the rest
  const dash1 = `${len1} ${C - len1}`;
  const dash2 = `${len2} ${C - len2}`;

  // Offset for segment 2 starts right after segment 1
  const offset2 = -len1; // negative moves forward along the path

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
      >
        <g transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={trackColor}
            strokeWidth={thickness}
          />
          {/* Segment #1 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color1}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={dash1}
            strokeDashoffset={0}
          />
          {/* Segment #2 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color2}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={dash2}
            strokeDashoffset={offset2}
          />
        </g>
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 grid place-items-center select-none">
        <div className="text-center">{children}</div>
      </div>
    </div>
  );
}

export default DualProgressRing;
