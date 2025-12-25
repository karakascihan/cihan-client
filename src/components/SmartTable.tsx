import React, { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { setSelectedRows } from "@/store/slices/selectedRowsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Normalize } from "@/utils/commonUtils";
import { Calendar } from "./Calendar";
import { Download } from "lucide-react";

type SummaryType = "sum" | "avg" | "count";

export interface ColumnFilterOption {
  label: string;
  value: string | number;
}

export interface Column<T> {
  header: string;
  accessor: keyof T | "__index" | "__select";
  accessor2?: keyof T;
  sortable?: boolean;
  filterable?: boolean;
  headerClassName?: string;
  body?: (value: T) => React.ReactNode;
  summaryType?: SummaryType;
  filterType?:
    | "select"
    | "text"
    | "checkbox"
    | "date"
    | "id_select"
    | "date_range";
  filterOptions?: ColumnFilterOption[];
}

interface IFrozenColumn {
  name: string;
  right: boolean;
}

export interface SmartTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowIdAccessor: keyof T;
  tableClassName?: string;
  onDeleteSelected?: (ids: (number | string)[]) => void;
  enablePagination?: boolean;
  pageSize?: number;
  newRecordVoid?: (data?: any) => void;
  scrollable?: boolean;
  scrollHeight?: string;
  frozenColumns?: (keyof T | IFrozenColumn)[];
  externalSselectedRows?: T[];
  onSelectedRowChange?: (rows: T) => void;
  isExport?: boolean;
  groupBy?: string;
  groupTitle?: string[];
  onDoubleClick?: (row: T) => void;
}

// Sticky style hesaplama fonksiyonu
function getStickyStyle<T>(
  col: Column<T>,
  frozenColumns?: (keyof T | IFrozenColumn)[],
  colIndex: number = 0,
  backgroundColor: string = "white"
): React.CSSProperties | undefined {
  if (!frozenColumns) return undefined;

  const frozenIndex = frozenColumns.findIndex((fc) => {
    if (typeof fc === "string") return fc === col.accessor;
    else return fc.name === col.accessor;
  });

  if (frozenIndex === -1) return undefined;

  const frozen = frozenColumns[frozenIndex];
  const offsetPx = frozenIndex * 150; // her kolon genişliği (px)

  return {
    position: "sticky",
    backgroundColor: backgroundColor,
    zIndex: 10,
    left: frozen.right ? undefined : offsetPx,
    right: frozen.right ? offsetPx : undefined,
  };
}

function getValueByPath(obj: any, path: string) {
  return path
    .replace(/\[(\d+)\]/g, ".$1") // [0] → .0
    .split(".") // "educations.0.state"
    .reduce((acc, key) => acc?.[key], obj);
}

export function SmartTable<T extends object>({
  data,
  columns,
  rowIdAccessor,
  onDeleteSelected,
  enablePagination = true,
  pageSize = 5,
  tableClassName,
  newRecordVoid,
  scrollable,
  scrollHeight,
  frozenColumns,
  isExport,
  groupBy,
  groupTitle,
  onSelectedRowChange,
  onDoubleClick,
}: SmartTableProps<T>) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const dispatch = useDispatch();
  const selectedRows = useSelector(
    (state: RootState) => state.selectedRows["my-table-id"] || []
  );
  const [activeDatePicker, setActiveDatePicker] = useState<string | null>(null);

  // ✅ görsel-only: ortak classlar
  const checkboxClass = `
    h-4 w-4
    rounded
    border-slate-300
    text-emerald-600
    focus:ring-2 focus:ring-emerald-200
  `;

  const filterInputClass = `
    w-full h-8
    rounded-md
    border border-slate-200
    bg-white
    px-2.5
    text-xs text-slate-700
    placeholder:text-slate-400
    shadow-inner
    transition-colors
    focus:outline-none
    focus:border-slate-300
    focus:ring-2 focus:ring-slate-200
  `;

  const dateRangeBtnClass = `
    inline-flex items-center justify-center
    h-8 w-8
    rounded-md
    border border-slate-200
    bg-white
    text-slate-600
    shadow-sm
    transition-all duration-200 ease-out transform
    hover:-translate-y-0.5
    hover:bg-slate-50
    hover:text-slate-900
    hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-slate-200
  `;

  // Filtreleme
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        if (col.accessor === "__index" || col.accessor === "__select")
          return true;
        if (!col.filterable) return true;

        const filterValue =
          filters[
            col.filterType === "date_range"
              ? ((col.accessor as string) + "_start" ||
                  (col.accessor as string) + "_end")
              : (col.accessor as string)
          ];

        if (!filterValue) return true;

        const cellValue = getValueByPath(row, col.accessor);

        if (col.filterType === "checkbox") {
          if (filterValue === "true") return !!cellValue === true;
          else if (filterValue === "false") return !!cellValue === false;
          else return true;
        }

        if (col.filterType === "id_select") {
          const filteredIds = col.filterOptions
            ?.filter((opt) =>
              Normalize(opt.label).includes(Normalize(filterValue))
            )
            .map((opt) => opt.value);

          return filteredIds?.includes(cellValue);
        }

        if (col.filterType === "date_range") {
          const start = filters[(col.accessor as string) + "_start"];
          const end = filters[(col.accessor as string) + "_end"];
          const cellDate = cellValue ? new Date(cellValue) : null;

          if (start) {
            const startDate = new Date(start);
            if (!cellDate || cellDate < startDate) return false;
          }

          if (end) {
            const endDate = new Date(end);
            endDate.setHours(23, 59, 59, 999);
            if (!cellDate || cellDate > endDate) return false;
          }

          return true;
        }

        const cellStr = String(cellValue ?? "").toLowerCase();
        return cellStr.includes(filterValue.toLowerCase());
      })
    );
  }, [data, columns, filters]);

  // Sıralama
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      return (aVal > bVal ? 1 : -1) * (sortOrder === "asc" ? 1 : -1);
    });
  }, [filteredData, sortKey, sortOrder]);

  const groupedSortedData = groupBy
    ? sortedData.reduce((acc, item) => {
        const key = String(item[groupBy as keyof T] ?? "Diğer");
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {} as Record<string, T[]>)
    : { All: sortedData };

  const pagedData = useMemo(() => {
    if (!enablePagination) return sortedData;
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, enablePagination, pageSize]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));

  const toggleGroup = (groupKey: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupKey)
        ? prev.filter((g) => g !== groupKey)
        : [...prev, groupKey]
    );
  };

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    const key = col.accessor as keyof T;
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (accessor: string, value: string) => {
    setFilters((prev) => ({ ...prev, [accessor]: value }));
    setPage(1);
    setSortKey(null);
  };

  const handleSelectRow = (id: number | string, checked: boolean) => {
    const updatedSelection = new Set(selectedRows);
    if (checked) updatedSelection.add(id);
    else updatedSelection.delete(id);

    dispatch(
      setSelectedRows({
        tableId: "my-table-id",
        rows: Array.from(updatedSelection),
      })
    );
  };

  const handleSelectAll = (checked: boolean) => {
    const ids = pagedData.map((row) => row[rowIdAccessor]) as (
      | number
      | string
    )[];
    const updatedSelection = new Set(selectedRows);
    if (checked) ids.forEach((id) => updatedSelection.add(id));
    else ids.forEach((id) => updatedSelection.delete(id));

    dispatch(
      setSelectedRows({
        tableId: "my-table-id",
        rows: Array.from(updatedSelection),
      })
    );
  };

  // Export işlemleri (Excel / CSV)
  const exportToExcel = () => {
    const rows = sortedData.map((row, i) => {
      const obj: Record<string, string | number> = {};
      columns.forEach((col) => {
        if (col.accessor === "__index") obj["#"] = i + 1;
        else if (col.accessor !== "__select")
          obj[col.header] = String(row[col.accessor as keyof T] ?? "");
      });
      return obj;
    });
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "export.xlsx");
  };

  const calculateSummary = () => {
    const summary: Record<
      string,
      { sum?: number; count?: number; avg?: number; value?: number | string }
    > = {};
    columns.forEach((col) => {
      const accessor = col.accessor;
      const summaryType = col.summaryType;
      if (!summaryType) return;
      const values = sortedData.map((row) => (row as any)[accessor]);
      switch (summaryType) {
        case "sum":
          summary[accessor as string] = {
            sum: values.reduce(
              (acc: number, val: unknown) =>
                acc + (typeof val === "number" ? val : 0),
              0
            ),
          };
          break;
        case "avg": {
          const numericValues = values.filter((val) => typeof val === "number");
          const total = numericValues.reduce(
            (acc: number, val: unknown) => acc + (val as number),
            0
          );
          summary[accessor as string] = {
            avg: numericValues.length > 0 ? total / numericValues.length : 0,
          };
          break;
        }
        case "count":
          summary[accessor as string] = {
            count: values.filter((v) => v !== null && v !== undefined).length,
          };
          break;
        default:
          break;
      }
    });
    return summary;
  };

  const summaryData = useMemo(() => calculateSummary(), [sortedData]);

  return (
    <div className="p-4">
      <div
        className="
          w-full overflow-x-auto overflow-y-auto
          rounded-xl border border-slate-200
          bg-white
          shadow-sm
        "
        style={{ maxHeight: scrollHeight }}
      >
        <div
          className="
            mb-3 flex flex-wrap items-center justify-between gap-3
            rounded-lg border border-slate-200 bg-white/70 backdrop-blur
            px-3 py-2 shadow-sm
          "
        >
          {newRecordVoid && (
            <button
              onClick={() => newRecordVoid()}
              className="
                inline-flex items-center justify-center gap-1.5
                h-8 px-3
                text-md font-semibold
                rounded-md
                bg-emerald-600/90
                border border-emerald-700/60
                text-white
                shadow-sm
                transition-all duration-200 ease-out transform
                hover:-translate-y-0.5
                hover:bg-emerald-700
                hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:ring-offset-1
                active:translate-y-0 active:shadow-sm
              "
            >
              <span className="text-md leading-none">＋</span>
              Yeni Kayıt
            </button>
          )}

          {isExport && (
            <button
              onClick={exportToExcel}
              className="
                group
                inline-flex items-center gap-1.5
                h-8 px-3
                text-md font-semibold
                rounded-md
                bg-slate-900
                border border-slate-700
                text-slate-100
                shadow-sm
                transition-all duration-200 ease-out transform
                hover:-translate-y-0.5
                hover:bg-slate-800
                hover:border-slate-600
                hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-slate-400/60 focus:ring-offset-1
                active:translate-y-0 active:shadow-sm
              "
            >
              Excel Export
              <Download
                className="
                  ml-1
                  w-3.5 h-3.5
                  text-slate-200/90
                  transition-transform duration-200 ease-out
                  group-hover:translate-y-[1px]
                "
                strokeWidth={2.4}
              />
            </button>
          )}
        </div>

        <table
          className={
            "min-w-full table-auto border-separate border-spacing-0 border-b border-slate-200 " +
            (tableClassName ?? "")
          }
        >
          <thead className="bg-slate-50 sticky top-0 z-20">
            <tr>
              {columns.map((col, colIndex) => (
                <th
                  key={String(col.accessor)}
                  style={getStickyStyle(col, frozenColumns, colIndex, "#f3f4f6")}
                  className={`border-b border-slate-200 px-4 py-2 text-md font-semibold tracking-wide text-slate-700 whitespace-nowrap ${
                    col.headerClassName ?? ""
                  } ${
                    col.sortable
                      ? "cursor-pointer select-none hover:text-slate-900"
                      : ""
                  }`}
                  onClick={() => handleSort(col)}
                >
                  {col.accessor === "__select" ? (
                    <input
                      type="checkbox"
                      className={checkboxClass}
                      checked={pagedData.every((row) =>
                        selectedRows?.includes(
                          row[rowIdAccessor] as number | string
                        )
                      )}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  ) : (
                    <>
                      {col.header}
                      {sortKey === col.accessor && col.sortable
                        ? sortOrder === "asc"
                          ? " 🔼"
                          : " 🔽"
                        : ""}
                    </>
                  )}
                </th>
              ))}
            </tr>

            <tr>
              {columns.map((col, colIndex) => (
                <th
                  key={String(col.accessor)}
                  style={getStickyStyle(col, frozenColumns, colIndex, "#f3f4f6")}
                  className="border-b border-slate-200 px-4 py-2 whitespace-nowrap"
                >
                  {col.filterable &&
                    col.accessor !== "__index" &&
                    col.accessor !== "__select" &&
                    (col.filterType === "select" ? (
                      <select
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            col.accessor as string,
                            e.target.value
                          )
                        }
                        className={filterInputClass}
                      >
                        <option value="">Tümü</option>
                        {col.filterOptions?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : col.filterType === "id_select" ? (
                      <input
                        type="text"
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            col.accessor as string,
                            e.target.value
                          )
                        }
                        className={filterInputClass}
                      />
                    ) : col.filterType === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={filters[col.accessor as string] === "true"}
                        onChange={() =>
                          handleFilterChange(col.accessor as string, "toggle")
                        }
                        className={checkboxClass}
                      />
                    ) : col.filterType === "date" ? (
                      <input
                        type="date"
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            col.accessor as string,
                            e.target.value.toString()
                          )
                        }
                        className={filterInputClass}
                      />
                    ) : col.filterType === "date_range" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDatePicker(col.accessor as string);
                        }}
                        className={dateRangeBtnClass}
                        title="Tarih Aralığı"
                      >
                        📅
                      </button>
                    ) : (
                      <input
                        type="text"
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            col.accessor as string,
                            e.target.value
                          )
                        }
                        className={filterInputClass}
                      />
                    ))}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pagedData.map((row) => {
              const id = row[rowIdAccessor] as number | string;
              const indexInSorted = sortedData.findIndex(
                (d) => d[rowIdAccessor] === id
              );

              return (
                <tr
                  onDoubleClick={() => onDoubleClick && onDoubleClick(row)}
                  key={id}
                  className="
                    cursor-pointer
                    transition-colors
                    odd:bg-white even:bg-slate-50/30
                    hover:bg-slate-100/60
                  "
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={String(col.accessor)}
                      style={getStickyStyle(
                        col,
                        frozenColumns,
                        colIndex,
                        "#fbf9fa"
                      )}
                      className="border-b border-slate-200 px-4 py-2 whitespace-nowrap"
                    >
                      {col.accessor === "__index" ? (
                        enablePagination
                          ? (page - 1) * pageSize + indexInSorted + 1
                          : indexInSorted + 1
                      ) : col.accessor === "__select" ? (
                        <input
                          type="checkbox"
                          checked={selectedRows?.includes(id) ?? false}
                          onChange={(e) => {
                            handleSelectRow(id, e.target.checked);
                            onSelectedRowChange?.(row);
                          }}
                          className={checkboxClass}
                        />
                      ) : col.body ? (
                        col.body(row)
                      ) : (
                        (row as any)[col.accessor]
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>

          <tfoot className="bg-slate-50/80 backdrop-blur font-semibold text-xs text-slate-700 sticky bottom-0 z-10">
            <tr>
              {columns.map((col) => {
                const s = (summaryData as any)[col.accessor as any];
                if (!s || !col.summaryType)
                  return <td key={col.accessor.toString()}></td>;

                switch (col.summaryType) {
                  case "sum":
                    return (
                      <td className="px-4 py-2" key={col.accessor.toString()}>
                        Toplam: {s.sum.toLocaleString()}
                      </td>
                    );
                  case "avg":
                    return (
                      <td className="px-4 py-2" key={col.accessor.toString()}>
                        Ortalama: {s.avg?.toFixed(1)}
                      </td>
                    );
                  case "count":
                    return (
                      <td className="px-4 py-2" key={col.accessor.toString()}>
                        Kayıt Sayısı: {s.count}
                      </td>
                    );
                  default:
                    return <td className="px-4 py-2" key={col.accessor.toString()} />;
                }
              })}
            </tr>
          </tfoot>
        </table>

        {activeDatePicker && (
          <div
            className="absolute z-50 rounded-xl border border-slate-200 bg-white shadow-lg p-3"
            style={{ top: "120px", left: "500px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-semibold text-sm mb-2">Tarih Aralığı Seç</h4>

            <Calendar
              startDate={filters[activeDatePicker + "_start"] || ""}
              endDate={filters[activeDatePicker + "_end"] || ""}
              onSelect={(start, end) => {
                handleFilterChange(activeDatePicker + "_start", start);
                handleFilterChange(activeDatePicker + "_end", end);
              }}
            />

            <div className="flex justify-end gap-2 mt-3">
              <button
                className="
                  inline-flex items-center
                  h-8 px-3
                  text-xs font-semibold
                  rounded-md
                  border border-slate-200
                  bg-white
                  text-slate-700
                  shadow-sm
                  transition-colors
                  hover:bg-slate-50
                "
                onClick={() => setActiveDatePicker(null)}
              >
                Kapat
              </button>
            </div>
          </div>
        )}

        {enablePagination && (
          <div className="flex justify-between mt-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="
                inline-flex items-center
                h-8 px-3
                text-md font-semibold
                rounded-md
                border border-slate-200
                bg-white
                text-slate-700
                shadow-sm
                transition-all duration-200
                hover:bg-slate-50
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Önceki
            </button>
            <span className="flex items-center">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="
                inline-flex items-center
                h-8 px-3
                text-md font-semibold
                rounded-md
                border border-slate-200
                bg-white
                text-slate-700
                shadow-sm
                transition-all duration-200
                hover:bg-slate-50
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Sonraki
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
