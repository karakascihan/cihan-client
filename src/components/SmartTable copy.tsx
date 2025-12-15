import React, { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { setSelectedRows } from "@/store/slices/selectedRowsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

type SummaryType = "sum" | "avg" | "count";

export interface ColumnFilterOption {
  label: string;
  value: string | number;
}

export interface Column<T> {
  header: string;
  accessor: keyof T | "__index" | "__select";
  sortable?: boolean;
  filterable?: boolean;
  headerClassName?: string;
  body?: (value: T) => React.ReactNode;
  summaryType?: SummaryType;
  filterType?: "select" | "text" | "checkbox" | "date"; // sadece select olacak
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
  scrollHeight?: string; // örn: "400px"
  frozenColumns?: (keyof T | IFrozenColumn)[];
  externalSselectedRows?: T[]; // ✅ dışarıdan gelen seçilen satırlar
  onSelectedRowChange?: (rows: T) => void; // ✅ değişim bildirimi
  isExport?: boolean;
  groupBy?: string;
  groupTitle?: string[];
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
  function getNestedValue<T>(obj: T, path: string): any {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        if (col.accessor === "__index" || col.accessor === "__select")
          return true;
        if (!col.filterable) return true;

        const filterValue = filters[col.accessor as string];
        if (!filterValue) return true;

        const cellValue = row[col.accessor as keyof T];

        if (col.filterType === "checkbox") {
          // filterValue: "true" | "false"
          if (filterValue === "true") {
            return !!cellValue === true;
          } else if (filterValue === "false") {
            return !!cellValue === false;
          } else {
            return true; // no filter
          }
        }

        // Diğer filtre tipleri:
        const cellStr = String(cellValue ?? "").toLowerCase();
        return cellStr.includes(filterValue.toLowerCase());
      })
    );
  }, [data, columns, filters]);
  // Sıralama filtrelenmiş veride
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

  // Eğer gruplama varsa sortedData üzerinden grup oluştur (filtre ve sıralı data)
  const groupedSortedData = groupBy
    ? sortedData.reduce((acc, item) => {
        const key = String(item[groupBy as keyof T] ?? "Diğer");
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {} as Record<string, T[]>)
    : { All: sortedData };

  // Sayfalama (gruplama ile sayfalama kafa karıştırabilir, burada sayfalama tüm veride uygulanıyor)
  // Burada sayfalama grup bazında değil tüm data bazında uygulanıyor.
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
    setFilters((prev) => {
      if (value === "toggle") {
        // Toggle checkbox filter
        const current = prev[accessor];
        let newVal;
        if (!current) newVal = "true";
        else if (current === "true") newVal = "false";
        else newVal = "";
        return { ...prev, [accessor]: newVal };
      } else {
        return { ...prev, [accessor]: value };
      }
    });
    setPage(1);
    setSortKey(null);
  };

  const handleSelectRow = (id: number | string, checked: boolean) => {
    const updatedSelection = new Set(selectedRows);

    if (checked) {
      updatedSelection.add(id);
    } else {
      updatedSelection.delete(id);
    }

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

    if (checked) {
      ids.forEach((id) => updatedSelection.add(id));
    } else {
      ids.forEach((id) => updatedSelection.delete(id));
    }

    dispatch(
      setSelectedRows({
        tableId: "my-table-id",
        rows: Array.from(updatedSelection),
      })
    );
  };

  const exportToCSV = () => {
    const rows = sortedData.map((row, i) => {
      const obj: Record<string, string | number> = {};
      columns.forEach((col) => {
        if (col.accessor === "__index") {
          obj["#"] = enablePagination ? i + 1 : i + 1;
        } else if (col.accessor !== "__select") {
          obj[col.header] = String(row[col.accessor as keyof T] ?? "");
        }
      });
      return obj;
    });

    const csvContent = [
      Object.keys(rows[0]).join(","),
      ...rows.map((row) =>
        Object.values(row)
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    const rows = sortedData.map((row, i) => {
      const obj: Record<string, string | number> = {};
      columns.forEach((col) => {
        if (col.accessor === "__index") {
          obj["#"] = i + 1;
        } else if (col.accessor !== "__select") {
          obj[col.header] = String(row[col.accessor as keyof T] ?? "");
        }
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
          const total = numericValues.reduce(
            (acc, val) => acc + (val as number),
            0
          );
          summary[accessor] = {
            avg: numericValues.length > 0 ? total / numericValues.length : 0,
          };
          break;

        case "count":
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
              onClick={(x) => newRecordVoid()}
              className="px-3 py-1 border rounded cursor-pointer bg-green-500 text-white"
            >
              Yeni Kayıt
            </button>
          )}
          {isExport && (
            <button
              onClick={exportToExcel}
              className="px-3 py-1 border rounded ursor-pointer bg-blue-500 text-white"
            >
              Excel Export
            </button>
          )}
        </div>

        <table
          className={
            " min-w-full border-b table-fixed content-normal border-gray-200  " +
            tableClassName
          }
        >
          <thead className="bg-gray-100 sticky top-0 z-20">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className={`border-b border-gray-300 bg-gray-200 px-4 py-2 ${
                    col.headerClassName ?? ""
                  }  ${(() => {
                    const frozenIndex = frozenColumns?.findIndex(
                      (fc) => fc.name === col.accessor
                    );
                    if (frozenIndex === -1) return "";

                    const frozen = frozenColumns![frozenIndex];
                    const offset = `${frozenIndex *64}`; // her kolon genişliğine göre değiştir

                    return frozen.right
                      ? `sticky right-${offset} bg-white z-10 `
                      : `sticky left-${offset} bg-white z-10 `;
                  })()}${col.sortable ? "cursor-pointer select-none" : ""}`}
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
              {columns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className={`border-b  border-gray-200 px-4 py-2   ${(() => {
                    const frozenIndex = frozenColumns?.findIndex(
                      (fc) => fc.name === col.accessor
                    );
                    if (frozenIndex === -1) return "";

                    const frozen = frozenColumns![frozenIndex];
                    const offset = `${frozenIndex *64}`; // her kolon genişliğine göre değiştir

                    return frozen.right
                      ? `sticky right-${offset} bg-white z-10 `
                      : `sticky left-${offset} bg-white z-10 `;
                  })()}`}
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
                        className="border rounded px-2  py-1   text-sm"
                      >
                        <option value="">Tümü</option>
                        {col.filterOptions?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : col.filterType === "checkbox" ? (
                      <input
                        type="checkbox"
                        placeholder=""
                        checked={filters[col.accessor as string] === "true"}
                        onChange={() =>
                          handleFilterChange(col.accessor as string, "toggle")
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    ) : col.filterType === "date" ? (
                      <input
                        type="date"
                        placeholder=""
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            col.accessor as string,
                            e.target.value.toString()
                          )
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder=""
                        value={filters[col.accessor as string] || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            col.accessor as string,
                            e.target.value
                          )
                        }
                        className="border rounded px-2 py-1 w-full text-sm"
                      />
                    ))}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {groupBy
              ? Object.entries(groupedSortedData).map(([groupName, rows]) => {
                  const isMulti = rows.length > 1;

                  if (!isMulti) {
                    const row = rows[0];
                    const id = row[rowIdAccessor] as number | string;
                    const indexInSorted = sortedData.findIndex(
                      (d) => d[rowIdAccessor] === id
                    );
                    return (
                      <tr key={id} className="hover:bg-gray-200 cursor-pointer">
                        {columns.map((col) => (
                          <td
                            key={String(col.accessor)}
                            className={`border-b border-gray-200 px-4 py-2   ${(() => {
                              const frozenIndex = frozenColumns?.findIndex(
                                (fc) => fc.name === col.accessor
                              );
                              if (frozenIndex === -1) return "";

                              const frozen = frozenColumns![frozenIndex];
                              const offset = `${frozenIndex *64}`; // her kolon genişliğine göre değiştir

                              return frozen.right
                                ? `sticky right-${offset} bg-white z-10 `
                                : `sticky left-${offset} bg-white z-10 `;
                            })()}`}
                          >
                            {col.accessor === "__index" ? (
                              enablePagination ? (
                                (page - 1) * pageSize + indexInSorted + 1
                              ) : (
                                indexInSorted + 1
                              )
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
                  }

                  // Kayıt sayısı birden fazla ise grup olarak göster
                  return (
                    <React.Fragment key={groupName}>
                      <tr
                        className="bg-gray-100 cursor-pointer select-none"
                        onClick={() => toggleGroup(groupName)}
                      >
                        <td colSpan={columns.length}>
                          <div className="flex items-center gap-2">
                            <span>
                              {openGroups.includes(groupName) ? "▼" : "▶"}
                            </span>
                            <strong>
                              {groupTitle &&
                                groupTitle.reduce(
                                  (acc, p) => acc + rows[0][p] + " ",
                                  ""
                                )}{" "}
                              ({rows.length})
                            </strong>
                          </div>
                        </td>
                      </tr>

                      {openGroups.includes(groupName) &&
                        rows.map((row) => {
                          const id = row[rowIdAccessor] as number | string;
                          const indexInSorted = sortedData.findIndex(
                            (d) => d[rowIdAccessor] === id
                          );

                          return (
                            <tr
                              key={id}
                              className="hover:bg-gray-200 cursor-pointer"
                            >
                              {columns.map((col) => (
                                <td
                                  key={String(col.accessor)}
                                  className={`border-b border-gray-200 px-7 py-2  ${(() => {
                                    const frozenIndex =
                                      frozenColumns?.findIndex(
                                        (fc) => fc.name === col.accessor
                                      );
                                    if (frozenIndex === -1) return "";

                                    const frozen = frozenColumns![frozenIndex];
                                    const offset = `${frozenIndex *64}`; // her kolon genişliğine göre değiştir

                                    return frozen.right
                                      ? `sticky right-${offset} bg-white z-10 `
                                      : `sticky left-${offset} bg-white z-10 `;
                                  })()}`}
                                >
                                  {col.accessor === "__index" ? (
                                    enablePagination ? (
                                      (page - 1) * pageSize + indexInSorted + 1
                                    ) : (
                                      indexInSorted + 1
                                    )
                                  ) : col.accessor === "__select" ? (
                                    <input
                                      type="checkbox"
                                      checked={
                                        selectedRows?.includes(id) ?? false
                                      }
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
                    </React.Fragment>
                  );
                })
              : pagedData.map((row) => {
                  const id = row[rowIdAccessor] as number | string;
                  const indexInSorted = sortedData.findIndex(
                    (d) => d[rowIdAccessor] === id
                  );
                  return (
                    <tr key={id} className="hover:bg-gray-200 cursor-pointer">
                      {columns.map((col) => (
                        <td
                          key={String(col.accessor)}
                          className={`border-b border-gray-200 px-4 py-2  ${(() => {
                            const frozenIndex = frozenColumns?.findIndex(
                              (fc) => fc.name === col.accessor
                            );
                            if (frozenIndex === -1) return "";

                            const frozen = frozenColumns![frozenIndex];
                            const offset = `${frozenIndex *64}`; // her kolon genişliğine göre değiştir

                            return frozen.right
                              ? `sticky right-${offset} bg-white z-10 `
                              : `sticky left-${offset} bg-white z-10 `;
                          })()}`}
                        >
                          {col.accessor === "__index" ? (
                            enablePagination ? (
                              (page - 1) * pageSize + indexInSorted + 1
                            ) : (
                              indexInSorted + 1
                            )
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
                if (!s || !col.summaryType)
                  return <td key={col.accessor.toString()}></td>;

                switch (col.summaryType) {
                  case "sum":
                    return (
                      <td className="px-4 py-2" key={col.accessor.toString()}>
                        Toplam: {s.sum}
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
                    return (
                      <td
                        className="px-4 py-2"
                        key={col.accessor.toString()}
                      ></td>
                    );
                }
              })}
            </tr>
          </tfoot>
        </table>

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
