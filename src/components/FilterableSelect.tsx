import React, { useState, useRef, useEffect } from "react";
import { ColumnFilterOption } from "./SmartTable";



interface FilterableSelectProps {
  options: ColumnFilterOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const FilterableSelect: React.FC<FilterableSelectProps> = ({
  options,
  placeholder = "Seçiniz...",
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ColumnFilterOption | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option: ColumnFilterOption) => {
    setSelected(option);
    setOpen(false);
    setSearch("");
    onChange?.(option.value);
  };

  return (
    <div className={`relative w-64 ${className ?? ""}`} ref={containerRef}>
      <button
        type="button"
        className="w-full border rounded px-4 py-2 text-left bg-white focus:outline-none focus:ring"
        onClick={() => setOpen((o) => !o)}
      >
        {selected?.label || placeholder}
        <span className="float-right">&#9662;</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
          <input
            type="text"
            className="w-full px-3 py-2 border-b focus:outline-none"
            placeholder="Ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <ul>
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-gray-500">Seçenek bulunamadı</li>
            )}
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterableSelect;
