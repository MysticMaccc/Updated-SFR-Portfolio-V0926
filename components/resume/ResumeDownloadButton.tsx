'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import { createClient } from '@/lib/supabase/client';
import { defaultPortfolioData } from '@/lib/defaultData';
import type { PortfolioData } from '@/types';

interface Props {
  data?: PortfolioData;
  variant?: 'default' | 'hero';
}

export default function ResumeDownloadButton({ data, variant = 'default' }: Props) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleDownload() {
    setLoading(true);
    try {
      let portfolioData = data;
      if (!portfolioData) {
        const [profile, projects, skills, experiences, trainings] = await Promise.all([
          supabase.from('profiles').select('*').single(),
          supabase.from('projects').select('*').order('order_index'),
          supabase.from('skills').select('*').order('order_index'),
          supabase.from('experiences').select('*').order('order_index'),
          supabase.from('trainings').select('*').order('order_index'),
        ]);
        portfolioData = {
          profile: profile.data ?? defaultPortfolioData.profile,
          projects: projects.data?.length ? projects.data : defaultPortfolioData.projects,
          skills: skills.data?.length ? skills.data : defaultPortfolioData.skills,
          experiences: experiences.data?.length ? experiences.data : defaultPortfolioData.experiences,
          trainings: trainings.data?.length ? trainings.data : defaultPortfolioData.trainings,
        };
      }

      const blob = await pdf(<ResumePDF data={portfolioData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${portfolioData.profile?.name ?? 'Resume'}_Resume.pdf`.replace(/\s+/g, '_');
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const className =
    variant === 'hero'
      ? 'ios-btn-secondary w-full sm:w-auto justify-center disabled:opacity-60'
      : 'ios-btn-secondary disabled:opacity-60';

  return (
    <button onClick={handleDownload} disabled={loading} className={className}>
      <Download className="w-4 h-4" />
      {loading ? 'Generating…' : 'Download CV'}
    </button>
  );
}
