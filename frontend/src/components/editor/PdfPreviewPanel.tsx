import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Typography, CircularProgress, Fade } from '@mui/material';
import { PictureAsPdf as PdfIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';

// Load worker from CDN — avoids all local file serving / MIME type issues in Docker/nginx
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  pdfUrl: string | null;
  previewLoading: boolean;
  compileError: string | null;
}

export default function PdfPreviewPanel({ pdfUrl, previewLoading, compileError }: Props) {
  const [numPages, setNumPages] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Leave 48px padding on each side; cap at 760px (≈letter paper at screen resolution)
  const pageWidth = containerWidth > 0 ? Math.min(containerWidth - 96, 760) : 0;

  return (
    <Box
      ref={containerRef}
      sx={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        bgcolor: '#f3f4f6',
        overflow: 'auto',
      }}
    >
      {/* PDF pages rendered as canvases — white paper on grey background */}
      {pdfUrl && pageWidth > 0 && (
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={null}
          error={null}
        >
          <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            {Array.from({ length: numPages }, (_, i) => (
              <Box
                key={i}
                sx={{
                  boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
                  bgcolor: '#ffffff',
                  lineHeight: 0, // remove extra gap under canvas
                }}
              >
                <Page
                  pageNumber={i + 1}
                  width={pageWidth}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Box>
            ))}
          </Box>
        </Document>
      )}

      {/* Empty state */}
      {!pdfUrl && !previewLoading && !compileError && (
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          color: '#9ca3af',
        }}>
          <PdfIcon sx={{ fontSize: 52 }} />
          <Typography variant="body2" color="inherit">Resume preview will appear here</Typography>
        </Box>
      )}

      {/* Compilation error */}
      {!previewLoading && compileError && (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', m: 3, gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#dc2626' }}>
            <ErrorIcon fontSize="small" />
            <Typography variant="body2" fontWeight={700} color="inherit">PDF compilation failed</Typography>
          </Box>
          <Box sx={{ flex: 1, bgcolor: '#1e1e1e', borderRadius: 1.5, p: 2, overflow: 'auto' }}>
            <Typography
              variant="caption"
              component="pre"
              sx={{ color: '#f87171', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            >
              {compileError}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Compiling overlay */}
      <Fade in={previewLoading} unmountOnExit={false}>
        <Box sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          bgcolor: 'rgba(243,244,246,0.85)',
          backdropFilter: 'blur(3px)',
          pointerEvents: previewLoading ? 'auto' : 'none',
        }}>
          <CircularProgress size={32} thickness={3} sx={{ color: '#4f46e5' }} />
          <Typography variant="caption" color="text.secondary">Compiling PDF…</Typography>
        </Box>
      </Fade>
    </Box>
  );
}
