'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { defaultPortfolioData } from '@/lib/defaultData';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FileText, Download, ArrowUpRight } from 'lucide-react';
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

const SECTIONS = [
  { label: 'About',      href: '/about' },
  { label: 'Skills',     href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Education',  href: '/education' },
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
      <main className="pt-12 min-h-screen relative z-10" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-14 sm:py-20">

          {/* Section marker — purely decorative, section-meta is fine here */}
          <div className="flex items-center justify-between mb-12 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="section-meta" style={{ color: 'var(--text-faint)' }}>[ CV ] — Curriculum Vitae</span>
            <span className="section-meta" style={{ color: 'var(--text-faint)' }}>Read.cv</span>
          </div>

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-14">
            <span className="heading-bold text-[clamp(2.5rem,7vw,6rem)]">CURRICULUM</span>
            <span className="heading-outline text-[clamp(2.5rem,7vw,6rem)]">VITAE</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* ID panel */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className="relative p-6 mb-6" style={{ border: '1px solid var(--border)' }}>
                {/* Corner marks */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: 'var(--accent-2)' }} />
                <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: 'var(--accent-2)' }} />
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: 'var(--accent-2)' }} />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: 'var(--accent-2)' }} />

                <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>Subject / 001</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ADE80', boxShadow: '0 0 6px #4ADE80' }} />
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#4ADE80' }}>Online</span>
                  </div>
                </div>

                <p className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>{displayProfile?.name}</p>
                <p className="text-sm font-medium mb-5" style={{ color: 'var(--accent-2)' }}>{displayProfile?.title}</p>
                {displayProfile?.email && (
                  <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{displayProfile.email}</p>
                )}

                {displayProfile?.bio && (
                  <p className="text-sm leading-relaxed mt-5 pt-5" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border)', lineHeight: '1.7' }}>
                    {displayProfile.bio}
                  </p>
                )}
              </div>

              {/* Download */}
              <div className="flex items-center justify-between p-5" style={{ border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-2)' }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Download CV</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-faint)' }}>Generated from live data</p>
                  </div>
                </div>
                <ResumeDownloadButton />
              </div>
            </motion.div>

            {/* Portfolio links */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-faint)' }}>Explore Portfolio</p>
              <div style={{ borderTop: '1px solid var(--border)' }}>
                {SECTIONS.map((s, i) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center justify-between py-5 group transition-all"
                    style={{ borderBottom: '1px solid var(--border)', textDecoration: 'none' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '8px'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0'; }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="section-meta" style={{ color: 'var(--text-faint)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-semibold uppercase tracking-wider transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                        {s.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 transition-colors" style={{ color: 'var(--text-faint)' }} />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer profile={displayProfile} />
    </>
  );
}
