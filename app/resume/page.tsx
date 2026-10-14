'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { defaultPortfolioData } from '@/lib/defaultData';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Profile } from '@/types';

const ResumeDownloadButton = dynamic(
  () => import('@/components/resume/ResumeDownloadButton'),
  { ssr: false, loading: () => (
    <span className="ios-btn-primary opacity-50 cursor-not-allowed">
      <Download className="w-4 h-4" /> Loading…
    </span>
  )}
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};

const SECTIONS = [
  { label: 'About',      href: '/about' },
  { label: 'Skills',     href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Training',   href: '/training' },
];

export default function ResumePage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.from('profiles').select('*').single().then(({ data }) => {
      setProfile(data ?? defaultPortfolioData.profile);
    });
  }, []);

  const displayProfile = profile ?? defaultPortfolioData.profile;

  return (
    <>
      <Navigation profile={displayProfile} />
      <main className="pt-14 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

          {/* Page header */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="mb-10 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent)' }}>Resume</p>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Curriculum Vitae</h1>
          </motion.div>

          {/* Profile card */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.1} className="card p-6 sm:p-7 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0"
                style={{ background: 'var(--accent)', color: '#0D0C0A' }}>
                {(displayProfile?.name ?? 'SR').split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="text-lg font-bold leading-tight" style={{ color: 'var(--text)' }}>{displayProfile?.name}</p>
                <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--accent)' }}>{displayProfile?.title}</p>
                {displayProfile?.email && (
                  <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>{displayProfile.email}</p>
                )}
              </div>
            </div>

            {displayProfile?.bio && (
              <p className="text-sm leading-relaxed mt-5 pt-5" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
                {displayProfile.bio}
              </p>
            )}
          </motion.div>

          {/* Download section */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.2}
            className="card p-6 mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--accent-dim)', border: '1px solid rgba(200,168,106,0.2)' }}>
                <FileText className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>PDF Resume</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Generated from live portfolio data</p>
              </div>
            </div>
            <ResumeDownloadButton />
          </motion.div>

          {/* Portfolio links */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.3}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-faint)' }}>
              Explore Portfolio
            </p>
            <div className="space-y-2">
              {SECTIONS.map(s => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group"
                  style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,106,0.35)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{s.label}</span>
                  <ArrowRight className="w-4 h-4 transition-colors" style={{ color: 'var(--text-faint)' }} />
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
      <Footer profile={displayProfile} />
    </>
  );
}
