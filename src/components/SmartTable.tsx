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
  hidden?: boolean;
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
  const offsetPx = frozenIndex * 150;

  return {
    position: "sticky",
    backgroundColor,
    zIndex: 10,
    left: frozen.right ? undefined : offsetPx,
    right: frozen.right ? offsetPx : undefined,
  };
}

function getValueByPath(obj: any, path: string) {
  return path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .reduce((acc, key) => acc?.[key], obj);
}

// Shared style constants
const checkboxClass =
  "h-4 w-4 rounded border-gray-300 text-blue-600 accent-blue-600 " +
  "focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer";

const filterInputClass =
  "w-full h-7 rounded-md border border-gray-200 bg-white px-2 " +
  "text-xs text-gray-700 placeholder:text-gray-400 " +
  "transition-colors focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";

const IconSortAsc = () => (
  <svg className="w-3.5 h-3.5 inline ml-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
  </svg>
);

const IconSortDesc = () => (
  <svg className="w-3.5 h-3.5 inline ml-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
  </svg>
);

const IconCalendar = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconEmpty = () => (
  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 10h18M3 14h18M10 3v18M14 3v18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
  </svg>
);

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
  const [datePickerPosition, setDatePickerPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const tableWrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = () => setActiveDatePicker(null);
    if (activeDatePicker) window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [activeDatePicker]);

  // Filtreleme
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        if (col.accessor === "__index" || col.accessor === "__select") return true;
        if (!col.filterable) return true;

        const cellValue = getValueByPath(row, col.accessor as string);

        if (col.filterType === "date_range") {
          const start = filters[(col.accessor as string) + "_start"];
          const end = filters[(col.accessor as string) + "_end"];
          if (!start && !end) return true;
          if (!cellValue) return false;
          const cellDate = new Date(cellValue);
          if (start) {
            const startDate = new Date(start);
            startDate.setHours(0, 0, 0, 0);
            if (cellDate < startDate) return false;
          }
          if (end) {
            const endDate = new Date(end);
            endDate.setHours(23, 59, 59, 999);
            if (cellDate > endDate) return false;
          }
          return true;
        }

        const filterValue = filters[col.accessor as string];
        if (!filterValue) return true;

        if (col.filterType === "checkbox") {
          if (filterValue === "true") return !!cellValue === true;
          if (filterValue === "false") return !!cellValue === false;
          return true;
        }

        if (col.filterType === "id_select") {
          const filteredIds = col.filterOptions
            ?.filter((opt) => Normalize(opt.label).includes(Normalize(filterValue)))
            .map((opt) => opt.value);
          return filteredIds?.includes(cellValue);
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
      prev.includes(groupKey) ? prev.filter((g) => g !== groupKey) : [...prev, groupKey]
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
    dispatch(setSelectedRows({ tableId: "my-table-id", rows: Array.from(updatedSelection) }));
  };

  const handleSelectAll = (checked: boolean) => {
    const ids = pagedData.map((row) => row[rowIdAccessor]) as (number | string)[];
    const updatedSelection = new Set(selectedRows);
    if (checked) ids.forEach((id) => updatedSelection.add(id));
    else ids.forEach((id) => updatedSelection.delete(id));
    dispatch(setSelectedRows({ tableId: "my-table-id", rows: Array.from(updatedSelection) }));
  };

  const exportToExcel = () => {
    const rows = sortedData.map((row, i) => {
      const obj: Record<string, string | number> = {};
      columns.forEach((col) => {
        if (col.hidden) return;
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
    const summary: Record<string, { sum?: number; count?: number; avg?: number }> = {};
    columns.forEach((col) => {
      if (col.hidden) return;
      const accessor = col.accessor;
      const summaryType = col.summaryType;
      if (!summaryType) return;
      const values = sortedData.map((row) => (row as any)[accessor]);
      switch (summaryType) {
        case "sum":
          summary[accessor as string] = {
            sum: values.reduce((acc: number, val: unknown) => acc + (typeof val === "number" ? val : 0), 0),
          };
          break;
        case "avg": {
          const numericValues = values.filter((val) => typeof val === "number");
          const total = numericValues.reduce((acc: number, val: unknown) => acc + (val as number), 0);
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
      }
    });
    return summary;
  };

  const summaryData = useMemo(() => calculateSummary(), [sortedData]);
  const visibleColumns = columns.filter((col) => !col.hidden);

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white/80 backdrop-blur px-3 py-2 shadow-sm dark:bg-gray-900/80 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {newRecordVoid && (
            <button
              onClick={() => newRecordVoid()}
              className="inline-flex items-center gap-1.5 h-8 px-3 text-sm font-semibold rounded-lg bg-blue-600 text-white border border-blue-700 shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Yeni Kayıt
            </button>
          )}

          {isExport && (
            <button
              onClick={exportToExcel}
              className="inline-flex items-center gap-1.5 h-8 px-3 text-sm font-medium rounded-lg bg-white text-gray-700 border border-gray-300 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" strokeWidth={2} />
              Excel
            </button>
          )}
        </div>

        {sortedData.length > 0 && (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {sortedData.length} kayıt
          </span>
        )}
      </div>

      {/* Table wrapper */}
      <div
        ref={tableWrapperRef}
        className="relative w-full overflow-x-auto overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700"
        style={{ maxHeight: scrollHeight }}
      >
        <table
          className={
            "min-w-full table-auto border-separate border-spacing-0 " +
            (tableClassName ?? "")
          }
        >
          {/* Header */}
          <thead className="sticky top-0 z-20">
            {/* Column titles */}
            <tr className="bg-gray-50 dark:bg-gray-800">
              {visibleColumns.map((col, colIndex) => (
                <th
                  key={String(col.accessor)}
                  style={getStickyStyle(col, frozenColumns, colIndex, "#f9fafb")}
                  onClick={() => handleSort(col)}
                  className={
                    "border-b border-gray-200 dark:border-gray-700 px-4 py-2.5 text-left text-xs font-semibold tracking-wide text-gray-600 dark:text-gray-400 whitespace-nowrap " +
                    (col.headerClassName ?? "") +
                    (col.sortable ? " cursor-pointer select-none hover:text-blue-600 dark:hover:text-blue-400" : "")
                  }
                >
                  {col.accessor === "__select" ? (
                    <input
                      type="checkbox"
                      className={checkboxClass}
                      checked={
                        pagedData.length > 0 &&
                        pagedData.every((row) => selectedRows?.includes(row[rowIdAccessor] as number | string))
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  ) : (
                    <span className="inline-flex items-center gap-0.5">
                      {col.header}
                      {sortKey === col.accessor && col.sortable && (
                        sortOrder === "asc" ? <IconSortAsc /> : <IconSortDesc />
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>

            {/* Filter row */}
            <tr className="bg-gray-50 dark:bg-gray-800">
              {visibleColumns.map((col, colIndex) => (
                <th
                  key={String(col.accessor)}
                  style={getStickyStyle(col, frozenColumns, colIndex, "#f9fafb")}
                  className="border-b border-gray-200 dark:border-gray-700 px-2 py-1.5 whitespace-nowrap"
                >
                  {col.filterable &&
                    col.accessor !== "__index" &&
                    col.accessor !== "__select" &&
                    (col.filterType === "select" ? (
                      <select
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) => handleFilterChange(col.accessor as string, e.target.value)}
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
                        onChange={(e) => handleFilterChange(col.accessor as string, e.target.value)}
                        placeholder=""
                        className={filterInputClass}
                      />
                    ) : col.filterType === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={filters[col.accessor as string] === "true"}
                        onChange={() => handleFilterChange(col.accessor as string, "toggle")}
                        className={checkboxClass}
                      />
                    ) : col.filterType === "date" ? (
                      <input
                        type="date"
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) => handleFilterChange(col.accessor as string, e.target.value)}
                        className={filterInputClass}
                      />
                    ) : col.filterType === "date_range" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                          const wrapperRect = tableWrapperRef.current?.getBoundingClientRect();
                          if (wrapperRect) {
                            setDatePickerPosition({
                              top: rect.bottom - wrapperRect.top + 6,
                              left: rect.left - wrapperRect.left,
                            });
                          }
                          setActiveDatePicker(col.accessor as string);
                        }}
                        title="Tarih Aralığı"
                        className={
                          "inline-flex items-center justify-center h-7 w-7 rounded-md border text-gray-500 transition-colors " +
                          (filters[(col.accessor as string) + "_start"] || filters[(col.accessor as string) + "_end"]
                            ? "border-blue-400 bg-blue-50 text-blue-600"
                            : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300")
                        }
                      >
                        <IconCalendar />
                      </button>
                    ) : (
                      <input
                        type="text"
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) => handleFilterChange(col.accessor as string, e.target.value)}
                        placeholder=""
                        className={filterInputClass}
                      />
                    ))}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {pagedData.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length}
                  className="px-4 py-14 text-center"
                >
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <IconEmpty />
                    <span className="text-sm">Kayıt bulunamadı</span>
                  </div>
                </td>
              </tr>
            ) : (
              pagedData.map((row) => {
                const id = row[rowIdAccessor] as number | string;
                const indexInSorted = sortedData.findIndex((d) => d[rowIdAccessor] === id);
                const isSelected = selectedRows?.includes(id);

                return (
                  <tr
                    key={id}
                    onDoubleClick={() => onDoubleClick && onDoubleClick(row)}
                    className={
                      "transition-colors cursor-pointer " +
                      (isSelected
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "odd:bg-white even:bg-gray-50/50 hover:bg-blue-50/40 dark:odd:bg-gray-900 dark:even:bg-gray-800/40 dark:hover:bg-blue-900/10")
                    }
                  >
                    {visibleColumns.map((col, colIndex) => (
                      <td
                        key={String(col.accessor)}
                        style={getStickyStyle(col, frozenColumns, colIndex, isSelected ? "#eff6ff" : "#ffffff")}
                        className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap dark:text-gray-300"
                      >
                        {col.accessor === "__index" ? (
                          enablePagination
                            ? (page - 1) * pageSize + indexInSorted + 1
                            : indexInSorted + 1
                        ) : col.accessor === "__select" ? (
                          <input
                            type="checkbox"
                            checked={isSelected ?? false}
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
              })
            )}
          </tbody>

          {/* Summary footer */}
          {columns.some((c) => c.summaryType && !c.hidden) && (
            <tfoot className="sticky bottom-0 z-10 bg-gray-50/90 dark:bg-gray-800/90 backdrop-blur border-t-2 border-gray-200 dark:border-gray-700">
              <tr>
                {columns.map((col) => {
                  if (col.hidden) return null;
                  const s = (summaryData as any)[col.accessor as any];
                  if (!s || !col.summaryType)
                    return (
                      <td key={col.accessor.toString()} className="px-4 py-2" />
                    );

                  const content =
                    col.summaryType === "sum"
                      ? `∑ ${s.sum?.toLocaleString()}`
                      : col.summaryType === "avg"
                      ? `⌀ ${s.avg?.toFixed(1)}`
                      : `# ${s.count}`;

                  return (
                    <td
                      key={col.accessor.toString()}
                      className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400"
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          )}
        </table>

        {/* Date range picker popup */}
        {activeDatePicker && datePickerPosition && (
          <div
            className="absolute z-50 w-80 rounded-xl border border-gray-200 bg-white shadow-xl p-4 dark:bg-gray-800 dark:border-gray-700"
            style={{ top: datePickerPosition.top, left: datePickerPosition.left }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Tarih Aralığı Seç
            </h4>
            <Calendar
              startDate={filters[activeDatePicker + "_start"] || ""}
              endDate={filters[activeDatePicker + "_end"] || ""}
              onSelect={(start, end) => {
                handleFilterChange(activeDatePicker + "_start", start);
                handleFilterChange(activeDatePicker + "_end", end);
              }}
            />
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                onClick={() => {
                  handleFilterChange(activeDatePicker + "_start", "");
                  handleFilterChange(activeDatePicker + "_end", "");
                }}
              >
                Temizle
              </button>
              <button
                className="inline-flex items-center gap-1.5 h-8 px-4 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                onClick={() => setActiveDatePicker(null)}
              >
                Tamam
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {enablePagination && (
          <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 h-8 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Önceki
            </button>

            <span className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-200">{page}</span>
              {" / "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">{totalPages}</span>
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 h-8 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Sonraki
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
