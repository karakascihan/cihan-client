import React from "react";

interface ProbabilityCircleProps {
  value: number; // 0 - 100
  size?: number; // px
  strokeWidth?: number; // px
  color?: string; // progress rengi
}

export const ProbabilityCircle: React.FC<ProbabilityCircleProps> = ({
  value,
  size = 120,
  strokeWidth = 12,
  color = "#3b82f6", // Tailwind blue-500
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>
        <circle
          stroke="#e5e7eb" // Tailwind gray-200
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-md font-semibold fill-gray-700"
        >
          {value}%
        </text>
      </svg>
      {/* <p className="text-sm text-gray-500 mt-2">Olasılık</p> */}
    </div>
  );
};

