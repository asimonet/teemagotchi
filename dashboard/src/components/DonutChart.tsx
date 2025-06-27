import React from 'react';

interface DonutChartProps {
  /** 0–100 percent */
  value: number;
  /** Size in px */
  size?: number;
  /** SVG stroke width in px */
  strokeWidth?: number;
  /** Tailwind color class for the progress arc */
  colorClass: string;
  /** Center label */
  label: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  value,
  size = 120,
  strokeWidth = 12,
  colorClass,
  label,
}) => {
  const half = size / 2;
  const radius = half - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track */}
        <circle
          cx={half}
          cy={half}
          r={radius}
          stroke="#f3f3f8"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress */}
        <circle
          cx={half}
          cy={half}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={colorClass}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-brand-70">{label}</span>
      </div>
    </div>
  );
};
