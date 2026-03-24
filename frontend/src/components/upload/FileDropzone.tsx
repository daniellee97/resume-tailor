import { Box, Typography, IconButton } from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  PictureAsPdf as PdfIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface Props {
  file: File | null;
  isDragOver: boolean;
  onFileChange: (file: File | null) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
}

export default function FileDropzone({ file, isDragOver, onFileChange, onDrop, onDragOver, onDragLeave }: Props) {
  if (file) {
    return (
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 2, p: 2,
        border: '1px solid #bbf7d0', borderRadius: 2, bgcolor: '#f0fdf4',
      }}>
        <PdfIcon sx={{ color: '#dc2626', fontSize: 32 }} />
        <Box flex={1}>
          <Typography fontWeight={600} color="text.primary">{file.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {(file.size / 1024).toFixed(1)} KB
          </Typography>
        </Box>
        <IconButton size="small" color="error" onClick={() => onFileChange(null)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => document.getElementById('resume-input')?.click()}
      sx={{
        border: '2px dashed',
        borderColor: isDragOver ? 'primary.main' : '#cbd5e1',
        borderRadius: 2, p: 4, textAlign: 'center', cursor: 'pointer',
        bgcolor: isDragOver ? '#eff6ff' : '#f8fafc',
        transition: 'all 0.2s',
        '&:hover': { borderColor: 'primary.main', bgcolor: '#eff6ff' },
      }}
    >
      <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
      <Typography fontWeight={600} color="text.primary">Drag & drop your PDF</Typography>
      <Typography variant="body2" color="text.secondary">or click to browse</Typography>
      <input
        id="resume-input" type="file" accept=".pdf,application/pdf" hidden
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
      />
    </Box>
  );
}
