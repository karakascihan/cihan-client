import React from "react";

interface FilePreviewModalProps {
  fileUrl: string;
  title: string;
}

/**
 * Modal component for previewing PDF and image files
 */
export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  fileUrl,
  title,
}) => {
  return (
    <iframe
      src={fileUrl}
      width="100%"
      height="100%"
      style={{ border: "none" }}
      title={title || "File Preview"}
    />
  );
};
