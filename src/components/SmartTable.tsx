import React, { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { setSelectedRows } from "@/store/slices/selectedRowsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Normalize } from "@/utils/commonUtils";
import { Calendar } from "./Calendar";

type SummaryType = "sum" | "avg" | "count";

export interface ColumnFilterOption {
  label: string;
  value: string | number;
}

export interface Column<T> {
  header: string;
  accessor: keyof T | "__index" | "__select";
  accessor2?: keyof T ;
  sortable?: boolean;
  filterable?: boolean;
  headerClassName?: string;
  body?: (value: T) => React.ReactNode;
  summaryType?: SummaryType;
  filterType?: "select" | "text" | "checkbox" | "date" | "id_select" | "date_range";
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
  onDoubleClick?:  (row: T) => void;
}

// Sticky style hesaplama fonksiyonu
function getStickyStyle<T>(
  col: Column<T>,
  frozenColumns?: (keyof T | IFrozenColumn)[],
  colIndex: number = 0,
  backgroundColor:string="white"
): React.CSSProperties | undefined {
  if (!frozenColumns) return undefined;

  const frozenIndex = frozenColumns.findIndex((fc) => {
    if (typeof fc === "string") return fc === col.accessor;
    else return fc.name === col.accessor;
  });

  if (frozenIndex === -1) return undefined;

  const frozen = frozenColumns[frozenIndex];
  const offsetPx = frozenIndex * 150; // her kolon genişliği (px), ihtiyaca göre değiştirilebilir

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
    .split(".")                   // "educations.0.state"
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
  onDoubleClick
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

  // Filtreleme
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        if (col.accessor === "__index" || col.accessor === "__select")
          return true;
        if (!col.filterable) return true;

        const filterValue = filters[col.filterType==="date_range" ? col.accessor as string+"_start"||col.accessor as string+"_end" : col.accessor as string];
        if (!filterValue) return true;

        // const cellValue = row[col.accessor as keyof T];
        const cellValue =getValueByPath(row,col.accessor);

        if (col.filterType === "checkbox") {
          if (filterValue === "true") return !!cellValue === true;
          else if (filterValue === "false") return !!cellValue === false;
          else return true;
        }
        if (col.filterType === "id_select") { 
          let filteredIds = col.filterOptions
            ?.filter((opt) =>
               Normalize(opt.label).includes(Normalize(filterValue))
            )
            .map((opt) => opt.value);
          // if (!filteredIds || filteredIds.length === 0) return true;
          return filteredIds.includes(cellValue);
        }
if (col.filterType === "date_range") {
  const start = filters[col.accessor + "_start"];
  const end = filters[col.accessor + "_end"];
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
          summary[accessor] = {
            sum: values.reduce(
              (acc, val) => acc + (typeof val === "number" ? val : 0),
              0
            ),
          };
          break;
        case "avg":
          const numericValues = values.filter((val) => typeof val === "number");
          const total = numericValues.reduce((acc, val) => acc + (val as number), 0);
          summary[accessor] = {
            avg: numericValues.length > 0 ? total / numericValues.length : 0,
          };
          break;
            case      "count":
            summary[accessor] = {
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
        className="w-full overflow-x-auto overflow-y-auto"
        style={{ maxHeight: scrollHeight }}
      >
        <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
          {newRecordVoid && (
            <button
              onClick={() => newRecordVoid()}
              className="px-3 py-1 border rounded cursor-pointer bg-green-500 text-white"
            >
              Yeni Kayıt
            </button>
          )}
          {isExport && (
            <button
              onClick={exportToExcel}
              className="px-3 py-1 border rounded cursor-pointer bg-blue-500 text-white"
            >
              Excel Export
            </button>
          )}
        </div>

        <table
          className={
            "min-w-full border-b table-auto content-normal border-gray-200 " +
            tableClassName
          }
        >
          <thead className="bg-gray-100 sticky top-0 z-20">
            <tr>
              {columns.map((col, colIndex) => (
                <th
                  key={String(col.accessor)}
                  style={getStickyStyle(col, frozenColumns, colIndex,"#f3f4f6")}
                  className={`border-b border-gray-300 px-4 py-2 whitespace-nowrap ${
                    col.headerClassName ?? ""
                  } ${col.sortable ? "cursor-pointer select-none" : ""}`}
                  onClick={() => handleSort(col)}
                >
                  {col.accessor === "__select" ? (
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                  style={getStickyStyle(col, frozenColumns, colIndex,"#f3f4f6")}
                  className="border-b border-gray-200 px-4 py-2 whitespace-nowrap"
                >
                  {col.filterable &&
                    col.accessor !== "__index" &&
                    col.accessor !== "__select" &&
                    (col.filterType === "select" ? (
                      <select
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) =>
                          handleFilterChange(col.accessor as string, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="">Tümü</option>
                        {col.filterOptions?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )
                    :
                      col.filterType === "id_select" ? (
                      <input
                        type="text"
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) =>
                          handleFilterChange(col.accessor as string, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      />
                  
                    ) : col.filterType === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={filters[col.accessor as string] === "true"}
                        onChange={() =>
                          handleFilterChange(col.accessor as string, "toggle")
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                        className="border rounded px-2 py-1 w-full text-sm"
                      />
                    ) : 
                    col.filterType === "date_range" ? (
 <button
  onClick={(e) => {
    e.stopPropagation();
    setActiveDatePicker(col.accessor as string);
  }}
  className="px-2 py-1 text-gray-600 hover:text-black"
  title="Tarih Aralığı"
>
  📅
</button>

)
:

                    (
                      <input
                        type="text"
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) =>
                          handleFilterChange(col.accessor as string, e.target.value)
                        }
                        className="border rounded px-2 py-1 w-full text-sm"
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
                <tr onDoubleClick={()=>onDoubleClick&&onDoubleClick(row)} key={id} className="hover:bg-gray-200 cursor-pointer">
                  {columns.map((col, colIndex) => (
                    <td
                      key={String(col.accessor)}
                      style={getStickyStyle(col, frozenColumns, colIndex,"#fbf9fa")}
                      className="border-b border-gray-200 px-4 py-2 whitespace-nowrap"
                    >
                      {col.accessor === "__index" ? (
                        enablePagination ? (page - 1) * pageSize + indexInSorted + 1 : indexInSorted + 1
                      ) : col.accessor === "__select" ? (
                        <input
                          type="checkbox"
                          checked={selectedRows?.includes(id) ?? false}
                          onChange={(e) => {
                            handleSelectRow(id, e.target.checked);
                            onSelectedRowChange?.(row);
                          }}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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

          <tfoot className="bg-gray-50 font-semibold text-sm sticky bottom-0 z-10">
            <tr>
              {columns.map((col) => {
                const s = summaryData[col.accessor];
                if (!s || !col.summaryType) return <td key={col.accessor.toString()}></td>;

                switch (col.summaryType) {
                  case "sum":
                    return <td className="px-4 py-2" key={col.accessor.toString()}>Toplam: {s.sum.toLocaleString()}</td>;
                  case "avg":
                    return <td className="px-4 py-2" key={col.accessor.toString()}>Ortalama: {s.avg?.toFixed(1)}</td>;
                  case "count":
                    return <td className="px-4 py-2" key={col.accessor.toString()}>Kayıt Sayısı: {s.count}</td>;
                  default:
                    return <td className="px-4 py-2" key={col.accessor.toString()}></td>;
                }
              })}
            </tr>
          </tfoot>
        </table>
{activeDatePicker && (
  <div
    className="absolute z-50 bg-white shadow-md border rounded p-3"
    style={{
      top: "120px",
      left: "500px"
    }}
    onClick={(e) => e.stopPropagation()} // kapanmayı engelle
  >
    <h4 className="font-semibold text-sm mb-2">Tarih Aralığı Seç</h4>

    {/* Takvim Grid */}
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
        className="px-3 py-1 bg-gray-200 rounded"
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
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Önceki
            </button>
            <span className="flex items-center">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Sonraki
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
}

