

export const getDocumentsByFolder = async (folderId: number) => {
  const res = await fetch(`/api/documents/folder/${folderId}`);
  if (!res.ok) {
    throw new Error("Dökümanlar alınamadı.");
  }
  return await res.json();
};

export const downloadDocument = async (documentId: number) => {
  const res = await fetch(`/api/documents/download/${documentId}`);
  if (!res.ok) {
    throw new Error("Döküman indirilemedi.");
  }
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "document";
  link.click();
  window.URL.revokeObjectURL(url);
};

export const createFolder = async (folder: { name: string; parentFolderId?: number }) => {
  const res = await fetch("/api/documents/create-folder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(folder)
  });
  if (!res.ok) {
    throw new Error("Klasör oluşturulamadı.");
  }
  return await res.json();
};

export const deleteFolder = async (id: number) => {
  const res = await fetch(`/api/documents/delete-folder/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Klasör silinemedi.");
  }
};
