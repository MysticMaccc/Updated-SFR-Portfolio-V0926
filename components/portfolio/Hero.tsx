'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Mail, Phone } from 'lucide-react';
import type { Profile } from '@/types';
import dynamic from 'next/dynamic';

const ResumeDownloadButton = dynamic(
  () => import('@/components/resume/ResumeDownloadButton'),
  { ssr: false }
);

const spring = { type: 'spring', stiffness: 320, damping: 28, mass: 0.9 } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { ...spring, delay },
  }),
};

export default function Hero({ profile }: { profile: Profile | null }) {
  const name = profile?.name ?? 'Sherwin Christopher F. Roxas';
  const title = profile?.title ?? 'Full Stack Developer';

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-14"
      style={{ background: 'var(--bg)' }}>

      {/* Subtle radial glow behind name */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(200,168,106,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-3xl w-full mx-auto px-5 sm:px-8 py-16 sm:py-24 text-center relative">

        {/* Eyebrow label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-xs font-semibold uppercase tracking-[0.22em] mb-6"
          style={{ color: 'var(--accent)' }}
        >
          Full Stack Developer
        </motion.p>

        {/* Name — serif */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.08}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 leading-tight"
          style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
        >
          {name}
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.14}
          className="text-base sm:text-lg font-medium mb-10 sm:mb-12"
          style={{ color: 'var(--text-muted)' }}
        >
          {title}
        </motion.p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-10 sm:mb-12">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ ...spring, delay: 0.2 }}
            className="h-px w-16 sm:w-24 origin-right"
            style={{ background: 'var(--border-light)' }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...spring, delay: 0.3 }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--accent)' }}
          />
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ ...spring, delay: 0.2 }}
            className="h-px w-16 sm:w-24 origin-left"
            style={{ background: 'var(--border-light)' }}
          />
        </div>

        {/* Contact row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.22}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 sm:mb-12"
        >
          {profile?.email && (
            <motion.a
              whileHover={{ y: -2 }}
              transition={spring}
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{profile.email}</span>
            </motion.a>
          )}
          {profile?.phone && (
            <motion.a
              whileHover={{ y: -2 }}
              transition={spring}
              href={`tel:${profile.phone}`}
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{profile.phone}</span>
            </motion.a>
          )}
          {profile?.github && (
            <motion.a
              whileHover={{ y: -2 }}
              transition={spring}
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Github className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{profile.github.replace('https://github.com/', '')}</span>
            </motion.a>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/projects" className="ios-btn-primary w-full sm:w-auto justify-center">
            View Projects
          </Link>
          <ResumeDownloadButton />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--border)' }} />
    </div>
  );
}
