import { useState } from "react";

export const  Calendar = ({ startDate, endDate, onSelect }) =>{
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const [rangeStart, setRangeStart] = useState(startDate || "");
  const [rangeEnd, setRangeEnd] = useState(endDate || "");

  function selectDay(day) {
    const date = new Date(year, month, day).toISOString().substring(0, 10);

    if (!rangeStart) {
      setRangeStart(date);
    } else if (!rangeEnd) {
      if (new Date(date) < new Date(rangeStart)) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
      onSelect(rangeStart === "" ? date : rangeStart, date);
    } else {
      setRangeStart(date);
      setRangeEnd("");
    }
  }

  return (
    <div className="select-none w-64">
      {/* Month selector */}
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => setMonth((m) => (m === 0 ? 11 : m - 1))}>
          ◀
        </button>
        <div className="font-semibold">{year} - {month + 1}</div>
        <button onClick={() => setMonth((m) => (m === 11 ? 0 : m + 1))}>
          ▶
        </button>
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7 text-center text-sm">
        {["P", "S", "Ç", "P", "C", "C", "P"].map((d) => (
          <div key={d} className="font-semibold">{d}</div>
        ))}

        {/* Empty slots */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={"e" + i}></div>
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, day) => {
          const d = day + 1;
          const iso = new Date(year, month, d).toISOString().substring(0, 10);

          const isSelected =
            (rangeStart && iso === rangeStart) ||
            (rangeEnd && iso === rangeEnd);

          const isInRange =
            rangeStart && rangeEnd &&
            new Date(iso) >= new Date(rangeStart) &&
            new Date(iso) <= new Date(rangeEnd);

          return (
            <div
              key={d}
              onClick={() => selectDay(d)}
              className={`
                cursor-pointer p-1 rounded
                ${isSelected ? "bg-blue-600 text-white" : ""}
                ${isInRange ? "bg-blue-200" : ""}
                hover:bg-gray-200
              `}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}
