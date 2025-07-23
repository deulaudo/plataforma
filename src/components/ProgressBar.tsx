import { useMemo } from "react";

type ProgressSegment = {
  value: number; // Percentage (0-100)
  color: string; // CSS color value (hex, rgb, tailwind class, etc.)
  label?: string; // Optional label for accessibility
};

type ProgressBarProps = {
  segments: ProgressSegment[];
  height?: number; // Height in pixels
  className?: string;
  showLabels?: boolean;
  rounded?: boolean;
};

const ProgressBar = ({
  segments,
  height = 8,
  className = "",
  showLabels = false,
  rounded = true,
}: ProgressBarProps) => {
  const totalValue = useMemo(() => {
    return segments.reduce((sum, segment) => sum + segment.value, 0);
  }, [segments]);

  const normalizedSegments = useMemo(() => {
    return segments.map((segment) => ({
      ...segment,
      normalizedValue:
        totalValue > 100 ? (segment.value / totalValue) * 100 : segment.value,
    }));
  }, [segments, totalValue]);

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative w-full bg-gray-200 dark:bg-gray-700 overflow-hidden ${
          rounded ? "rounded-full" : ""
        }`}
        style={{ height: `${height}px` }}
      >
        {normalizedSegments.map((segment, index) => {
          const leftOffset = normalizedSegments
            .slice(0, index)
            .reduce((sum, seg) => sum + seg.normalizedValue, 0);

          return (
            <div
              key={index}
              className="absolute top-0 h-full transition-all duration-300 ease-in-out"
              style={{
                left: `${leftOffset}%`,
                width: `${segment.normalizedValue}%`,
                backgroundColor:
                  segment.color.startsWith("#") ||
                  segment.color.startsWith("rgb")
                    ? segment.color
                    : undefined,
              }}
              {...(!segment.color.startsWith("#") &&
                !segment.color.startsWith("rgb") && {
                  className: `absolute top-0 h-full transition-all duration-300 ease-in-out ${segment.color}`,
                })}
              aria-label={
                segment.label ||
                `Progress segment ${index + 1}: ${segment.value}%`
              }
            />
          );
        })}
      </div>

      {showLabels && (
        <div className="mt-2 flex flex-wrap gap-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-1 text-sm">
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor:
                    segment.color.startsWith("#") ||
                    segment.color.startsWith("rgb")
                      ? segment.color
                      : undefined,
                }}
                {...(!segment.color.startsWith("#") &&
                  !segment.color.startsWith("rgb") && {
                    className: `w-3 h-3 rounded-sm ${segment.color}`,
                  })}
              />
              <span className="text-gray-700 dark:text-gray-300">
                {segment.label || `${segment.value}%`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
