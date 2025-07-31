import { useTheme } from "next-themes";
import React from "react";

/**
 * SegmentedProgressCircle
 * Renders a circular progress indicator split into discrete segments with gaps.
 *
 * Props:
 * - segments: total number of segments in the circle (default 8)
 * - progress: number of active segments (default 3)
 * - size: width/height of the SVG in pixels (default 120)
 * - strokeWidth: thickness of the circle stroke (default 12)
 * - activeColor: color of completed segments (default '#346fff')
 * - inactiveColor: color of remaining segments (default '#2a2a2a')
 * - gap: length of gap between segments, in pixels along the circle circumference (default 4)
 */
const SegmentedProgressCircle = ({
  segments = 8,
  progress = 3,
  size = 120,
  strokeWidth = 12,
  activeColor = "#346fff",
  inactiveColor = "#2a2a2a",
  textColor = "#fff",
  gap = 4,
}) => {
  const { theme } = useTheme();
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // length of each segment (dash) along the circumference
  const dashLength = circumference / segments - gap;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({ length: segments }).map((_, i) => {
        // For each segment, draw a single dash and a large gap to position it
        const dashArray = `${dashLength} ${circumference}`;
        const offset = -(i * (dashLength + gap));
        const color = i < progress ? activeColor : inactiveColor;

        return (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${center} ${center})`}
          />
        );
      })}

      {/* Center text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={textColor}
        fontSize={size * 0.2}
        fontWeight="bold"
      >
        {progress} de {segments}
      </text>
    </svg>
  );
};

export default SegmentedProgressCircle;
