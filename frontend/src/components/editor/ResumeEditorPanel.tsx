import { useState } from 'react';
import {
  Box, Typography, Collapse, Divider, Button,
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  FolderOpen as FolderIcon,
  Build as BuildIcon,
  ChevronRight as ChevronRightIcon,
  DragIndicator as DragIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import type { ResumeData } from '../../types';
import HeaderSection from './sections/HeaderSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';

interface SectionDef {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const SECTIONS: SectionDef[] = [
  { id: 'header', label: 'Resume Header', icon: <PersonIcon fontSize="small" /> },
  { id: 'education', label: 'Education', icon: <SchoolIcon fontSize="small" /> },
  { id: 'experience', label: 'Professional Experience', icon: <WorkIcon fontSize="small" /> },
  { id: 'projects', label: 'Projects & Outside Experience', icon: <FolderIcon fontSize="small" /> },
  { id: 'skills', label: 'Skills', icon: <BuildIcon fontSize="small" /> },
];

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeEditorPanel({ data, onChange }: Props) {
  const [openSection, setOpenSection] = useState<string | null>('header');

  const toggle = (id: string) => setOpenSection((prev) => (prev === id ? null : id));

  return (
    <Box sx={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      bgcolor: '#f8f9fa',
      overflow: 'hidden',
    }}>
      {/* Section list */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {SECTIONS.map((sec, idx) => (
          <Box key={sec.id}>
            {/* Section row */}
            <Box
              onClick={() => toggle(sec.id)}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                px: 2, py: 1.5, cursor: 'pointer',
                bgcolor: openSection === sec.id ? '#eef2ff' : 'transparent',
                borderLeft: openSection === sec.id ? '3px solid #4f46e5' : '3px solid transparent',
                transition: 'all 0.15s',
                '&:hover': { bgcolor: openSection === sec.id ? '#eef2ff' : '#f0f0f0' },
              }}
            >
              <DragIcon sx={{ color: '#d1d5db', fontSize: 18, flexShrink: 0 }} />
              <Box sx={{
                color: openSection === sec.id ? '#4f46e5' : '#6b7280',
                display: 'flex', alignItems: 'center',
              }}>
                {sec.icon}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  flex: 1, fontWeight: openSection === sec.id ? 600 : 500,
                  color: openSection === sec.id ? '#1e1b4b' : '#374151',
                  fontSize: '0.875rem',
                }}
              >
                {sec.label}
              </Typography>
              <ChevronRightIcon
                sx={{
                  fontSize: 18, color: '#9ca3af',
                  transform: openSection === sec.id ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </Box>

            {/* Expanded form */}
            <Collapse in={openSection === sec.id} unmountOnExit>
              <Box sx={{ bgcolor: '#ffffff', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
                {sec.id === 'header' && (
                  <HeaderSection data={data.header} onChange={(h) => onChange({ ...data, header: h })} />
                )}
                {sec.id === 'education' && (
                  <EducationSection data={data.education} onChange={(ed) => onChange({ ...data, education: ed })} />
                )}
                {sec.id === 'experience' && (
                  <ExperienceSection data={data.experience} onChange={(ex) => onChange({ ...data, experience: ex })} />
                )}
                {sec.id === 'projects' && (
                  <ProjectsSection data={data.projects} onChange={(pr) => onChange({ ...data, projects: pr })} />
                )}
                {sec.id === 'skills' && (
                  <SkillsSection data={data.skills} onChange={(sk) => onChange({ ...data, skills: sk })} />
                )}
              </Box>
            </Collapse>

            {idx < SECTIONS.length - 1 && <Divider sx={{ borderColor: '#e5e7eb' }} />}
          </Box>
        ))}
      </Box>

      {/* Add section button */}
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth size="small" startIcon={<AddIcon />}
          sx={{ color: '#6b7280', fontSize: '0.82rem', py: 0.75, border: '1px dashed #d1d5db', borderRadius: 1.5 }}
        >
          Add Custom Section
        </Button>
      </Box>
    </Box>
  );
}
