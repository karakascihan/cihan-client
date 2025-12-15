// components/FileTree.tsx
import { Folder } from "@/types/commonType";
import React from "react";

interface FileTreeProps {
  folders: Folder[];
  onSelectFolder: (folderId: number) => void;
  selectedFolderId: number | null;
}

const FileTree: React.FC<FileTreeProps> = ({ folders, onSelectFolder, selectedFolderId }) => {
  const renderFolder = (folder: Folder) => (
    <div key={folder.id} className="ml-4">
      <div
        onClick={() => onSelectFolder(folder.id)}
        className={`cursor-pointer p-1 rounded ${selectedFolderId === folder.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
      >
        📁 {folder.name}
      </div>
      {folder.subFolders && folder.subFolders.length > 0 && (
        <div className="ml-4">
          {folder.subFolders.map(sub => renderFolder(sub))}
        </div>
      )}
    </div>
  );

  return <div>{folders.map(folder => renderFolder(folder))}</div>;
};

export default FileTree;
