// src/components/EnumSelect.tsx
import React from "react";

interface EnumSelectProps<T> {
  enumObject: T;
  value: T[keyof T];
  onChange: (value: T[keyof T]) => void;
  label?: string;
}

export function EnumSelect<T extends object>({
  enumObject,
  value,
  onChange,
  label
}: EnumSelectProps<T>) {
  const entries = Object.entries(enumObject);

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium">{label}</label>}
      <select
        className="border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value as T[keyof T])}
      >
        {entries.map(([key, val]) => (
          <option key={key} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}
