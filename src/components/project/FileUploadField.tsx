import React from "react";
import { FaFileAlt, FaTrash } from "react-icons/fa";

interface FileUploadFieldProps {
  index: number;
  fileName: string;
  onPreview: () => void;
  onDelete: () => void;
  readOnly?: boolean;
}

/**
 * Reusable file upload field component with preview and delete actions
 */
export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  index,
  fileName,
  onPreview,
  onDelete,
  readOnly = true,
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={fileName}
        readOnly={readOnly}
        className="flex-1 px-3 py-2 border rounded"
      />
      <button
        type="button"
        onClick={onPreview}
        className="p-2 text-blue-600 hover:text-blue-800"
        title="Önizleme"
      >
        <FaFileAlt />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="p-2 text-red-600 hover:text-red-800"
        title="Sil"
      >
        <FaTrash />
      </button>
    </div>
  );
};
