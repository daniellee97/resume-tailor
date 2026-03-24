import { Box, TextField, Typography } from '@mui/material';
import type { ResumeHeader } from '../../../types';

interface Props {
  data: ResumeHeader;
  onChange: (data: ResumeHeader) => void;
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.68rem' }}>
        {label}
      </Typography>
      <TextField
        fullWidth size="small" value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#fafafa', fontSize: '0.875rem' } }}
      />
    </Box>
  );
}

export default function HeaderSection({ data, onChange }: Props) {
  const set = (key: keyof ResumeHeader) => (val: string) => onChange({ ...data, [key]: val });

  return (
    <Box sx={{ p: 2.5 }}>
      <Field label="Full Name" value={data.name} onChange={set('name')} placeholder="e.g. Jane Smith" />
      <Field label="Phone" value={data.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
      <Field label="Email" value={data.email} onChange={set('email')} placeholder="jane@example.com" />
      <Field label="Location" value={data.location} onChange={set('location')} placeholder="City, State, Country" />
      <Field label="LinkedIn" value={data.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/username" />
      <Field label="GitHub" value={data.github} onChange={set('github')} placeholder="github.com/username" />
      <Field label="Website" value={data.website} onChange={set('website')} placeholder="yoursite.dev" />
    </Box>
  );
}
