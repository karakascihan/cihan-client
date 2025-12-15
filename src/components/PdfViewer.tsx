import React, { useEffect, useRef } from "react";
import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.mjs?url"; // Vite/Webpack için önemli

// Worker'ı tanımla
GlobalWorkerOptions.workerSrc = workerUrl;

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderPDF = async () => {
      try {
        const loadingTask = getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context!,
          viewport,
        }).promise;
      } catch (error) {
        console.error("PDF yüklenemedi:", error);
      }
    };

    renderPDF();
  }, [pdfUrl]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    </div>
  );
};

export default PdfViewer;
