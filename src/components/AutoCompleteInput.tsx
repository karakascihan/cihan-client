import React from "react";

export const AutocompleteInput = ({
  placeholder,
  items,
  onSelect,
}: any) => {
  const [query, setQuery] = React.useState("");

  const filtered = items.filter((i: any) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-gray-300 py-2 focus:outline-none"
      />

      {query && (
        <div className="absolute z-10 bg-white shadow rounded w-full mt-1">
          {filtered.map((i: any) => (
            <div
              key={i.id}
              onClick={() => {
                onSelect(i);
                setQuery(i.name);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {i.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
