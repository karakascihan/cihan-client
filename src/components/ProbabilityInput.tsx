import React from "react";
import { useController, Control } from "react-hook-form";

interface ProbabilityInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const ProbabilityInput: React.FC<ProbabilityInputProps> = ({
  name,
  control,
  min = 0,
  max = 100,
  step = 10,
}) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue: 0 });

  return (
    <div className="flex flex-col">
      {/* {label && <label className="mb-1 font-medium">{label}</label>} */}
      <div className="flex items-center space-x-6">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1  bg-blue-600 rounded-lg  accent-blue-600"
        />
        {/* <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            let val = Number(e.target.value);
            if (val > max) val = max;
            if (val < min) val = min;
            onChange(val);
          }}
          className="w-20 p-1 border rounded-md text-center"
        /> */}
        <span>% {value}</span>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
