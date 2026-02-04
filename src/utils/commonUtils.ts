import { ActivityState, ActivityType, OpportunityStage } from "@/api/apiDtos";

export const  parseToJsDate = (input:string) :Date=> {
  // 7 basamaklı nanosaniye kısmını milisaniyeye düşür
  const match = input.match(/^(.+\.\d{3})/);
  const iso = match ? match[1] : input;
  return new Date(iso);
}
export function getMimeType(extension: string): string | undefined {
  const mimeTypes: Record<string, string> = {
    // Text / Office
    txt: "text/plain",
    html: "text/html",
    htm: "text/html",
    css: "text/css",
    csv: "text/csv",
    json: "application/json",
    xml: "application/xml",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    // Images
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    bmp: "image/bmp",
    ico: "image/x-icon",
    tiff: "image/tiff",
    heic: "image/heic",

    // Audio
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    aac: "audio/aac",
    flac: "audio/flac",
    weba: "audio/webm",

    // Video
    mp4: "video/mp4",
    webm: "video/webm",
    ogv: "video/ogg",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    mkv: "video/x-matroska",
    "3gp": "video/3gpp",

    // Archives
    zip: "application/zip",
    rar: "application/vnd.rar",
    "7z": "application/x-7z-compressed",
    gz: "application/gzip",
    tar: "application/x-tar",

    // Other
    exe: "application/vnd.microsoft.portable-executable",
    apk: "application/vnd.android.package-archive",
    iso: "application/x-iso9660-image",
    rtf: "application/rtf",
    epub: "application/epub+zip",
  };

  const ext = extension.trim().toLowerCase().replace('.', '');
  return mimeTypes[ext];
}
export function getExtensionFromMimeType(mimeType: string): string | undefined {
  const extensionMap: Record<string, string> = {
    // Text / Office
    "text/plain": "txt",
    "text/html": "html",
    "text/css": "css",
    "text/csv": "csv",
    "application/json": "json",
    "application/xml": "xml",
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",

    // Images
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "image/bmp": "bmp",
    "image/x-icon": "ico",
    "image/tiff": "tiff",
    "image/heic": "heic",

    // Audio
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "audio/ogg": "ogg",
    "audio/aac": "aac",
    "audio/flac": "flac",
    "audio/webm": "weba",

    // Video
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/ogg": "ogv",
    "video/quicktime": "mov",
    "video/x-msvideo": "avi",
    "video/x-matroska": "mkv",
    "video/3gpp": "3gp",

    // Archives
    "application/zip": "zip",
    "application/vnd.rar": "rar",
    "application/x-7z-compressed": "7z",
    "application/gzip": "gz",
    "application/x-tar": "tar",

    // Other
    "application/vnd.microsoft.portable-executable": "exe",
    "application/vnd.android.package-archive": "apk",
    "application/x-iso9660-image": "iso",
    "application/rtf": "rtf",
    "application/epub+zip": "epub"
  };

  return extensionMap[mimeType.trim().toLowerCase()];
}

export function toJsonPatch<T extends object>(obj: Partial<T>) {
  return Object.entries(obj).map(([key, value]) => ({
    op: "replace",
    path: `/${key}`,
    value,
  }));
}
export const formatDateForInput = (dateString: string | null | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const handleDownloadPDF = async () => {
  const element = document.getElementById("price-offer-card");
  if (!element) return;

  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pageWidth;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`Teklif_${offer.teklifBelgeNo || "Belge"}.pdf`);
};
  // Tarih formatı
export const formatDateForCalendar = (date: string | Date) => {
  const d = new Date(date);
  const tzOffset = d.getTimezoneOffset() * 60000;
  const localISOTime = new Date(d.getTime() - tzOffset)
    .toISOString()
    .slice(0, 16); // datetime-local için "YYYY-MM-DDTHH:mm"
  return localISOTime;
};

export const Normalize2 = (str:any) =>
  String(str)
    .toLocaleLowerCase("tr")
   // .toLowerCase()
    // .normalize("NFKD")
    // .replace(/[\u0300-\u036f]/g, "");
export const Normalize = (str:any) =>
  (str || "")
    .trim()
    .toLocaleLowerCase("tr")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");

export const convertFileToBase64 = async  (file:File)=> {
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // data:application/pdf;base64,AAAA...
      const base64 = reader.result.split(",")[1]; // SADECE BASE64
      resolve(base64);
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
}
export function toInputDate(dateStr:string) {
  let date= new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}
export function getEnumKeyByValue<
  T extends Record<string, string>
>(enumObj: T, value: string): keyof T | undefined {
  return (Object.keys(enumObj) as Array<keyof T>).find(
    (key) => enumObj[key] === value
  );
}
