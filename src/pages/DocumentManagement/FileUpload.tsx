import { uploadDocument } from "@/services";
import React from "react";

interface FileUploadProps {
  folderId: number;
  onUploadSuccess?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ folderId, onUploadSuccess }) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      await uploadDocument(Array.from(files), folderId);
      alert("Dosyalar yüklendi.");
      onUploadSuccess?.();
    } catch (error) {
      alert("Yükleme başarısız: " + error);
    }
  };

  return <input type="file" multiple onChange={handleChange} />;
};

export default FileUpload;