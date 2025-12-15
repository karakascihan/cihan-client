import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

interface ExcelEditorProps {
  fileUrl: string;
  onSave: (fileData: ArrayBuffer) => void; // Değişiklik sonrası kaydetmek için callback
}

const ExcelEditor: React.FC<ExcelEditorProps> = ({ fileUrl, onSave }) => {
  const [data, setData] = useState<(string | number | null)[][]>([]);
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);

  useEffect(() => {
    fetch(fileUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const wb = XLSX.read(buffer, { type: "array" });
        setWorkbook(wb);
        const firstSheetName = wb.SheetNames[0];
        const ws = wb.Sheets[firstSheetName];
        const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as (string | number | null)[][];
        setData(sheetData);
      });
  }, [fileUrl]);

  const handleCellChange = (row: number, col: number, value: string) => {
    setData((prev) => {
      const newData = [...prev];
      if (!newData[row]) newData[row] = [];
      newData[row][col] = value;
      return newData;
    });
  };

  const saveChanges = () => {
    if (!workbook) return;
    const firstSheetName = workbook.SheetNames[0];
    const newSheet = XLSX.utils.aoa_to_sheet(data);
    workbook.Sheets[firstSheetName] = newSheet;
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    onSave(wbout);
  };

  return (
    <div>
      <table border={1} style={{ borderCollapse: "collapse" }}>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "4px" }}>
                  <input
                    type="text"
                    value={cell ?? ""}
                    onChange={(e) => handleCellChange(i, j, e.target.value)}
                    style={{ width: "100px" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveChanges} style={{ marginTop: 10 }}>
        Kaydet
      </button>
    </div>
  );
};

export default ExcelEditor;
