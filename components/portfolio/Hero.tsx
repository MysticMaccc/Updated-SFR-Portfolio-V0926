'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Profile } from '@/types';
import dynamic from 'next/dynamic';

const ResumeDownloadButton = dynamic(
  () => import('@/components/resume/ResumeDownloadButton'),
  { ssr: false }
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

export default function Hero({ profile }: { profile: Profile | null }) {
  const displayName = (profile?.name ?? 'Sherwin Roxas').split(' ').slice(0, 2).join(' ').toUpperCase();

  const idRows = [
    { key: 'Name',  value: profile?.name ?? 'Sherwin C. Roxas' },
    { key: 'Role',  value: profile?.title ?? 'Full Stack Developer' },
    { key: 'Base',  value: 'Philippines' },
    { key: 'Since', value: '2018' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col pt-12" style={{ background: 'var(--bg)' }}>

      {/* Top metadata band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between px-5 sm:px-10 py-2.5 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <span className="section-meta" style={{ color: 'var(--text-faint)' }}>No. 01 / Index</span>
        <span className="section-meta hidden sm:block" style={{ color: 'var(--text-faint)' }}>Volume 2026</span>
        <span className="section-meta" style={{ color: 'var(--text-faint)' }}>Portfolio</span>
      </motion.div>

      {/* Hero body */}
      <div className="flex-1 flex flex-col lg:flex-row items-start gap-10 lg:gap-20 px-5 sm:px-10 py-14 sm:py-20 max-w-[1400px] mx-auto w-full relative z-10">

        {/* Left: heading + copy + CTAs */}
        <div className="flex-1 min-w-0">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-medium tracking-widest uppercase mb-5"
            style={{ color: 'var(--text-muted)' }}
          >
            {displayName}
          </motion.p>

          {/* Giant multi-line heading */}
          <div className="mb-8 sm:mb-10">
            <motion.span
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="heading-bold text-[clamp(3.5rem,11vw,8.5rem)]"
            >
              FULL STACK
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="heading-outline text-[clamp(3.5rem,11vw,8.5rem)]"
            >
              DEVELOPER
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="heading-bold text-[clamp(3.5rem,11vw,8.5rem)]"
            >
              & BUILDER
            </motion.span>
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.35}
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: 'var(--text-muted)', lineHeight: '1.75' }}
          >
            A developer from the Philippines, building scalable web and mobile applications with React, Next.js, and Laravel.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.45}
            className="flex flex-wrap gap-3"
          >
            <Link href="/projects" className="ios-btn-primary">
              View selected work →
            </Link>
            <ResumeDownloadButton />
          </motion.div>
        </div>

        {/* Right: terminal ID card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:block w-72 xl:w-80 flex-shrink-0 relative z-10"
        >
          <div className="relative p-5" style={{ border: '1px solid var(--border)' }}>
            {/* Corner accent marks */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: 'var(--accent-2)' }} />
            <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: 'var(--accent-2)' }} />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: 'var(--accent-2)' }} />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: 'var(--accent-2)' }} />

            {/* Card header */}
            <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="section-meta" style={{ color: 'var(--text-faint)' }}>ID / 001</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ADE80', boxShadow: '0 0 6px #4ADE80' }} />
                <span className="text-xs font-medium" style={{ color: '#4ADE80' }}>Online</span>
              </div>
            </div>

            {/* Data rows */}
            {idRows.map(row => (
              <div
                key={row.key}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>{row.key}</span>
                <span className="text-sm font-medium text-right" style={{ color: 'var(--text-muted)' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full" style={{ borderTop: '1px solid var(--border)' }} />
    </div>
  );
}
