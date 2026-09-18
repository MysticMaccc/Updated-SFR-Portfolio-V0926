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
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...spring, delay },
  }),
};

export default function Hero({ profile }: { profile: Profile | null }) {
  const name = profile?.name ?? 'Sherwin Christopher F. Roxas';
  const title = profile?.title ?? 'Full Stack Developer';

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white pt-14">
      <div className="max-w-3xl w-full mx-auto px-5 sm:px-8 py-16 sm:py-24 text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0 }}
          className="flex justify-center mb-7 sm:mb-9"
        >
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-[28px] object-cover"
              style={{ border: '1px solid var(--border)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
            />
          ) : (
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-[28px] flex items-center justify-center text-white text-2xl sm:text-3xl font-bold"
              style={{
                background: 'linear-gradient(180deg, #3395FF 0%, #007AFF 100%)',
                boxShadow: '0 4px 16px rgba(0,122,255,0.25)',
                letterSpacing: '-0.02em',
              }}
            >
              {name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
          )}
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.08}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#1C1C1E] mb-4 sm:mb-5"
          style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
        >
          {name}
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.08}
          className="text-lg sm:text-xl font-medium text-[#007AFF] mb-8 sm:mb-10"
        >
          {title}
        </motion.p>

        {/* Divider — grows in */}
        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ ...spring, delay: 0.2 }}
            className="h-px bg-[#E5E5EA] w-16 sm:w-24 origin-right"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...spring, delay: 0.3 }}
            className="w-1 h-1 rounded-full bg-[#C7C7CC]"
          />
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ ...spring, delay: 0.2 }}
            className="h-px bg-[#E5E5EA] w-16 sm:w-24 origin-left"
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
              className="flex items-center gap-2 text-sm text-[#636366] hover:text-[#007AFF] transition-colors"
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
              className="flex items-center gap-2 text-sm text-[#636366] hover:text-[#007AFF] transition-colors"
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
              className="flex items-center gap-2 text-sm text-[#636366] hover:text-[#007AFF] transition-colors"
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
          custom={0.32}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/projects" className="ios-btn-primary w-full sm:w-auto justify-center">
            View Projects
          </Link>
          <ResumeDownloadButton />
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E5E5EA]" />
    </div>
  );
}
