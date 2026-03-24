import { Box, TextField, Typography } from '@mui/material';

interface Props {
  data: string;
  onChange: (data: string) => void;
}

export default function SkillsSection({ data, onChange }: Props) {
  return (
    <Box sx={{ p: 2.5 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.75, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.68rem' }}>
        Skills (comma-separated)
      </Typography>
      <TextField
        fullWidth multiline rows={5} value={data}
        placeholder="Python, TypeScript, React, Node.js, Docker, AWS, PostgreSQL..."
        onChange={(e) => onChange(e.target.value)}
        sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#fafafa', fontSize: '0.875rem' } }}
      />
      <Typography variant="caption" color="text.disabled" sx={{ mt: 0.75, display: 'block' }}>
        List skills separated by commas. They will appear as a single line on your resume.
      </Typography>
    </Box>
  );
}
