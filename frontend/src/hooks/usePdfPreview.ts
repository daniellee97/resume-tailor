import { useState, useCallback, useRef, useEffect } from 'react';
import { compilePdf } from '../api/resumeApi';

export function usePdfPreview(latexBody: string) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [compileError, setCompileError] = useState<string | null>(null);
  const pdfUrlRef = useRef<string | null>(null);

  const compile = useCallback(async (latex: string) => {
    setPreviewLoading(true);
    setCompileError(null);
    try {
      const { blob, pageCount: count } = await compilePdf(latex);
      setPageCount(count);

      // Explicitly type the blob as application/pdf for reliable browser rendering
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);

      if (pdfUrlRef.current) URL.revokeObjectURL(pdfUrlRef.current);
      pdfUrlRef.current = url;
      setPdfUrl(url);
    } catch (err: unknown) {
      setCompileError(err instanceof Error ? err.message : 'Compilation failed');
    } finally {
      setPreviewLoading(false);
    }
  }, []);

  // Recompile 1.5s after latex changes
  useEffect(() => {
    if (!latexBody) return;
    const timer = setTimeout(() => compile(latexBody), 1500);
    return () => clearTimeout(timer);
  }, [latexBody, compile]);

  // Revoke blob URL on unmount
  useEffect(() => {
    return () => {
      if (pdfUrlRef.current) URL.revokeObjectURL(pdfUrlRef.current);
    };
  }, []);

  return { pdfUrl, pageCount, setPageCount, previewLoading, compileError };
}
